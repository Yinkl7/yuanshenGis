import L from 'leaflet'
import { getMapPointDetail } from './api'

interface AreaNameConifg {
  lat: number
  lng: number
  name: string
  children: any[]
}

interface pointConifg {
  lat: number
  lng: number
  icon: string
  pointId: number
  name: string
}

export class MapManager {
  private map: L.Map
  private areaNameLayerGroup: L.LayerGroup | undefined
  private pointLayerGroup: L.LayerGroup | undefined
  private mapAnchorList: AreaNameConifg[] = []
  private prevZoom = 0
  private lastActivePointId = -1

  constructor(domId: string) {
    const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(-256, 256))
    this.map = L.map(domId, {
      maxBounds: bounds,
      center: [-84, 149],
      crs: L.CRS.Simple,
      zoomControl: false,
      attributionControl: false,
      zoom: 5,
      minZoom: 4,
      maxZoom: 7
    })

    this.prevZoom = this.map.getZoom()

    this.map.addControl(
      // @ts-ignore
      new L.Control.Zoomslider({
        position: 'bottomright',
        stepHeight: 30,
        knobHeight: 20
      })
    )

    L.tileLayer('images/map/{z}/{x}/{y}.png', {
      bounds,
      maxZoom: 7
    }).addTo(this.map)

    this.map.on('zoom', () => {
      const prevRenderFlag = this.prevZoom >= 6
      const currentRenderFlag = this.map.getZoom() >= 6
      if (prevRenderFlag !== currentRenderFlag) {
        this.renderAreaNames()
      }
      this.prevZoom = this.map.getZoom()
    })

    this.map.on('click', this.onMapClick.bind(this))
  }

  // 点击地图取消激活
  onMapClick() {
    if (this.lastActivePointId !== -1) {
      const lastPoint = document.getElementById(`mapPointItem${this.lastActivePointId}`)
      lastPoint?.classList.remove('active')
      this.lastActivePointId = -1
    }
  }

  setMapAnchorList(configList: AreaNameConifg[]) {
    this.mapAnchorList = configList
  }

  renderAreaNames() {
    this.areaNameLayerGroup?.clearLayers()

    let markers: L.Marker[] = []
    if (this.map.getZoom() >= 6) {
      this.mapAnchorList.forEach((val) => {
        let childrenList: L.Marker[] = []
        childrenList = val.children.map(this.getAreaNameMarkerItem)
        markers = markers.concat(childrenList)
      })
    } else {
      markers = this.mapAnchorList.map(this.getAreaNameMarkerItem)
    }

    this.areaNameLayerGroup = L.layerGroup(markers)

    this.areaNameLayerGroup.addTo(this.map)
  }

  getAreaNameMarkerItem(config: AreaNameConifg) {
    return L.marker(L.latLng(config.lat, config.lng), {
      icon: L.divIcon({
        className: 'map-marker-item',
        html: `<div class='area-mark-item'>${config.name}</div>`
      })
    })
  }

  renderPoints(pointerList: pointConifg[]) {
    this.pointLayerGroup?.clearLayers()

    const pointerMarks = pointerList.map((item) => {
      const { lat, lng, icon, pointId, name } = item
      const marker = L.marker(L.latLng(lat, lng), {
        icon: L.divIcon({
          className: 'map-point-item',
          html: `<div class='point-item-container' id='mapPointItem${pointId}'>
            <div class='point-pic' style="background-image: url(${icon})"></div>
            <div class='arrow-icon lt'></div>
            <div class='arrow-icon lb'></div>
            <div class='arrow-icon rt'></div>
            <div class='arrow-icon rb'></div>
          </div>`,
          iconSize: [37, 40],
          iconAnchor: [19, 20]
        })
      })

      marker.bindPopup(
        L.popup({
          content: this.calcPopupContent({ info: {}, correct_user_list: [], last_update_time: '', name: '' })
        })
      )

      // 弹窗打开时请求数据
      marker.on('popupopen', async () => {
        const res = await getMapPointDetail(pointId)
        marker.setPopupContent(this.calcPopupContent({ ...res.data, name }))
      })

      marker.on('click', () => {
        if (this.lastActivePointId == pointId) return

        if (this.lastActivePointId !== -1) {
          const lastPoint = document.getElementById(`mapPointItem${this.lastActivePointId}`)
          lastPoint?.classList.remove('active')
        }
        const currentPoint = document.getElementById(`mapPointItem${pointId}`)
        currentPoint?.classList.add('active')
        this.lastActivePointId = pointId
      })

      return marker
    })

    this.pointLayerGroup = L.layerGroup(pointerMarks)
    this.pointLayerGroup.addTo(this.map)
  }

  calcPopupContent(popupData: any) {
    const { correct_user_list, info, last_update_time, name } = popupData
    const avatarElmStr = correct_user_list.map((val: any) => {
      return `<div class="avatar-item" style="background-image: url(${val.img})"></div>`
    })
    return `<div class="point-popup-container">
        <div class="popup-title">${name}</div>
        <div class="popup-pic" style="background-image: url(${info.img})"></div>
        <div class="point-name">bbbb</div>
        <div class="contributor-container">
          <div class="contributor-label">贡献者：</div>
          <div class="avatar-container">
            ${avatarElmStr}
          </div>
        </div>
        <div class="point-time">更新时间：${last_update_time}</div>
      </div>`
  }

  flyTo(latlng: L.LatLngExpression, zoom?: number) {
    this.map.flyTo(latlng, zoom)
  }

  enableDebugger() {
    this.map.on('click', (workingLayer) => {
      const cordinate = workingLayer.latlng
      console.log(cordinate)
    })
  }
}

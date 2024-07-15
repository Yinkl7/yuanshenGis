import L from 'leaflet'

interface AreaNameConifg {
  lat: number
  lng: number
  areaName: string
}

interface pointConifg {
  lat: number
  lng: number
  iconId: number
}

export class MapManager {
  private map: L.Map
  private areaNameLayerGroup: L.LayerGroup | undefined
  private pointLayerGroup: L.LayerGroup | undefined

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

    L.tileLayer('images/map/{z}/{x}/{y}.png', {
      bounds,
      maxZoom: 7
    }).addTo(this.map)
  }

  renderAreaNames(configList: AreaNameConifg[]) {
    const markers = configList.map((item) => {
      return L.marker(L.latLng(item.lat, item.lng), {
        icon: L.divIcon({
          className: 'map-marker-item',
          html: `<div class='area-mark-item'>${item.areaName}</div>`
        })
      })
    })

    this.areaNameLayerGroup = L.layerGroup(markers)

    this.areaNameLayerGroup.addTo(this.map)
  }

  renderPoints(pointerList: pointConifg[]) {
    const pointerMarks = pointerList.map((item) => {
      const { lat, lng, iconId } = item
      const iconUrl = `images/map-icon/${iconId}.png`
      return L.marker(L.latLng(lat, lng), {
        icon: L.divIcon({
          className: 'map-point-item',
          html: `<div class='point-item-container'>
            <div class='point-pic' style="background-image: url(${iconUrl})"></div>
          </div>`
        })
      })
    })

    this.pointLayerGroup = L.layerGroup(pointerMarks)
    this.pointLayerGroup.addTo(this.map)
  }

  enableDebugger() {
    this.map.on('click', (workingLayer) => {
      const cordinate = workingLayer.latlng
      console.log(cordinate)
    })
  }
}

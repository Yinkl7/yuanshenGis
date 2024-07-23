import L from 'leaflet'

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
}

export class MapManager {
  private map: L.Map
  private areaNameLayerGroup: L.LayerGroup | undefined
  private pointLayerGroup: L.LayerGroup | undefined
  private mapAnchorList: AreaNameConifg[] = []
  private prevZoom = 0

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
      const { lat, lng, icon } = item
      return L.marker(L.latLng(lat, lng), {
        icon: L.divIcon({
          className: 'map-point-item',
          html: `<div class='point-item-container'>
            <div class='point-pic' style="background-image: url(${icon})"></div>
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

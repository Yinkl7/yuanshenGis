<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'

onMounted(() => {
  init()
})

function init() {
  const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(-256, 256))
  let map = L.map('map', {
    maxBounds: bounds,
    center: [-84, 149],
    crs: L.CRS.Simple,
    zoomControl: false,
    attributionControl: false,
    zoom: 5,
    minZoom: 4,
    maxZoom: 7
  })

  map.on('click', (workingLayer) => {
    const cordinate = workingLayer.latlng
    console.log(cordinate)
  })

  L.tileLayer('images/map/{z}/{x}/{y}.png', {
    bounds,
    maxZoom: 7
  }).addTo(map)

  const markerList = [
    {
      lat: -88.28,
      lng: 139.41,
      areaName: '苍风高地'
    },
    {
      lat: -100.96,
      lng: 127.12,
      areaName: '碧水原'
    }
  ]

  let markers = markerList.map((item) => {
    return L.marker(L.latLng(item.lat, item.lng), {
      icon: L.divIcon({
        className: 'map-marker-item',
        html: `<div class='area-mark-item'>${item.areaName}</div>`
      })
    })
  })

  let areaNameLayer = L.layerGroup(markers)
  areaNameLayer.addTo(map)
  console.log('init map= ', map)

  const pointerList = [
    {
      lat: -90.56,
      lng: 144.65,
      iconId: 1
    },
    {
      lat: -99.53,
      lng: 131.65,
      iconId: 1
    }
  ]

  let pointerMarks = pointerList.map((item) => {
    let { lat, lng, iconId } = item
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

  let pointLayer = L.layerGroup(pointerMarks)
  pointLayer.addTo(map)
}
</script>

<template>
  <div class="home-view">
    <div class="map-layer" id="map"></div>
  </div>
</template>

<style lang="less" scoped>
.home-view {
  position: relative;
  height: 100vh;
  width: 100vw;
  .map-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

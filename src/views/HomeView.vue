<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { MapManager } from '@/js/map-manage'

onMounted(() => {
  init()
})

function init() {
  const mapManager = new MapManager('map')

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

  mapManager.renderAreaNames(markerList)

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

  mapManager.renderPoints(pointerList)

  mapManager.enableDebugger()
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

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { MapManager } from '@/js/map-manage'
import FilterHeader from '@/components/FilterHeader.vue'
import LocationBtn from '@/components/LocationBtn.vue'
import SelectArea from '@/components/SelectArea.vue'
import FilterMain from '@/components/FilterMain.vue'

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
    <div class="ui-layer">
      <div class="filter-container">
        <div class="filter-content">
          <div class="close-btn">
            <div class="close-icon"></div>
          </div>
          <LocationBtn />
          <SelectArea />
          <FilterHeader />
          <FilterMain />
          <div class="search-container">搜索</div>
        </div>
      </div>
    </div>
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
    z-index: 1;
  }
  .ui-layer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 2;
    .filter-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 415px;
      height: 100%;
      padding: 20px;
      .filter-content {
        // position: relative;
        display: flex;
        flex-direction: column;
        background-color: #3b4354;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        .close-btn {
          position: absolute;
          top: 32px;
          right: -44px;
          width: 64px;
          height: 40px;
          background-image: url('../assets/images/ui/close-bg.png');
          background-size: cover;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 18px;
          cursor: pointer;
          .close-icon {
            width: 24px;
            height: 24px;
            background-image: url('../assets/images/ui/close-icon.png');
            background-size: cover;
          }
        }
        .search-container {
          width: 100%;
          height: 52px;
        }
      }
    }
  }
}
</style>

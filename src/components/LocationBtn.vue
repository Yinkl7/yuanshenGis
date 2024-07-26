<script setup lang="ts">
import { getMapAnchorList } from '@/js/api'
import { globalDataInstance } from '@/js/global-data'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useHomeStore()

const { mapAnchorList } = storeToRefs(store)

onMounted(() => {
  init()
})

function init() {
  initMapAnchorList()
}

async function initMapAnchorList() {
  let res = await getMapAnchorList()
  store.setMapAnchorList(res.data)
}

function onAreaNameClick(item: any, zoom: number) {
  globalDataInstance.mapManager.flyTo(item, zoom)
}
</script>

<template>
  <div class="location-btn">
    <div class="location-icon"></div>
    <div class="location-wrapper">
      <div class="location-content">
        <div class="location-title">快速定位</div>
        <div class="content-areas">
          <div class="area-item" v-for="item in mapAnchorList" :key="item.id">
            <div class="area-parent" @click="onAreaNameClick(item, 5)">
              <div class="parent-icon"></div>
              <div class="parent-name">{{ item.name }}</div>
            </div>
            <div class="area-child" v-for="child in item.children" :key="child.id" @click="onAreaNameClick(child, 6)">{{ child.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.location-btn {
  position: absolute;
  top: 84px;
  right: -30px;
  width: 40px;
  height: 40px;
  background-color: rgba(50, 57, 71, 0.8);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover .location-wrapper {
    display: block;
  }
  .location-wrapper {
    position: absolute;
    left: 100%;
    top: 0;
    padding-left: 12px;
    display: none;
    .location-content {
      background-color: #3b4354;
      border-radius: 12px;
      user-select: none;
      width: 192px;
      .location-title {
        font-size: 16px;
        color: #d3bc8e;
        padding: 12px;
        border-bottom: 1px solid rgba(86, 97, 120, 0.2);
      }

      .content-areas {
        height: 500px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .area-item {
          .area-child {
            display: flex;
            align-items: center;
            padding-left: 32px;
            height: 48px;
            color: hsla(39, 34%, 89%, 0.75);
            &:hover {
              color: #ece5d8;
            }
          }
          .area-parent {
            display: flex;
            align-items: center;
            height: 48px;
            padding-left: 15px;
            &:hover {
              .parent-name {
                color: #ece5db;
              }
              .parent-icon {
                background-image: url('../assets/images/ui/location-icon-h.png');
              }
            }
            .parent-icon {
              width: 12px;
              height: 12px;
              background-image: url('../assets/images/ui/location-icon-n.png');
              background-size: cover;
              margin-right: 5px;
            }
            .parent-name {
              font-size: 14px;
              color: #d3bc8e;
            }
          }
        }
      }
    }
  }

  .location-icon {
    width: 24px !important;
    height: 24px;
    background-size: cover;
    background-image: url('../assets/images/ui/location-btn.png');
  }
}
</style>

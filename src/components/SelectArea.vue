<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useHomeStore()
const { selectTreeList } = storeToRefs(store)

const expended = ref(true)
function expendClick() {
  expended.value = !expended.value
}

function removeItem(data: any) {
  store.handleSelectTreeList(data)
  if(selectTreeList.value.length == 0) {
    expended.value = true
  }
}
</script>

<template>
  <div class="select-area" v-show="selectTreeList.length">
    <template v-if="expended">
      <div class="selected-count">{{ selectTreeList.length }}</div>
      <div class="selected-icon" @click="expendClick"></div>
    </template>

    <div class="list-container" v-else>
      <div class="up-container" @click="expendClick">
        <div class="up-icon"></div>
      </div>
      <div class="selected-item" v-for="item in selectTreeList" :key="item.id">
        <div class="item-container" @click="removeItem(item)">
          <div
            class="item-icon"
            :style="{
              backgroundImage: `url(${item.icon})`
            }"
          ></div>
        </div>
        <div class="icon-delete" @click="removeItem(item)"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.select-area {
  position: absolute;
  top: 136px;
  right: -30px;
  width: 40px;
  height: fit-content;
  background-color: rgba(50, 57, 71, 0.8);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  .selected-count {
    position: absolute;
    top: -4px;
    right: -4px;
    border-radius: 6px;
    text-align: center;
    color: #fff;
    background-color: #ff5e41;
    height: 12px;
    line-height: 12px;
    font-size: 11px;
    padding: 0 3px;
  }
  .selected-icon {
    width: 24px;
    height: 24px;
    background-image: url('../assets/images/ui/cart-icon.png');
    background-size: cover;
  }

  .list-container {
    .up-container {
      cursor: pointer;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      .up-icon {
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/ui/arrow-top.png');
        background-size: cover;
      }
    }

    .selected-item {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        .item-container {
          border-color: #d3bc8e;
        }
        .icon-delete {
          display: block;
        }
      }
      .item-container {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #3b4252;
        border: 1px solid hsla(0, 0%, 100%, 0.16);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .item-icon {
          width: 100%;
          height: 100%;
          background-size: cover;
        }
      }
      .icon-delete {
        display: none;
        position: absolute;
        top: 0;
        right: 2px;
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/ui/delete-icon.svg');
        background-size: cover;
        z-index: 2;
      }
    }
  }
}
</style>

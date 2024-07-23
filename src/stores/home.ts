import { ref } from 'vue'
import { defineStore } from 'pinia'
import { globalDataInstance } from '@/js/global-data'

export const useHomeStore = defineStore('home', () => {
  const filterTree = ref<any[]>([])

  const selectTreeList = ref<any[]>([])

  const mapAnchorList = ref<any[]>([])

  function setFilterTree(data: any) {
    filterTree.value = data
  }

  function handleSelectTreeList(data: any) {
    if (!data.active) {
      selectTreeList.value.push(data)
    } else {
      selectTreeList.value = selectTreeList.value.filter((item: any) => item.id !== data.id)
    }
    Reflect.set(data, 'active', !data.active)

    if (globalDataInstance.mapManager) {
      renderPointList()
    }
  }

  function renderPointList() {
    let pointList: any[] = []
    selectTreeList.value.forEach((element: any) => {
      const points: any = element.children.map((val: any) => {
        return { ...val, icon: element.icon }
      })
      pointList = pointList.concat(points)
    })

    globalDataInstance.mapManager.renderPoints(pointList)
  }

  function setMapAnchorList(data: any) {
    console.log('mapAnchorList======= ', data)
    mapAnchorList.value = data
  }

  return { filterTree, selectTreeList, mapAnchorList, setFilterTree, handleSelectTreeList, setMapAnchorList }
})

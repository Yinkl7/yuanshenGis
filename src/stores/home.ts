import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const filterTree = ref<any[]>([])

  const selectTreeList = ref<any[]>([])

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
  }

  return { filterTree, selectTreeList, setFilterTree, handleSelectTreeList }
})

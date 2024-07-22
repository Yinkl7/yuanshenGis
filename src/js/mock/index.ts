import mock from 'mockjs'
import { MainHost } from '../api/constants'
import { LabelTreeData } from './label-tree-data'
import { MapAnchorList } from './map-anchor-list'

function mockLabelTree() {
  mock.mock(new RegExp(`${MainHost}/label/tree($|\\?.*)`), {
    code: 0,
    data: LabelTreeData,
    message: '成功'
  })
}

function mockMapAnchorList() {
  mock.mock(new RegExp(`${MainHost}/map_anchor/list($|\\?.*)`), {
    code: 0,
    data: MapAnchorList,
    message: '成功'
  })
}

export function mockAllData() {
  mockLabelTree()
  mockMapAnchorList()
}

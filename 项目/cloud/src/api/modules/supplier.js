import fetch from 'src/fetch'
import * as supplierUrl from '../constant/supplier'

// 供应商列表
export const supplierListInquiry = (data) => {
  return fetch({
    url: supplierUrl.supplierListInquiry,
    method: 'post',
    data
  })
}
// 添加供应商
export const supplierAddition = (data) => {
  return fetch({
    url: supplierUrl.supplierAddition,
    method: 'post',
    data
  })
}
// 供应商详情
export const supplierDetail = (data) => {
  return fetch({
    url: supplierUrl.supplierDetail,
    method: 'post',
    data
  })
}
// 维护供应商
export const supplierMaintenance = (data) => {
  return fetch({
    url: supplierUrl.supplierMaintenance,
    method: 'post',
    data
  })
}

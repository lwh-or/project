import fetch from 'src/fetch'
import * as orderUrl from '../constant/order'

// 订单导入
export const ordeImport = (data) => {
  return fetch({
    url: orderUrl.ordeImport,
    method: 'post',
    data
  })
}
// 订单导入查询
export const orderImportPageListInquiry = (data) => {
  return fetch({
    url: orderUrl.orderImportPageListInquiry,
    method: 'post',
    data
  })
}

import fetch from 'src/fetch'
import * as advertUrl from '../constant/advert'

// CRM1032 广告列表查询-分页
export const shopcrmAdvertPageListInquiry = (data) => {
  return fetch({
    url: advertUrl.shopcrmAdvertPageListInquiry,
    method: 'post',
    data
  })
}
// CRM1033 广告详情查询
export const shopcrmadvertDetailInquiry = (data) => {
  return fetch({
    url: advertUrl.shopcrmadvertDetailInquiry,
    method: 'post',
    data
  })
}
// CRM0019 广告新增
export const shopcrmAdvertAddition = (data) => {
  return fetch({
    url: advertUrl.shopcrmAdvertAddition,
    method: 'post',
    data
  })
}
// CRM0020 广告维护
export const shopcrmAdvertMaintenance = (data) => {
  return fetch({
    url: advertUrl.shopcrmAdvertMaintenance,
    method: 'post',
    data
  })
}
// CRM0004 文件上传
export const shopcrmFileUpload = (data) => {
  return fetch({
    url: advertUrl.shopcrmFileUpload,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

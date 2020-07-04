import fetch from 'src/fetch'
import * as activityUrl from '../constant/activity'

// CRM1034 查询活动列表-分页
export const shopcrmActivityPageListInquiry = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityPageListInquiry,
    method: 'post',
    data
  })
}
// CRM1035 查询活动产品列表-分页
export const shopcrmActivityProductPageListInquiry = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityProductPageListInquiry,
    method: 'post',
    data
  })
}
// CRM1036 查询活动详情
export const shopcrmActivityDetailInquiry = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityDetailInquiry,
    method: 'post',
    data
  })
}
// CRM0021 活动维护
export const shopcrmActivityMaintenance = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityMaintenance,
    method: 'post',
    data
  })
}
// CRM0020 活动新增
export const shopcrmActivityAddition = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityAddition,
    method: 'post',
    data
  })
}

// CRM1040 查询类型列表查询
export const activityClassifyListInquiry = (data) => {
  return fetch({
    url: activityUrl.activityClassifyListInquiry,
    method: 'post',
    data
  })
}

// CRM0022 活动商品新增
export const shopcrmActivityProductAddition = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityProductAddition,
    method: 'post',
    data
  })
}

// CRM0023 活动商品维护
export const shopcrmActivityProductMaintenance = (data) => {
  return fetch({
    url: activityUrl.shopcrmActivityProductMaintenance,
    method: 'post',
    data
  })
}

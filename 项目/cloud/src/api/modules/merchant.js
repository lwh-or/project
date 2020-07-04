import fetch from 'src/fetch'
import * as merchantUrl from '../constant/merchant'

// 开店申请列表
export const storeApplyList = (data) => {
  return fetch({
    url: merchantUrl.storeApplyList,
    method: 'post',
    data
  })
}

// 开店申请详情
export const storeApplyDetail = (data) => {
  return fetch({
    url: merchantUrl.storeApplyDetail,
    method: 'post',
    data
  })
}

// 开店申请维护
export const storeApplyMaintenance = (data) => {
  return fetch({
    url: merchantUrl.storeApplyMaintenance,
    method: 'post',
    data
  })
}

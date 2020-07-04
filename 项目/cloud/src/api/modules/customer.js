
import fetch from 'src/fetch'
import * as customerUrl from '../constant/customer'

// 客户列表
export const customerPageList = (data) => {
  return fetch({
    url: customerUrl.customerPageList,
    method: 'post',
    data
  })
}
// 订单列表
export const orderPageList = (data) => {
  return fetch({
    url: customerUrl.orderPageList,
    method: 'post',
    data
  })
}
// 订单详情
export const details = (data) => {
  return fetch({
    url: customerUrl.details,
    method: 'post',
    data
  })
}
// 售后审核
export const serveApproved = (data) => {
  return fetch({
    url: customerUrl.serveApproved,
    method: 'post',
    data
  })
}

// 售后审核
export const serveReturn = data => {
  return fetch({
    url: customerUrl.serveReturn,
    method: 'post',
    data
  })
}
// 快递公司
export const express = data => {
  return fetch({
    url: customerUrl.express,
    method: 'post',
    data
  })
}

// 发货
export const cargo = data => {
  return fetch({
    url: customerUrl.cargo,
    method: 'post',
    data
  })
}

// 退款
export const apply = data => {
  return fetch({
    url: customerUrl.apply,
    method: 'post',
    data
  })
}

// CRM1041 客户售后服务列表-分页
export const servePageListInquiry = (data) => {
  return fetch({
    url: customerUrl.servePageListInquiry,
    method: 'post',
    data
  })
}

// CRM1042 客户退款列表-分页
export const refundPageListInquiry = (data) => {
  return fetch({
    url: customerUrl.refundPageListInquiry,
    method: 'post',
    data
  })
}

// CRM1043 客户售后服务详情
export const serveDetailInquiry = (data) => {
  return fetch({
    url: customerUrl.serveDetailInquiry,
    method: 'post',
    data
  })
}
// CRM1043 客户退款详情
export const refundDetailInquiry = (data) => {
  return fetch({
    url: customerUrl.refundDetailInquiry,
    method: 'post',
    data
  })
}
// SHOP10029 快递日志查询
export const shopExpressLogListInquiry = (data) => {
  return fetch({
    url: customerUrl.shopExpressLogListInquiry,
    method: 'post',
    data
  })
}
// 运营订单导出
export const omExport = customerUrl.omExport

// 供应商导出
export const supplierExport = (data) => {
  return fetch({
    url: customerUrl.supplierExport,
    method: 'post',
    data
  })
}

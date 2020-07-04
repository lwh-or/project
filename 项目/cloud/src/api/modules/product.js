import fetch from 'src/fetch'
import * as productUrl from '../constant/product'

// 品牌列表
export const productBrandListInquiry = (data) => {
  return fetch({
    url: productUrl.productBrandListInquiry,
    method: 'post',
    data
  })
}
// 维护品牌列表
export const productBrandMaintenance = (data) => {
  return fetch({
    url: productUrl.productBrandMaintenance,
    method: 'post',
    data
  })
}
// 新增品牌列表
export const productBrandAddition = (data) => {
  return fetch({
    url: productUrl.productBrandAddition,
    method: 'post',
    data
  })
}
// 品牌详情
export const productBrandDetail = (data) => {
  return fetch({
    url: productUrl.productBrandDetail,
    method: 'post',
    data
  })
}

// 属性列表
export const featuresPageListInquiry = (data) => {
  return fetch({
    url: productUrl.featuresPageListInquiry,
    method: 'post',
    data
  })
}

// 商品分类
export const productCategoryInquiry = (data) => {
  return fetch({
    url: productUrl.productCategoryInquiry,
    method: 'post',
    data
  })
}

// 添加商品属性
export const productAttrAddition = (data) => {
  return fetch({
    url: productUrl.productAttrAddition,
    method: 'post',
    data
  })
}
// 商品属性详情
export const productAttrDetail = (data) => {
  return fetch({
    url: productUrl.productAttrDetail,
    method: 'post',
    data
  })
}

// 修改商品属性详情
export const productAttrMaintenance = (data) => {
  return fetch({
    url: productUrl.productAttrMaintenance,
    method: 'post',
    data
  })
}

// 商品参数列表
export const categorySpecGroupLIstInquiry = (data) => {
  return fetch({
    url: productUrl.categorySpecGroupLIstInquiry,
    method: 'post',
    data
  })
}

// 添加参数详情
export const productParameterDetail = (data) => {
  return fetch({
    url: productUrl.productParameterDetail,
    method: 'post',
    data
  })
}

// 商品列表
export const productPageInquiry = (data) => {
  return fetch({
    url: productUrl.productPageInquiry,
    method: 'post',
    data
  })
}
// 商品列表的审核
export const productApply = (data) => {
  return fetch({
    url: productUrl.productApply,
    method: 'post',
    data
  })
}
// 规格参数新增
export const productParameterAddition = (data) => {
  return fetch({
    url: productUrl.productParameterAddition,
    method: 'post',
    data
  })
}
// 规格参数修改
export const productParameterMaintenance = (data) => {
  return fetch({
    url: productUrl.productParameterMaintenance,
    method: 'post',
    data
  })
}

// 查询规格参数组详情
export const categorySpecGroupDetail = (data) => {
  return fetch({
    url: productUrl.categorySpecGroupDetail,
    method: 'post',
    data
  })
}
// 根据分类编号查询规格组
export const productByCategoryInquiry = (data) => {
  return fetch({
    url: productUrl.productByCategoryInquiry,
    method: 'post',
    data
  })
}

// 添加商品
export const productAddition = (data) => {
  return fetch({
    url: productUrl.productAddition,
    method: 'post',
    data
  })
}

// 查询商品详情
export const productDetail = (data) => {
  return fetch({
    url: productUrl.productDetail,
    method: 'post',
    data
  })
}

// 维护商品
export const productMaintenance = (data) => {
  return fetch({
    url: productUrl.productMaintenance,
    method: 'post',
    data
  })
}

// 维护商品状态
export const productstatus = (data) => {
  return fetch({
    url: productUrl.productstatus,
    method: 'post',
    data
  })
}

// 查询特征属性列表
export const productFeatures = (data) => {
  return fetch({
    url: productUrl.productFeatures,
    method: 'post',
    data
  })
}

// 分类分页查询
export const categoryPageListInquiry = (data) => {
  return fetch({
    url: productUrl.categoryPageListInquiry,
    method: 'post',
    data
  })
}

// 分类分页查询
export const categorySpecParamsPageInquiry = (data) => {
  return fetch({
    url: productUrl.categorySpecParamsPageInquiry,
    method: 'post',
    data
  })
}

// 添加
export const categorySpecParamsAddition = (data) => {
  return fetch({
    url: productUrl.categorySpecParamsAddition,
    method: 'post',
    data
  })
}

// 添加
export const categoryParamInquiry = (data) => {
  return fetch({
    url: productUrl.categoryParamInquiry,
    method: 'post',
    data
  })
}

// CRM1028 查询规格参数详情
export const categoryDetailInquiry = (data) => {
  return fetch({
    url: productUrl.categoryDetailInquiry,
    method: 'post',
    data
  })
}
// CRM0012 规格参数维护
export const categorySpecParamsMaintenance = (data) => {
  return fetch({
    url: productUrl.categorySpecParamsMaintenance,
    method: 'post',
    data
  })
}
// CRM0008 特征新增
export const featuresAddition = (data) => {
  return fetch({
    url: productUrl.featuresAddition,
    method: 'post',
    data
  })
}

// CRM0013 添加分类
export const categoryAddition = (data) => {
  return fetch({
    url: productUrl.categoryAddition,
    method: 'post',
    data
  })
}

// CRM0014 维护分类
export const categoryMaintenance = (data) => {
  return fetch({
    url: productUrl.categoryMaintenance,
    method: 'post',
    data
  })
}

// CRM0014 维护分类
export const productCategoryDetailInquiry = (data) => {
  return fetch({
    url: productUrl.productCategoryDetailInquiry,
    method: 'post',
    data
  })
}

// 查询商品下SKU列表
export const categorySku = data => {
  return fetch({
    url: productUrl.categorySku,
    method: 'post',
    data
  })
}

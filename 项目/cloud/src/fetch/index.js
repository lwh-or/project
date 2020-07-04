/**
 * @author: changpan
 * @intro: http统一封装,同时支持callback模式调用.
 */
import axios from 'axios'
import {loginPage} from 'src/common/setting'
import uuidv1 from 'uuid/v1'
import Store from 'src/store'
import { Message } from 'element-ui'
import {GET_IS_LOGIN, GET_USER_ID, GET_TOKEN} from 'src/store/getters/type'
// 默认POST请求
const DEFAULT_METHOD = 'POST'

const Http = async options => {
  const {
    before, // 请求开始之前的函数
    complete, // 请求完成，这里不管成功还是失败都会执行
    method,
    headers
  } = options

  // 请求之前调用一次
  before && before(options)
  if (method.toUpperCase() === DEFAULT_METHOD) {
    // 开始请求
    options.data.sessionContext = {
      accessSource: 'PC',
      accessSourceType: 'PC',
      deviceId: '',
      ipAddress: '',
      lbs: '',
      localDateTimeText: '',
      locale: 'zh-CN',
      userReferenceNumber: uuidv1(),
      userId: ''
    }
  }
  let _headers = {}
  if (!headers) {
    _headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  // 判断是否登陆
  const isLogin = Store.getters[GET_IS_LOGIN]
  // 判断是否登陆
  if (isLogin) {
    const token = Store.getters[GET_TOKEN]
    const userId = Store.getters[GET_USER_ID]
    options.data.sessionContext.userId = userId
    _headers.Authorization = 'Bearer ' + token
    _headers.userId = userId
  }
  // 创建一个axios实例
  const instance = axios.create({
    // 设置默认的headers
    headers: _headers,
    // 设置请求超时设置
    timeout: 30000,
    // 返回类型json
    responseType: 'json'
  })
  // const { $message } = this
  try {
    const response = await instance(options)
    // 获取请求数据
    const data = response.data
    const respData = {...data}
    return Promise.resolve(respData)
  } catch (err) {
    // 请求失败
    let resError = err.response || {}
    switch (resError.status) {
      case 401:
        this.$router.replace(loginPage)
        break
      case 403:
        Message.error('登录过期，请关闭重新进入')
        break
      case 404:
        Message.error('404报错，请联系管理员')
        break
      case 500:
        Message.error(resError.replyText)
        break
      case 503:
        Message.error('服务器报错，请联系管理员')
        break
    }
    // if (resError.status === 401) {
    //   // 请求未完成待补充
    //   this.$router.replace(loginPage)
    // } else {
    const errorObj = {code: resError.status}
    return Promise.reject(errorObj)
    // }
  } finally {
    // 请求完成
    complete && complete()
  }
}

export default Http

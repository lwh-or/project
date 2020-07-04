import {GET_USER_INFO, GET_IS_LOGIN, GET_USER_ID, GET_TOKEN, GET_TAG, GET_TAG_MENU} from 'src/store/getters/type'

export default {
  // 获取用户信息
  [GET_USER_INFO]: state => {
    return state.userInfo || {}
  },
  // 客户编号
  [GET_USER_ID]: state => {
    return state.userInfo.userId
  },
  // 客户编号
  [GET_TOKEN]: state => {
    return state.token
  },
  // 判断是否登录
  [GET_IS_LOGIN]: state => !!state.userInfo && JSON.stringify(state.userInfo) !== '{}' && state.token,
  // TAG
  [GET_TAG]: state => {
    return state.tag
  },
  // TAG
  [GET_TAG_MENU]: state => {
    return state.tagmenu
  }
}

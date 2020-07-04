import * as type from 'src/store/mutations/type'
import {sessionStorage} from 'src/common/storage'

export default {
  // 设置用户信息和是否登录
  [type.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    if (!userInfo) {
      sessionStorage.remove('user_info')
    } else {
      sessionStorage.set('user_info', userInfo)
    }
  },
  // 设置用户信息和是否登录
  [type.SET_TOKEN] (state, token) {
    state.token = token
    if (!token) {
      sessionStorage.remove('token')
    } else {
      sessionStorage.set('token', token)
    }
  },
  //
  [type.SET_TAG] (state, tag) {
    state.tag = tag
    if (!tag) {
      sessionStorage.remove('tag')
    } else {
      sessionStorage.set('tag', tag)
    }
  },
  [type.SET_TAG_MENU] (state, tagmenu) {
    state.tagmenu = tagmenu
    if (!tagmenu) {
      sessionStorage.remove('tagmenu')
    } else {
      sessionStorage.set('tagmenu', tagmenu)
    }
  }
}

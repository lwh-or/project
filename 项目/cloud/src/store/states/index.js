import {sessionStorage} from 'src/common/storage'

export default {
  // 用户信息和是否登录
  userInfo: sessionStorage.get('user_info'),
  // 用户信息和是否登录
  token: sessionStorage.get('token'),
  // TAG
  tagmenu: sessionStorage.get('tagmenu'),
  tag: sessionStorage.get('tag')
}

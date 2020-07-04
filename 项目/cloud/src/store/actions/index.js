import * as actions from 'src/store/actions/type'
import * as mutations from 'src/store/mutations/type'

export default {
  // 设置用户信息和登录
  [actions.SET_USER_INFO] ({commit}, userInfo) {
    commit(mutations.SET_USER_INFO, userInfo)
  },
  [actions.SET_TOKEN] ({commit}, token) {
    commit(mutations.SET_TOKEN, token)
  },
  [actions.SET_TAG] ({commit}, tag) {
    commit(mutations.SET_TAG, tag)
  },
  [actions.SET_TAG_MENU] ({commit}, tagmenu) {
    commit(mutations.SET_TAG_MENU, tagmenu)
  }
}

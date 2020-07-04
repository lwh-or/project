import fetch from 'src/fetch'
import * as userUrl from '../constant/user'

// 登录
export const login = (data) => {
  return fetch({
    url: userUrl.login,
    method: 'post',
    data
  })
}
// 登出
export const logout = (data) => {
  return fetch({
    url: userUrl.logout,
    method: 'post',
    data
  })
}
// 菜单
export const menu = (data) => {
  return fetch({
    url: userUrl.menu,
    method: 'post',
    data
  })
}
// 新增用户
export const addition = (data) => {
  return fetch({
    url: userUrl.addition,
    method: 'post',
    data
  })
}
// 用户信息
export const userList = (data) => {
  return fetch({
    url: userUrl.userList,
    method: 'post',
    data
  })
}

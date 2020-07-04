import fetch from 'src/fetch'
import * as systemUrl from '../constant/system'

// 系统管理用户列表
export const userList = (data) => {
  return fetch({
    url: systemUrl.userList,
    method: 'post',
    data
  })
}

// 系统管理菜单列表
export const menuList = (data) => {
  return fetch({
    url: systemUrl.menuList,
    method: 'post',
    data
  })
}

// 系统管理字典列表
export const dictList = (data) => {
  return fetch({
    url: systemUrl.dictList,
    method: 'post',
    data
  })
}

// 系统管理组织列表
export const orgList = (data) => {
  return fetch({
    url: systemUrl.orgList,
    method: 'post',
    data
  })
}

// 系统管理角色列表
export const roleList = (data) => {
  return fetch({
    url: systemUrl.roleList,
    method: 'post',
    data
  })
}

// 系统管理角色列表
export const treeMenuList = (data) => {
  return fetch({
    url: systemUrl.treeMenuList,
    method: 'post',
    data
  })
}

// 系统机构用户列表
export const orgUserList = (data) => {
  return fetch({
    url: systemUrl.orgUserList,
    method: 'post',
    data
  })
}

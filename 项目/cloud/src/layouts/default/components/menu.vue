<!--
/**
 * @intro: 左边导航菜单.
 */
-->
<template>
  <el-aside width="200px" class="default-layout-left-menu">
    <el-container class="height_100" direction="vertical">
      <router-link tag="div" :to="homePage" class="logo-view align_center width_100 pointer">
        <img src="./images/logo.png"/>
      </router-link>
      <el-scrollbar class="flex__item" wrap-style="overflow-x: hidden;">
        <el-menu
          class="menu-warp"
          :default-active="getDefaultActive"
          :router="true"
          unique-opened
          background-color="#344058"
          text-color="#c2d7e6"
          active-text-color="#fff">
          <template v-for="(item, index) in menu">
          <el-submenu v-if="item.child && item.child.length" :index="`menu_${index}`" :key="item.path">
            <template slot="title">
              <i class="menu__icon iconfont" :class="item.icon" v-if="item.icon"/>
              <span>{{item.label}}</span>
            </template>
            <template v-for="itemChild in item.child">
              <el-submenu v-if="itemChild.child && itemChild.child.length" :index="itemChild.path" :key="itemChild.path">
                <template slot="title">
                  <i class="menu__icon iconfont" :class="itemChild.icon" v-if="itemChild.icon"/>
                  <span class="menu__label">{{itemChild.label}}</span>
                </template>
                <el-menu-item v-for="itemChild_child in itemChild.child" :index="itemChild_child.path" :key="itemChild_child.path">
                  <i class="menu__icon iconfont" :class="itemChild_child.icon" v-if="itemChild_child.icon"/>
                  <span slot="title"  class="menu__label">{{itemChild_child.label}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
                <i class="menu__icon iconfont" :class="itemChild.icon" v-if="itemChild.icon"/>
                <span slot="title" class="menu__label">{{itemChild.label}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="item.path">
            <i class="menu__icon iconfont" :class="item.icon" v-if="item.icon"/>
            <span slot="title" class="menu__label">{{item.label}}</span>
          </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-container>
  </el-aside>
</template>
<script type="text/javascript">
import {homePage} from 'src/common/setting'
// import {Home} from 'src/router/auto-routes'
import {GET_USER_INFO} from 'src/store/getters/type'
import {SET_TAG_MENU} from 'src/store/actions/type'
import Store from 'src/store'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      homePage,
      menu: [],
      tapList: []
    }
  },
  methods: {
    ...mapActions({
      setTagMenu: SET_TAG_MENU
    }),
    async menuInit () {
      const { $api, $message } = this
      const isLogin = Store.getters[GET_USER_INFO]
      // console.log(isLogin)
      try {
        let {dataList} = await $api.user.menu({userId: isLogin.userId})
        console.log(dataList)
        let temp = []
        dataList.map(item => {
          let arr = {
            label: item.menuName,
            path: item.menuUrl,
            icon: item.menuIcon,
            child: []
          }
          if (item.childs.length > 0) {
            item.childs.map(items => {
              let brr = {
                label: items.menuName,
                path: items.menuUrl,
                icon: items.menuIcon,
                child: []
              }
              if (items.childs !== null) {
                items.childs.map(ite => {
                  let crr = {
                    label: ite.menuName,
                    path: ite.menuUrl,
                    icon: ite.menuIcon
                  }
                  brr.child.push(crr)
                })
              }
              arr.child.push(brr)
            })
            temp.push(arr)
          }
        })
        console.log(temp, 'temp')
        this.menu = [...this.menu, ...temp]
        console.log(this.menu)
        sessionStorage.setItem('menu', JSON.stringify(this.menu))
      } catch (error) {
        console.log(error)
        $message.error(error.replyText)
      } finally {
        this.submitLoad = false
      }
    }
  },
  mounted () {
    this.menu = JSON.parse(sessionStorage.getItem('menu')) ? JSON.parse(sessionStorage.getItem('menu')) : []
    if (this.menu.length === 0) {
      this.menuInit()
    }
  },
  computed: {
    getDefaultActive () {
      const { setTagMenu } = this
      const {meta, path} = this.$route
      let temp = JSON.parse(JSON.stringify(this.menu))
      let temparr = []
      temp.map(item => {
        let arr = {
          name: item.label,
          path: item.path
        }
        temparr.push(arr)
        if (item.child) {
          item.child.map(items => {
            let arr = {
              name: items.label,
              path: items.path
            }
            temparr.push(arr)
            if (items.child) {
              items.child.map(ite => {
                let arr = {
                  name: ite.label,
                  path: ite.path
                }
                temparr.push(arr)
              })
            }
          })
        }
      })
      temparr = temparr.filter(item => item.path !== null)
      console.log(temparr)
      setTagMenu(temparr)
      return meta.active || path
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .default-layout-left-menu {
    background-color: #344058;

    .logo-view {
      margin: 10px auto;
    }

    .menu-warp {
      border: none;

      .menu__label, .menu__icon {
        color: #fff;
      }

      .menu__icon {
        width: 20px;
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: normal;
      }

      .el-submenu {
        .el-menu-item {
          background-color: #252d3e !important;
        }
      }

      .el-menu-item {
        &.is-active {
          background-color: #1e9fff !important;
        }
      }
    }
  }
</style>

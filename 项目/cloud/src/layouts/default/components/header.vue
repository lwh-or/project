<!--
/**
 * @intro: 布局头部文件.
 */
-->
<template>
  <div class="default-layout-header">
    <div class="header-bar relative">
      <div class="head-text flex">
        <i class="el-icon-bell"/>
        <span>欢迎登录后台管理平台</span>
      </div>
      <el-dropdown class="head-right">
        <div class="head-user flex pointer">
          <img :src="userInfo.avatarUrl" class="head-avatar">
          <span class="user-text" v-text="userInfo.name"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list" @click.native="onLogout">
            <i class="icon fa fa-user"/>
            <span class="user-text">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     <div class="header-bar relative">
       <el-tag
          v-for="menu in historyMenu"
          :key="menu.name"
          :closable="menu.path === '/home'?false:true"
          :class="menu.active ? 'el-tag-avtive' : 'el-tag'"
          @click="selectNavBar(menu.path)" @close="removeTab(menu.path)">
      {{menu.name}}
    </el-tag>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'
import {GET_USER_INFO, GET_TAG, GET_TAG_MENU} from 'src/store/getters/type'
import {SET_USER_INFO, SET_TOKEN, SET_TAG} from 'src/store/actions/type'
import {UserLogin} from 'src/router/auto-routes'
// import { deteleObject } from 'src/format/format'

export default {
  data () {
    return {
      historyMenu: [],
      defaultTagMenu: [
        {
          name: '个人中心',
          active: true,
          path: '/home'
        }
      ]
    }
  },
  mounted () {
    console.log(JSON.stringify(this.tag))
    if (JSON.stringify(this.tag) === '{}' || this.tag === null) {
      console.log(2)
      this.historyMenu = this.defaultTagMenu
    } else {
      this.historyMenu = this.tag
    }
    console.log(this.historyMenu)
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route (to, from) {
      const { setTag } = this
      // let temp = []
      this.tagmenu.map(item => {
        if (to.path === item.path) {
          let arr = {
            name: item.name,
            path: item.path,
            active: false
          }
          this.historyMenu.push(arr)
        }
      })
      // this.historyMenu = deteleObject(this.historyMenu)
      let obj = {}
      let datastemp = this.historyMenu.reduce((cur, next) => {
        if (!obj[next.path]) {
          obj[next.path] = true
          cur.push(next)
        }
        return cur
      }, [])
      this.historyMenu = datastemp
      this.historyMenu.map(item => {
        if (item.path === to.path) {
          item.active = true
        } else {
          item.active = false
        }
      })
      setTag(this.historyMenu)
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: SET_USER_INFO,
      setToken: SET_TOKEN,
      setTag: SET_TAG
    }),
    // 登出
    async onLogout () {
      const {$confirm, $api, $message, $router, setUserInfo, setToken, setTag} = this
      try {
        await $confirm('此操作将退出登录, 是否继续?', '提示', {type: 'warning'})
        await $api.user.logout({})
        $message.success('退出成功')
        setUserInfo(null)
        setToken(null)
        setTag(null)
        sessionStorage.removeItem('menu')
        $router.replace(UserLogin.path)
      } catch ({msg}) {
        msg && $message.warn(msg)
      }
    },
    selectNavBar (val) {
      this.$router.push(val).catch(err => err)
    },
    removeTab (path) {
      const { setTag } = this
      let temp = JSON.parse(JSON.stringify(this.historyMenu))
      temp.map((item, i) => {
        if (item.path === path) {
          if (this.historyMenu.length === 1) {
            this.$router.push({ path: this.historyMenu[0].path })
          } else {
            if (this.historyMenu[i].active === true) {
              this.historyMenu[0].active = true
              this.$router.push({ path: this.historyMenu[0].path })
            }
          }
          this.historyMenu.splice(i, 1)
        }
      })
      setTag(this.historyMenu)
    }
  },
  computed: {
    ...mapGetters({
      userInfo: GET_USER_INFO,
      tag: GET_TAG,
      tagmenu: GET_TAG_MENU
    })
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" >
  .default-layout-header {
    padding: 0;
    .header-tab{
      height: 30px;
      background-color: #344058;
    }
    .header-bar {
      padding: 20px 20px 0 0px;
      line-height: 56px;
      font-size: 12px;
      color: #fff;
      background-color: #344058;

      .head-text {
        align-items: center;
      }

      .head-right {
        position: absolute;
        top: 0;
        right: 15px;

        .head-user {
          align-items: center;
        }

        .user-text {
          color: #fff;

          &.logout {
            margin-left: 20px;
          }
        }
      }

      .head-avatar {
        margin-right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 18px;
      }
    }
    .el-tag {
      border-radius:6px 6px 0px 0px !important;
      background-color: #515B71;
      border-color: #515B71;
      color: #8D9399;
      margin-right: 10px;
      cursor: pointer;
      height: 30px;
    }
    // .el-tag:hover{
    //   background-color: #F5F5F5;
    //    border-color: #F5F5F5;
    //   color: #3F3F3F;
    // }
    .el-tag-avtive{
      background-color: #F5F5F5;
       border-color: #F5F5F5;
      color: #3F3F3F;
    }
    .el-tag .el-tag__close{
      color: #8D9399;
    }
  }
</style>

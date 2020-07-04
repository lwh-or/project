/**
 * @intro: 主程序入口.
 */

// 导入样式
import 'normalize.css'
import 'src/assets/font/iconfont.css'
import 'src/assets/scss/main.scss'
// 导入Vue框架
import Vue from 'vue'
// 导入element组件
import ElementUI from './element-ui'
// 导入组件
import components from './components'
// 导入路由
import router from './router'
// 导入状态管理器
import store from 'src/store'

// 导入自定义插件
import plugin from './plugin'
// 导入主视图文件
import App from './App'
import echarts from 'echarts'
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
// 注册
Vue.use(ElementUI)
Vue.use(components)
Vue.use(plugin)

// 发布后是否显示提示
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('mainbody')

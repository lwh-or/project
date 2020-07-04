import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.config.productionTip = false


const messages = {
  en: require('./i18/en'),
  zh: require('./i18/zh')
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh', // set locale
  messages, // set locale messages
})

Vue.prototype.$win = window;

import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import animated from 'animate.css' // npm install animate.css --save安装，在引入

Vue.use(animated)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

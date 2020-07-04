import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import state from './store/state'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css';

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)


Vue.use(ElementUI);
Vue.use(VueI18n)

Vue.config.productionTip = false
const messages = {
  en: require('./i18n/en'),
  zh: require('./i18n/zh-CN')
}
// Create VueI18n instance with options
// const i18n = new VueI18n({
//   locale: state.language, // set locale
//   messages, // set locale messages
// })
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import clipboard from 'clipboard';
import VueBetterScroll from 'vue2-better-scroll';
Vue.use(VueBetterScroll);

Vue.prototype.$time = new Vue

import Directives from './tool/directives';
Vue.use(Directives);
// vuex
import store from './store'

// vant
import Vant from 'vant';
import 'vant/lib/index.css' //vant样式
import 'vant/lib/icon/local.css';
Vue.use(Vant);

// reset
import '../static/css/reset.css'  //样式重置

// Axios
import Axios from './api/http'
Vue.use(Axios)


// 处理 计算精度问题
const BN = require('bignumber.js');
Vue.prototype.$BN = BN;
window['BN'] = BN;


// 处理es6语法兼容问题
import 'babel-polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();

// 处理点击穿透问题
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false)
}


// 过滤器
import './filters/index.js'

import 'muse-ui/lib/styles/base.less';
import { Form, TextField, Card, Button, List, Divider } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
Vue.use(Form)
  .use(TextField)
  .use(Card)
  .use(Button)
  .use(List)
  .use(Divider)



import {
  Table, TableColumn, Loading, Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  Steps,
  Step,
  Slider,
} from 'element-ui';
Vue.use(Table)
  .use(TableColumn)
  .use(Loading.directive)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Steps)
  .use(Step)
  .use(Slider)
  .use(Collapse)


// Mui
import Mui from 'vue-awesome-mui';
Vue.use(Mui);



Vue.config.productionTip = false

// 注册全局组件
import Header from './components/header'
import Forms from './components/Form'
Vue.component(Header.name, Header)
Vue.component(Forms.name, Forms)



//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//注册到vue原型上
Vue.prototype.clipboard = clipboard;

// import 

const vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  eventHub: new Vue()
})

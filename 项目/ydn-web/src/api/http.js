import axios from 'axios';
import store from '../store'
import router from '../router'
import {
  Toast
} from 'vant';

// http://ydn.api.gcoincloud.top/api

const baseURL =
  process.env.NODE_ENV === "development" ? "http://ydn.api.gcoincloud.top/api" : "http://ydn.api.gcoincloud.top/api";

//创建axios实例
export const Axios = axios.create({
  baseURL,
  // timeout: 5000,
})

// Axios.defaults.withCredentials = true; // 跨域请求是否需要凭证

//添加请求拦截器
Axios.interceptors.request.use((config) => {
  //在发送请求之前设置token
  if (store.state.token) {
    config.headers.common['Authentication'] = store.state.token
  }
  return config;
}, (err) => {
  //对请求错误做些什么
  console.log(err);
  return Promise.reject(err);
})

//添加响应拦截器
Axios.interceptors.response.use((res) => {
  if (res.data.status && res.data.status !== 200) {
    if (router.history.current.name == 'home') {
      return res;
    }

    if (res.data.msg) {
      
      // Toast(res.data.msg);
    }
  }
  if (res.data.status == 401) {
    // Toast(res.data.msg);
    store.commit('LOGOUT');
    router.push('/login');
    // window.location.reload(); // 刷新页面
  }
  return res;
}, (err) => {
  // console.log('errlanjie',err.response);
  // if(err.response.status==401){
  //   store.commit('LOGOUT');
  //   router.push('/login');
  // }else{
  //   err.obj=err.response.data.errors;
  //   Object.keys(err.obj).forEach((key)=>{
  //     if(key){
  //         Toast(err.obj[key][0]);
  //     }
  //   })
  // }
  // return err
})

// 将 Axios 实例添加到Vue的原型对象上
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}

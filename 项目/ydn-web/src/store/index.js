import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const model = {
  state: {
    token: localStorage.getItem('_token_ydn'),
    user: {},
    globalTime: null,
    conversion_total: 0,
    url: 'http://ydn.api.gcoincloud.top',
    open_url: 'http://ydn.api.gcoincloud.top/api/download',
    pay_pwd: ''
  },
  mutations: {
    INITUSER: (state, data) => {
      state.token = data.token;
      localStorage.setItem('_token_ydn', state.token);
      if (localStorage.getItem('show_asset')) {
        return;
      }
      localStorage.setItem('show_asset', 'show')
    },
    LOGOUT: (state) => {
      localStorage.removeItem('_token_ydn');
      state.token = '';
    },
    // 保存用户信息
    SAVEUSERINFO: (state, user) => {
      state.user = user
    },
    // 没用
    SAVEGLOBALTIME: (state, time) => {
      state.globalTime = time
    },
    // 资产
    CONVERSION_TOTAL: (state, data) => {
      state.conversion_total = data
    },
    // 保存交易密码
    SAVE_PASSWORD: (state, data) => {
      state.pay_pwd = data
    },
  },
}

export default new Vuex.Store(model)

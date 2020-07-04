import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
import en from './en.js'
import zh from './zh.js'


const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh-CN',
    messages: {
      'zh-CN': zh, // 中文语言包
      'en-US': en// 英文语言包
    },
  silentTranslationWarn: true
})

export default i18n;

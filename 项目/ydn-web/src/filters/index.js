// 全局过滤器
import Vue from 'vue'

Vue.filter('formatData', (timestamp) => {
  var time = new Date(timestamp * 1000)
  var y = time.getFullYear()
  var M = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var m = time.getMinutes()
  var s = time.getSeconds()
  if (M < 10) {
    M = '0' + M
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
})

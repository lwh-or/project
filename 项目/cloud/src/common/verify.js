/**
 * @intro: 常用验证工具类.
 *
 */
/**
 * //验证url是否正确
 * @param url
 * @returns {boolean}
 */
// eslint-disable-next-line
export const isUrl = url => (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i).test(url)
/**
 * 验证手机号码是否正确
 * @param tel
 * @returns {boolean}
 */
export const isTel = tel => (/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/).test(tel)
/**
 * 验证邮箱是否正确
 * @param mail
 * @returns {boolean}
 */
export const isMail = mail => (/^\w+@[a-z0-9]+\.[a-z]{2,4}$/).test(mail)
/**
 * 判断是否是object对象
 * @param obj
 * @returns {boolean}
 */
export const isObject = obj => !!obj && Object.prototype.toString.call(obj) === '[object Object]'
/**
 * 判断是否是数组
 * @param array
 * @returns {boolean}
 */
export const isArray = array => !!array && Object.prototype.toString.call(array) === '[object Array]'

/**
 * 验证银行卡是否正确
 * @param bankNO
 * @returns {boolean}
 */
export const isBankNo = bankno => (/^[1-9]\d{12,18}$/).test(bankno)

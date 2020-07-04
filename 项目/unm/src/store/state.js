import {getItem} from '../utils/localstorage'

export default{
    language:getItem('language') || navigator.language
}
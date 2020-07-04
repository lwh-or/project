import {CHANGELAN } from './mutation-types'
export default{
    changelan({commit},language){
        commit(CHANGELAN,language)
    }
}
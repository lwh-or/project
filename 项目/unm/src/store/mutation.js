import {CHANGELAN} from './mutation-types'
export default {
    [CHANGELAN](state,language){
        state.language = language
    }
}
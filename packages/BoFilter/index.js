import {
    BoFilter
} from './src/main';

export default {
    install(Vue) {
        Vue.filter('boFilter', BoFilter)
    }
}
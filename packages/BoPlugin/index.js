import {
    watermark
} from './src/watermark.js';

export default {
    install(Vue) {
        Vue.prototype.$watermark = watermark
    }
}
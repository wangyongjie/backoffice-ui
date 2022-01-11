import { watermark } from './src/watermark.js';
import exportExcel from './src/exportExcel.js';

export default {
    install(Vue) {
        Vue.prototype.$watermark = watermark
        Vue.prototype.$exportExcel = exportExcel
    }
}
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default async ({
    Vue,
    isServer
}) => {
    Vue.use(ElementUI, {
        size: 'small'
    })
    
    // https://blog.csdn.net/qq_35675325/article/details/110665057
    if (!isServer) {
        if(typeof window !== 'undefined') {
            window.global = window
        }
        await import('../../../lib/backoffice-ui.umd.min.js').then(function (m) {
            Vue.use(m.default)
        })
    }
}
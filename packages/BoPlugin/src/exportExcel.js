import { export_json_to_excel } from './Export2Excel'

export default function (opts) { // 需要为普通函数，在Vue实例内调用时可使用$route
    if (!opts.filename && this.$route) {
        opts.filename = this.$route.query.tab || this.$route.name || ''
    }
    export_json_to_excel(opts)
}
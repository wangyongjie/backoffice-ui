import BoCurrencyInput from '../packages/BoCurrencyInput/index'
import BoCopy from '../packages/BoCopy/index'
import BoPagination from '../packages/BoPagination/index.js';
import BoDialog from '../packages/BoDialog/index.js';
import BoMenu from '../packages/BoMenu/index.js';
import BoPage from '../packages/BoPage/index.js';
import BoSearch from '../packages/BoSearch/index.js';
import BoSelect from '../packages/BoSelect/index.js';
import BoSelectInput from '../packages/BoSelectInput/index.js';
import BoSelectDate from '../packages/BoSelectDate/index.js';
import BoTable from '../packages/BoTable/index.js';

const components = [
    BoCurrencyInput,
    BoCopy,
    BoPagination,
    BoDialog,
    BoMenu,
    BoPage,
    BoSearch,
    BoSelect,
    BoSelectInput,
    BoSelectDate,
    BoTable,
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.filter('boFilter', (value, format) => {
        if (value && format === 'number') {
            value = value.toString();
            return value.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                return s + ",";
            });
        } else {
            return value;
        }
    })

    // 初始化公共变量 
    Vue.prototype.$BACKOFFICE = {
        loadMutation: opts.loadMutation || '',  // loading在vuex中修改的mutation
        loadState: opts.loadState || ''  // loading在vuex中的state地址
    };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    BoCopy,
    BoPagination,
    BoDialog,
    BoMenu,
    BoPage,
    BoSearch,
    BoSelect,
    BoSelectInput,
    BoSelectDate,
    BoTable,
};

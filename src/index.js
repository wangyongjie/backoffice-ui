import BoCurrencyInput from '../packages/BoCurrencyInput/index'
import BoCopy from '../packages/BoCopy/index'
import BoPagination from '../packages/BoPagination/index.js';
import BoRangeInput from '../packages/BoRangeInput/index.js';
import BoDialog from '../packages/BoDialog/index.js';
import BoEmoji from '../packages/BoEmoji/index.js';
import BoFormItem from '../packages/BoFormItem/index.js';
import BoImageUpload from '../packages/BoImageUpload/index.js';
import BoMenu from '../packages/BoMenu/index.js';
import BoPage from '../packages/BoPage/index.js';
import BoSearch from '../packages/BoSearch/index.js';
import BoMultLang from '../packages/BoMultLang/index.js';
import BoSelect from '../packages/BoSelect/index.js';
import BoSelectInput from '../packages/BoSelectInput/index.js';
import BoSelectDate from '../packages/BoSelectDate/index.js';
import BoTable from '../packages/BoTable/index.js';
import BoFilter from '../packages/BoFilter/index.js';
import BoPlugin from '../packages/BoPlugin/index.js';
import BoSection from '../packages/BoSection/index.js';
import BoPlus from '../packages/BoPlus/index.js';
import BoChart from '../packages/BoChart/index.js';

const components = [
    BoCurrencyInput,
    BoCopy,
    BoPagination,
    BoRangeInput,
    BoDialog,
    BoEmoji,
    BoFormItem,
    BoImageUpload,
    BoMenu,
    BoPage,
    BoSearch,
    BoMultLang,
    BoSelect,
    BoSelectInput,
    BoSelectDate,
    BoTable,
    BoSection,
    BoPlus,
    BoChart,
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.use(BoFilter);
    Vue.use(BoPlugin);

    // 初始化公共变量 
    Vue.prototype.$BACKOFFICE = {
        loadMutation: opts.loadMutation || '',  // loading在vuex中修改的mutation
        loadState: opts.loadState || '',  // loading在vuex中的state地址
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
    BoRangeInput,
    BoDialog,
    BoEmoji,
    BoImageUpload,
    BoMenu,
    BoPage,
    BoSearch,
    BoMultLang,
    BoSelect,
    BoSelectInput,
    BoSelectDate,
    BoTable,
    BoSection,
    BoPlus,
    BoChart,
};

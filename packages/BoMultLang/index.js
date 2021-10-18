import BoMultLang from './src/main';

BoMultLang.install = function(Vue) {
  Vue.component(BoMultLang.name, BoMultLang)
};

export default BoMultLang;
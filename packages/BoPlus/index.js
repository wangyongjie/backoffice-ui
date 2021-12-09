import BoPlus from './src/main';

BoPlus.install = function(Vue) {
  Vue.component(BoPlus.name, BoPlus)
};

export default BoPlus;
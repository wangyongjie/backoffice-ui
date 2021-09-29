import BoCopy from './src/main';

BoCopy.install = function(Vue) {
  Vue.component(BoCopy.name, BoCopy)
};

export default BoCopy;
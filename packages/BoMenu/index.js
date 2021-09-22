import BoMenu from './src/main';

BoMenu.install = function(Vue) {
  Vue.component(BoMenu.name, BoMenu)
};

export default BoMenu;
import BoDialog from './src/main';

BoDialog.install = function(Vue) {
  Vue.component(BoDialog.name, BoDialog)
};

export default BoDialog;
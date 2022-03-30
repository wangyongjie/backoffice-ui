import BoFileHandler from './src/main';

BoFileHandler.install = function(Vue) {
  Vue.component(BoFileHandler.name, BoFileHandler)
};

export default BoFileHandler;
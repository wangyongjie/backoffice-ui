import BoEmoji from './src/main';

BoEmoji.install = function(Vue) {
  Vue.component(BoEmoji.name, BoEmoji)
};

export default BoEmoji;
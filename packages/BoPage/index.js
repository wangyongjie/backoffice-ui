import BoPage from './src/main';

BoPage.install = function(Vue) {
  Vue.component(BoPage.name, BoPage)
};

export default BoPage;
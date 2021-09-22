import BoSearch from './src/main';

BoSearch.install = function(Vue) {
  Vue.component(BoSearch.name, BoSearch)
};

export default BoSearch;
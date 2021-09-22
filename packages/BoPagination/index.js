import BoPagination from './src/main';

BoPagination.install = function(Vue) {
  Vue.component(BoPagination.name, BoPagination)
};

export default BoPagination;
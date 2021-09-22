import BoTable from './src/main';

BoTable.install = function(Vue) {
  Vue.component(BoTable.name, BoTable)
};

export default BoTable;
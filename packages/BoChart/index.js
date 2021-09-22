import BoChart from './src/main';

BoChart.install = function(Vue) {
  Vue.component(BoChart.name, BoChart)
};

export default BoChart;
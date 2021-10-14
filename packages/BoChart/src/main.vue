<template>
  <div class="bo-chart">
    <line-chart v-if="type === 'line'" :chartData="chartData"></line-chart>
    <bar-chart v-else-if="type === 'bar'" :chartData="chartData"></bar-chart>
    <div class="pie-container" v-else-if="type === 'pie'">
      <div class="pie" v-for="(item, index) in chartData.datasets" :key="index">
        <div class="title">{{ item.label }}</div>
        <pie-chart
          :chartData="{ labels: chartData.labels, datasets: [item] }"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default {
  name: "BoChart",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  props: {
    /**
     * type: 'line' | 'bar' | 'pie'
     */
    type: {
      type: String,
      default: ''
    },
    /**
     * 同 [Chart.js data](https://www.chartjs.org/docs/latest/general/data-structures.html) 設定
     */
    chartData: {
      type: Object,
      default: () => {},
    },
  }
};
</script>
<style lang="scss" scoped>
.bo-chart {
  margin-bottom: 20px;
}
.pie-container {
  margin: 10px 0;
  display: flex;
  flex-flow: wrap;
  .title {
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
  .pie {
    flex-grow: 1;
    width: 33%;
  }
}
</style>

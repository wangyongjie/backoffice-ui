<template>
  <div v-if="chartOptions && chartOptions.visible">
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
import { transformUtils } from "./transform-utils";

export default {
  name: "BoChart",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  props: {
    /**
     * { visible, tableOptions, columns }
     * visible 是否顯示
     * tableOptions, columns 同 BoPage 設定
     */
    chartOptions: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    chartOptions: {
      handler(chartOptions) {
        const dataExist =
          chartOptions &&
          chartOptions.tableOptions &&
          chartOptions.tableOptions.data &&
          chartOptions.tableOptions.data.length;

        if (!dataExist) {
          this.type = "";
          this.chartData = null;
          return;
        }

        const trasformData = transformUtils.boChartData({
          tableOptions: chartOptions.tableOptions,
          columns: chartOptions.columns,
        });

        if (trasformData) {
          this.type = trasformData.type;
          this.chartData = trasformData.chartData;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      type: "",
      chartData: null,
    };
  },
};
</script>
<style lang="scss" scoped>
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

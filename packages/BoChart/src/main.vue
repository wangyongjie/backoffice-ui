<template>
  <div class="bo-chart">
    <!-- for loop pie chart -->
    <div class="pie-container" v-if="type === 'pie'">
      <div class="pie" v-for="(item, index) in option.series" :key="index">
        <div class="title">{{ item.name }}</div>
        <v-chart
          class="chart"
          :option="{ ...option, series: item }"
        />
      </div>
    </div>
    <!-- other charts -->
    <v-chart v-else :initOptions="initOptions" ref="chartRef" />
  </div>
</template>
<script>
import vChart from './v-chart.vue'
/**
 * 資料範例可參考 [前往 →](https://echarts.apache.org/examples/zh/index.html)  
 * <bo-chart ref="boChartRef" :option="option" />  
 * // 清空圖表內容  
 * this.$refs.boChartRef.clear()  
 * 
 */
export default {
  name: "BoChart",
  components: {
    vChart
  },
  props: {
    /**
     * type: 'pie' or others
     */
    type: {
      type: String,
      default: "",
    },
    /**
     * ECharts 的万能接口。修改这个 prop 会触发 ECharts 实例的 setOption 方法。查看[详情 →](https://echarts.apache.org/zh/option.html#title)
     */
    option: {
      type: Object,
      default: () => ({}),
    },
    initOptions: {
     type: Object,
     default: () => ({
       height: '400px'
     })
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(value) {
        if (this.type === "pie") return;
        this.$nextTick(() => {
          // clear previous option when type changed
          if (this.lastType && this.lastType !== this.type) {
            this.clear();
          }
          this.$refs.chartRef.setOption(value, true);
          this.lastType = this.type;
        });
      },
    },
  },
  data() {
    return {
      lastType: "",
    };
  },
  mounted() {
    this.$refs.chartRef.chart.on('dblclick', (params) => {
      this.$emit('dblclick', params)
    })
  },
  methods: {
    // clear type !== 'pie'
    clear() {
      this.$refs.chartRef.clear();
    },
  },
};
</script>
<style lang="scss" scoped>
.bo-chart {
  // height: 400px;
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
    // .chart {
    //   height: 400px;
    // }
  }
}
</style>

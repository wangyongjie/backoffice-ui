<template>
  <div class="v-chart"></div>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'v-chart',
  mixins: [resize],
  props: {
   option: Object,
   initOptions: {
     type: Object,
     default: () => ({
       height: '400px'
     })
   }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(value) {
        if (!value) {
          return
        }
        this.$nextTick(() => {
          this.setOption(value, true)
        });
      },
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  mounted() {
    this.chart = echarts.init(this.$el, 'macarons', this.initOptions)
  },
  methods: {
    setOption(option, notMerge) {
      this.chart.setOption(option, notMerge)
    },
     clear() {
      this.chart.clear();
    },
  }
}
</script>
<style lang="scss" scoped>
.v-chart {
  width: 100%;
  // height: 400px;
}
</style>
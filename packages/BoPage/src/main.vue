<template>
  <div ref="bopage" class="bopage">
    <bo-search
      v-if="formOptions"
      ref="searchForm"
      v-bind="formOptions"
      :loading="loading"
      @search="searchHandler"
      @excel="excelHandler"
    >
      <slot name="extraBtn"></slot>
      <el-button
        v-if="showChartBtn"
        icon="el-icon-data-line"
        type="primary"
        @click="toggleChart"
      >
        {{ t('bo.page.chartButtonText') }}
      </el-button>
      <!-- tips button -->
      <template v-if="tips && tips.length" v-slot:tips>
        <el-button
          class="tip-btn"
          type="text"
          icon="el-icon-question"
          @click="dialogVisible = true"
        ></el-button>
        <el-dialog
          custom-class="dialog-width"
          :title="t('bo.page.tipDialogTitle')"
          :visible.sync="dialogVisible"
        >
          <div v-for="(content, index) in tips" :key="`${index}contents`">
            {{ index + 1 }}. {{ content.label || content }}
            <div
              v-for="(child, index) in content.child || []"
              :key="`${index}child`"
            >
              {{ child }}
            </div>
          </div>
        </el-dialog>
      </template>
    </bo-search>

    <bo-chart
      v-if="chartOptions.visible"
      :type="chartOptions.type"
      :option="chartOptions.option"
    ></bo-chart>
    <!-- @slot 可從外部傳入 slot="preTable" 在 tabs & table 上方 -->
    <slot name="preTable"></slot>
    <!-- hide tabs by class when tabs.length === 1 -->
    <el-tabs
      v-if="tabs.length"
      v-model="tabActiveName"
      @tab-click="setChartOptions"
      :class="{ 'is-hide-tabs': tabs.length === 1 }"
      style="margin-top: -6px"
    >
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index + 'tab'"
        :label="tab.label"
        :name="index + 'tab'"
      >
        <bo-table
          v-loading.lock="loading"
          v-bind="tab.tableOptions"
          :height="
            tab.tableOptions.height !== undefined
              ? tab.tableOptions.height
              : height
          "
          border
          :columns="tab.columns"
          @sort-change="sortChange"
        >
          <!-- by pass slot for bo-table -->
          <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
          <template
            v-for="(_, name) in $scopedSlots"
            :slot="name"
            slot-scope="slotData"
            ><slot :name="name" v-bind="slotData"
          /></template>
        </bo-table>
      </el-tab-pane>
    </el-tabs>
    <bo-table
      v-else
      v-loading.lock="loading"
      v-bind="tableOptions"
      :height="tableOptions.height !== undefined ? tableOptions.height : height"
      border
      :columns="columns"
      @sort-change="sortChange"
    >
      <!-- by pass slot for bo-table -->
      <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
        ><slot :name="name" v-bind="slotData"
      /></template>
    </bo-table>

    <!-- @slot 可從外部傳入 slot="nextTable" 在 tabs & table 下方 -->
    <slot name="nextTable"></slot>

    <bo-pagination
      v-if="showPagination"
      :total="tableOptions.paginationTotals"
      :page.sync="pagination.page"
      :limit.sync="pagination.pageSize"
      :disabled="loading"
      @pagination="searchHandler"
    />
  </div>
</template>

<script>
import BoSearch from "../../BoSearch";
import BoPagination from "../../BoPagination";
import BoTable from "../../BoTable";
import BoChart from "../../BoChart";
import { transformUtils } from "../../BoChart/src/transform-utils";
import { flatColumns } from "../../utils/table";
import { getPosition } from '../../utils/dom'
import locale from '../../BoLocale/mixins/locale'

/**
 * 由 BoSearch, BoPagination, BoTable,  BoLineChart
 */
export default {
  name: "BoPage",
  mixins: [locale],
  components: {
    BoSearch,
    BoPagination,
    BoTable,
    BoChart,
  },
  props: {
    /**
     * 設定 autoSearch: true 進入頁面後會自動搜尋
     * 其他設定可參考 BoSearch
     */
    formOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * 顯示提示訊息按鈕及資料, 使用 element-ui button 和 dialog
     */
    tips: {
      type: Array,
      default: () => [],
    },
    /**
     * BoTable 設定
     */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * 除了 chart (可參考 custom chart),  
     * chart: {   
     *  show: true, 預設圖表是否顯示  
     *  type: 'line', 圖表類型  
     *  labelProp: 'time', x軸欄位   
     *  dataProps: [{  
     *    prop: 'prop1',  對應表格  
     *    label: 'Custom Label', 預設表格label 可以修改  
     *    color: 'black' 可修改預設顏色  
     *  }]  
     *  option: { 可依照 [echart.option 覆蓋設定](https://echarts.apache.org/zh/option.html#title)   
     *    xAxis: {},  
     *    yAxis: {},  
     *    ...  
     *  } 
     * }  
     * 設定 table 資料顯示圖表資料,
     * paginationTotals 設定分 pagination 的資料總和,
     * 其他設定可參考 BoTable
     */
    tableOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * 多層 tabs 設定
     */
    tabs: {
      type: Array,
      default: () => [],
    },
    /**
     * 顯示loading, 支持 .sync 修饰符
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否顯示 pagination
     */
    hasPagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pagination: {
        page: 1,
        pageSize: 20,
      },
      height: "300px",
      filter: {},
      sort: {},
      tabActiveName: "0tab",
      dialogVisible: false,
      chartOptions: {
        visible: false,
        type: "",
        option: {},
      },
    };
  },
  computed: {
    showPagination: function () {
      return !this.tabs.length && this.hasPagination;
    },
    showChartBtn() {
      return this.chartOptions && this.chartOptions.type;
    },
  },
  methods: {
    searchHandler(params) {
      this.filter = params ? params : this.filter;
      if (params) {
        this.pagination.page = 1;
      }
      this.$emit("update:loading", true);
      // 同步修改vuex中的loading参数
      this.$BACKOFFICE.loadMutation &&
        this.$store.commit(this.$BACKOFFICE.loadMutation, true);

      if (this.showPagination) {
        // search with filter & sort
        this.$emit("search", {
          ...this.filter,
          ...this.sort,
          limit: this.pagination.pageSize,
          skip: (this.pagination.page - 1) * this.pagination.pageSize,
        });
      } else {
        // search with sort
        this.$emit("search", { ...this.filter, ...this.sort });
      }
    },
    excelHandler(params) {
      this.filter = params ? params : this.filter;
      if (params) {
        this.pagination.page = 1;
      }
      if (this.tabs && this.tabs.length) {
        this.filter.tabActive = parseInt(this.tabActiveName) + 1;
      }
      // donwload all excel
      this.$emit("excel", {
        ...this.filter,
        ...this.sort,
        limit: 10000,
        skip: 0,
      });
    },
    autoHeight() {
      const height = this.$refs.bopage.offsetHeight;
      const bopage = getPosition(this.$refs.bopage)
      const newHeight =
        window.innerHeight - (height + bopage.y + 20) + parseInt(this.height);
      this.height = (newHeight > 300 ? newHeight : 300) + "px";
    },
    autoSearch() {
      this.$refs.searchForm.searchHandler();
    },
    sortChange({ order, prop }) {
      this.sort = { order, prop };
      this.searchHandler();
    },
    setChartOptions(tab) {
      // 無 tab 預設值
      let tableOptions = this.tableOptions || {};
      let columns = this.columns || [];
      // tab 預設值, 抓現在點選的 tab
      if (!tab && this.tabs && this.tabs.length) {
        const activeIndex = parseInt(this.tabActiveName)
        tableOptions = this.tabs[activeIndex].tableOptions;
        columns = this.tabs[activeIndex].columns;
      }
      if (tab) {
        const index = +tab.index;
        tableOptions = this.tabs[index].tableOptions;
        columns = this.tabs[index].columns;
      }
      const show =
        tableOptions && tableOptions.chart && tableOptions.chart.show;
      if (show) {
        this.chartOptions.visible = true;
      }
      const flatedColumns = flatColumns(columns);
      // trasform table to chart
      const dataExist =
        tableOptions && tableOptions.data && tableOptions.data.length;

      if (!dataExist) {
        this.chartOptions.visible = false;
        this.chartOptions.type = "";
        this.chartOptions.option = null;
        return;
      }

      const trasformData = transformUtils.boChartData({
        tableOptions,
        columns: flatedColumns,
      });

      if (trasformData) {
        this.chartOptions.type = trasformData.type;
        this.chartOptions.option = trasformData.option;
      }
    },
    toggleChart() {
      this.chartOptions.visible = !this.chartOptions.visible;
    },
  },
  mounted() {
    // 更新vuex中的loading
    this.$BACKOFFICE.loadMutation &&
      this.$store.commit(this.$BACKOFFICE.loadMutation, this.loading);
    // 添加vuex中的loading监控，如果为false，则把bo-page的loadin改为false
    this.$BACKOFFICE.loadState &&
      this.$watch(this.$BACKOFFICE.loadState, function (newVal) {
        if (!newVal) {
          this.$emit("update:loading", false);
        }
      });

    //适配table高度
    this.$nextTick(() => {
      this.autoHeight();
      this.setChartOptions();

      //是否自动搜索
      if (this.formOptions.autoSearch) {
        this.autoSearch();
      }
    });
  },
  watch: {
    tableOptions: {
      handler() {
        this.$emit("update:loading", false);
        this.setChartOptions();
      },
      deep: true,
    },
    tabs: {
      handler() {
        this.$emit("update:loading", false);
        this.setChartOptions();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.bopage {
  .tip-btn {
    float: right;
    padding: 3px 0;

    i {
      color: #606266;
      font-size: 24px;
    }
  }
  
  @media screen and (max-width: 600px) {
    .dialog-width {
      width: 100%;
    }
  }
  // hide tab header
  .is-hide-tabs {
    .el-tabs__header {
      display: none;
    }
  }
}
</style>

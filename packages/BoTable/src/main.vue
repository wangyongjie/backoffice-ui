<template>
  <div class="bo-table">
    <el-table
      v-bind="$attrs"
      :key="key"
      :data="extraData"
      @sort-change="sortChange"
    >
      <table-column
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :column="column"
      >
        <!-- by pass slot for bo-table -->
        <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
        <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
          ><slot :name="name" v-bind="slotData"
        /></template>
      </table-column>
    </el-table>
  </div>
</template>

<script>
import TableColumn from "./tableColumn";
import { flatColumns } from '../../utils/table'

/**
 * 同 [Table 表格](https://element.eleme.io/#/zh-CN/component/table#table-biao-ge)
 */
export default {
  name: "BoTable",
  components: {
    TableColumn,
  },
  data() {
    return {
      key: Date.now(),
      extraData: this.data,
    };
  },
  props: {
    /**
     * 同 [Table Attributes' data](https://element.eleme.io/#/en-US/component/table#table-attributes)
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * sortable 設定與官方相同
     * 支援多顯示格式(預設為文字)，具体参数看下面说明,
     * (column.slotName 不得為 extraBtn, bo-search 已使用)
     */
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * summary: 'avg' | 'sum' 或 summary: { type: 'avg', excludeProps: ['prop'], precision: 2}
     * 預設第一個欄位會變成 Sum 或 Avg, excludeProps 可排除欄位, precision 精準度到小數第幾位 (預設為0)
     */
    summary: {
      type: [String, Object],
      default: null,
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        const summary = this.getSummaries();
        if (summary) {
          this.extraData = [summary, ...data];
        }else {
          this.extraData = [...data];
        }
      },
    },
    columns: {
      immediate: true,
      handler(columns) {
        // 重写el-table的key值，避免表头混乱问题
        this.key = Date.now()

        // prevent 'extraBtn' used by table slot
        const useExtraBtn = columns.find((x) => x.slotName === "extraBtn");
        if (useExtraBtn) {
          alert(
            "slot name 'extraBtn' is used for bo-search, columns 'slotName' cannot use it again."
          );
        }
      },
    },
  },
  methods: {
    sortChange(event) {
      this.$emit("sort-change", event);
    },
    getSummaries() {
      const isString = (value) =>
        typeof value === "string" || value instanceof String;
      // 如果是字串或者null 不特別處理
      const summaryType =
        isString(this.summary) || !this.summary
          ? this.summary
          : this.summary.type;
      const excludeProps =
        this.summary && this.summary.excludeProps
          ? this.summary.excludeProps
          : [];
      const precision =
        this.summary && this.summary.precision ? this.summary.precision : 0;

      const summaryLabel = {
        avg: "Avg",
        sum: "Sum",
      }[summaryType];
      const noData = this.data.length === 0

      if (!summaryType || !summaryLabel || noData) {
        return null;
      }

      const results = {};
      const flatedColumns = flatColumns(this.columns)
      flatedColumns.forEach((column, index) => {
        const prop = column.prop;
        if (index === 0) {
          results[prop] = summaryLabel;
          return;
        }
        const values = this.data.map((item) => Number(item[prop]));
        // 如果是數字且不在排除名單
        if (
          !values.every((value) => isNaN(value)) &&
          !excludeProps.includes(prop)
        ) {
          const round = (n) => {
            return Number.isInteger(n) ? n : n.toFixed(precision)
          };
          const sum = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          const result =
            summaryType === "avg" ? round(sum / values.length) : sum;
          results[prop] = result
        } else {
          results[prop] = "-";
        }
      });
      return results;
    },
  },
};
</script>

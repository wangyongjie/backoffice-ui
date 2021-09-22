<template>
  <div class="bo_pagination">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "./scroll-to.js";
/**
 * 設定同 [Pagination](https://element.eleme.io/#/zh-CN/component/pagination)
 */
export default {
  name: "BoPagination",
  props: {
    /**
     * 总条目数
     */
    total: {
      required: true,
      type: Number,
      default: 0,
    },
    /**
     * 当前页数，支持 .sync 修饰符
     */
    page: {
      type: Number,
      default: 1,
    },
    /**
     * 每页显示个数选择器的选项设置，支持 .sync 修饰符
     */
    limit: {
      type: Number,
      default: 25,
    },
    /**
     * 每页显示个数选择器的选项设置
     */
    pageSizes: {
      type: Array,
      default() {
        return [20, 25, 50, 100];
      },
    },
    /**
     * 组件布局，子组件名用逗号分隔
     */
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    /**
     * 是否为分页按钮添加背景色
     */
    background: {
      type: Boolean,
      default: true,
    },
    /**
     * 切換分頁後，是否scroll to top
     */
    autoScroll: {
      type: Boolean,
      default: true,
    },
    /**
     * (尚未實作)
     */
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange() {
      /**
       * 當分頁改變時回傳
       */
      this.$emit("pagination");
      // size change
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange() {
      // current change
      this.$emit("pagination");
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style scoped>
.bo_pagination {
  background: #fff;
  padding: 16px 16px;
}
</style>

<template>
  <div>
    <!-- 占位栏 -->
    <div style="height: 50px;background:#fff;"></div>

    <div class="app-container">
      <bo-menu :menus="menus">
        <template #banner>
          <page-one></page-one>
        </template>
        <template #seo>
          <page-two></page-two>
        </template>
        <template #form>
          <page-three></page-three>
        </template>
        <template #chart>
          <chart></chart>
        </template>
        <template #tableSummary>
          <tableSummary></tableSummary>
        </template>
      </bo-menu>
    </div>
  </div>
</template>

<script>
import BoMenu from "../packages/BoMenu";
import pageOne from "./pages/pageOne.vue";
import pageTwo from "./pages/pageTwo.vue";
import pageThree from "./pages/pageThree.vue";
import chart from './pages/chart.vue';
import tableSummary from './pages/tableSummary.vue'

export default {
  name: "Home",
  components: {
    BoMenu,
    pageOne,
    pageTwo,
    pageThree,
    chart,
    tableSummary,
  },
  data() {
    return {
      menus: [
        {
          index: "banner",
          label: "Banner",
        },
        {
          index: "seo",
          label: "SEO",
        },
        {
          index: "form",
          label: "Form",
        },
        {
          index: "chart",
          label: "Chart",
        },
        {
          index: "tableSummary",
          label: "TableSummary",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.app-container {
  padding: 20px;
  position: relative;
  background: #f2f2f2c7;
}
</style>

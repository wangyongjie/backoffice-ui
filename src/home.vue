<template>
  <div>
    <!-- 占位栏 -->
    <div style="height: 50px; background: #fff"></div>

    <div class="app-container">
      <bo-menu :menus="menus" :keep-alive="true">
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
        <template #boMultLang>
          <bo-mult-lang></bo-mult-lang>
        </template>
        <template #selectInput>
          <select-input></select-input>
        </template>
        <template #tabs>
          <tabs></tabs>
        </template>
        <template #section>
          section
        </template>
        <template #trend>
          trend
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
import chart from "./pages/chart.vue";
import tableSummary from "./pages/tableSummary.vue";
import boMultLang from "./pages/boMultLang.vue";
import selectInput from "./pages/selectInput.vue";
import tabs from "./pages/tabs.vue";

export default {
  name: "Home",
  components: {
    BoMenu,
    pageOne,
    pageTwo,
    pageThree,
    chart,
    tableSummary,
    boMultLang,
    selectInput,
    tabs,
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
        {
          index: "boMultLang",
          label: "boMultLang",
        },
        {
          index: "selectInput",
          label: "selectInput",
        },
        {
          index: "tabs",
          label: "tabs",
        },
        {
          label: "Label",
          children: [
            {
              label: "Activity",
              children: [
                {
                  label: "Hands",
                  children: [
                    {
                      label: "Section",
                      index: "section",
                    },
                    {
                      label: "Trend",
                      index: "trend",
                    },
                  ],
                },
                {
                  label: "Non-match Hands",
                },
                {
                  label: "Matches",
                },
                {
                  label: "Days Played",
                },
                {
                  label: "Time played",
                },
                {
                  label: "Game TO",
                },
                {
                  label: "Player RW",
                },
              ],
            },
          ],
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

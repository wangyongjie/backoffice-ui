<template>
  <bo-page
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
  >
  </bo-page>
</template>

<script>
import BoPage from "../../packages/BoPage";

export default {
  components: {
    BoPage,
  },
  data() {
    return {
      formOptions: {
        inline: true,
        submitBtnText: "Search",
        forms: [],
      },
      columns: [],
      tableOptions: {},
    };
  },
  created() {
    this.generateTableData();
  },
  methods: {
    generateTableData() {
      const column = 8;
      const getRandomInt = () => Math.floor(Math.random() * (50 - 5 + 1)) + 5;

      this.columns = [{ prop: "time", label: "Time" }];
      for (let i = 0; i < column; i++) {
        this.columns.push({ prop: `prop${i}`, label: `Label${i}` });
      }

      const data = [];
      for (let j = 0; j < 10; j++) {
        let row = { time: `time${j}` };
        for (let i = 0; i < column; i++) {
          row[`prop${i}`] = getRandomInt();
        }
        data.push(row);
      }

      this.tableOptions = {
        chart: {
          show: true,
          type: "line",
          labelProp: "time",
        },
        data,
      };
    },
  },
};
</script>

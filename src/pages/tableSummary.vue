<template>
  <bo-table
    v-loading.lock="loading"
    :data="data"
    :height="height"
    border
    :summary="summary"
    :columns="columns"
  >
  </bo-table>
</template>

<script>
import BoTable from "../../packages/BoTable";

export default {
  components: {
    BoTable,
  },
  data() {
    return {
      loading: false,
      height: "300px",
    //   summary: "sum",
      summary: {
        type: "avg",
        precision: 3,
      },
      columns: [
        {
          prop: "id",
          label: "Id",
        },
        {
          prop: "a",
          label: "A",
          html: function render() {
            return '<pre>Name in pre</pre>'
          }
        },
        {
          prop: "b",
          label: "B",
        },
        {
          prop: "c",
          label: "C",
        },
      ],
      data: [
        {
          id: 1,
          a: 10,
          b: "text",
          c: 15,
        },
        {
          id: 2,
          a: 15,
          b: "text",
          c: 5,
        },
        {
          id: 3,
          a: 30,
          b: "text",
          c: 10,
        },
      ],
    };
  },
};
</script>

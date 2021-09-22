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
        forms: [
          { prop: "name", label: "Name" },
          { prop: "mobile", label: "Mobile" },
          // tab error alert, trigger on search
          { prop: "tab", label: "Tab", urlSync: true },
          {
            prop: "sex",
            label: "Sex",
            itemType: "select",
            options: [
              { value: 0, label: "Male" },
              { value: 1, label: "Female" },
            ],
          },
        ],
      },
      columns: [
        {
          label: "Delivery Info",
          children: [
            {
              label: "Delivery Info",
              children: [
                {
                  prop: "name",
                  label: "Name",
                  minWidth: 140,
                  align: "center",
                },
                {
                  prop: "currency",
                  label: "Currency",
                  minWidth: 140,
                  filter: "number",
                },
              ],
            },
            { prop: "mobile", label: "Mobile", minWidth: 180, align: "center" },
          ],
        },
        {
          prop: "sex",
          label: "Sex",
          minWidth: 80,
          align: "center",
          render: (row) => {
            const { sex } = row;
            return sex === 0 ? "Male" : sex === 1 ? "Female" : "Unknow";
          },
        },
      ],
      tableOptions: {
        data: [
          { name: "Sam", mobile: "15299xxxx", sex: 0, currency: 200000000 },
          { name: "Jean", mobile: "13452xxxx", sex: 1, currency: 200000000 },
          { name: "Tony", mobile: "187233xxxx", sex: 0, currency: 200000000 },
          { name: "Sam", mobile: "15299xxxx", sex: 0, currency: 200000000 },
          { name: "Jean", mobile: "13452xxxx", sex: 1, currency: 200000000 },
          { name: "Tony", mobile: "187233xxxx", sex: 0, currency: 200000000 },
          { name: "Sam", mobile: "15299xxxx", sex: 0, currency: 200000000 },
        ],
      },
    };
  },
};
</script>

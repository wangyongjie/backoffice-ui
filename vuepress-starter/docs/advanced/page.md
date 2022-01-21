## Page 页面
页面级别组件，可展示table，分页，筛选栏。

> bo-page 由 bo-search，bo-table，bo-pagination派生，相关参数配置可参考派生的组件。

### 基本用法

基础页面

:::demo 

```html
<template>
  <bo-page
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
    :loading.sync="loading"
    @search="searchHandle"
    @excel="searchHandle($event, true)"
  >
  </bo-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: "name", label: "Name" },
          { prop: "mobile", label: "Mobile" }
        ]
      },
      columns: [
        { prop: "name", label: "Name" },
        { prop: "mobile", label: "Mobile" }
      ],
      tableOptions: {
        data: [
          { name: "Sam", mobile: "15299xxxx" },
          { name: "Jean", mobile: "13452xxxx" },
          { name: "Tony", mobile: "187233xxxx" },
          { name: "Sam", mobile: "15299xxxx" }
        ],
        paginationTotals: 4,
        height: "250px"
      },
    };
  },
  methods: {
    searchHandle(params, excel) {
      if (excel) {
        this.$exportExcel({ columns: this.columns, data: this.tableOptions.data })
      } else {
        setTimeout(() => {
          this.tableOptions.data = [
            { name: "Sam", mobile: "15299xxxx" },
            { name: "Jean", mobile: "13452xxxx" }
          ];
          this.tableOptions.paginationTotals = 2
        }, 2000)
      }
    }
  },
};
</script>

```
:::

### Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| formOptions | 配置筛选项     | Object  | —      | {} |
| langs           | 所有语言   | Array   | —      | —          |
| form            | 表单配置   | Object  | —      | —          |
| formItems       | 表单项配置 | Array   | —      | —          |
| disabled        | 是否禁用   | boolean | —      | false      |

### Events
无

### Methods
| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
|  |  |  |
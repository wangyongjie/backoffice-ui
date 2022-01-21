## Plugin 公共方法

一些公用的全局方法。

### 基础用法

导出excel功能

:::demo

```html
<template>
<div>
  <!-- watermark -->
  <div v-if="watermarkProp">
    <p>this.$watermark(watermarkProp)</p>
    <div style="width: 900px; height: 900px; border: 1px solid black" ref="divRef"></div>
  </div>
  <!-- exportExcel -->
  <div v-if="exportExcel">
    <el-button type="primary" @click="exportData">Export Excel</el-button>
    <bo-table :columns="exportExcel.columns" :data="exportExcel.data"></bo-table>
  </div>
 
</div>
</template>
<script>
export default {
  data() {
    return {
      "watermarkProp": null,
      "exportExcel": {
        "columns": [{
            "prop": "date",
            "label": "日期"
          },
          {
            "label": "配送信息",
            "children": [{
                "prop": "name",
                "label": "姓名"
              },
              {
                "label": "地址",
                "children": [{
                    "prop": "province",
                    "label": "省份"
                  },
                  {
                    "prop": "city",
                    "label": "市区"
                  },
                  {
                    "prop": "address",
                    "label": "地址"
                  },
                  {
                    "prop": "zip",
                    "label": "邮编"
                  }
                ]
              }
            ]
          }
        ],
        "data": [{
            "date": "2016-05-03",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-02",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-04",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-01",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-08",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-06",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          },
          {
            "date": "2016-05-07",
            "name": "王小虎",
            "province": "上海",
            "city": "普陀区",
            "address": "上海市普陀区金沙江路 1518 弄",
            "zip": 200333
          }
        ],
        "describe": [
          "test1",
          "test1",
          "test1",
          "test1",
          "test1",
          "test1"
        ]
      }
    };
  },
  methods: {
    exportData() {
      this.$exportExcel({ columns: this.exportExcel.columns, data: this.exportExcel.data, describe: ['test1', 'test1', 'test1', 'test1', 'test1', 'test1'] })
    }
  }
}
</script>
```
:::
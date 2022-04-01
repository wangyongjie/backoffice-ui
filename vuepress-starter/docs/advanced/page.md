## Page 页面
页面级别组件，可展示table，分页，筛选栏。

> bo-page 由 bo-search，bo-table，bo-pagination派生，相关参数配置可参考派生的组件。

### 基本用法

基础页面

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' }
        ],
        autoSearch: true
      },
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile' }
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: '15299xxxxxx' + index
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 55
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 筛选项配置

列出可能出现的筛选项配置

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
        submitBtnText: 'Search',
        exportBtn: {
          type: 'success',
          text: 'Export'
        },
        autoSearch: false,
        forms: [
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile', urlSync: true },
          { prop: 'sex', label: 'Sex', itemType: 'select', style: { width: '200px' }, 
            value: '2',
            options: [
              { value: '1', label: 'Male' },
              { value: '2', label: 'Female' },
            ]
          },
          {
            prop: 'location', label: 'Location', itemType: 'multSelect',
            options: [
              { value: 0, label: "options1" },
              { value: 1, label: "options2" },
              { value: 2, label: "options3" },
              { value: 3, label: "options4" },
              { value: 4, label: "options5" },
              { value: 5, label: "options6" },
            ]
          },
          {
            prop: 'location2', label: 'Location2', itemType: 'multSelect',
            showType: 1,
            isEmpty: true,
            options: [
                { value: 0, label: "options21" },
                { value: 1, label: "options22" },
                { value: 2, label: "options23" },
                { value: 3, label: "options24" },
                { value: 4, label: "options25" },
                { value: 5, label: "options26" },
            ]
          },
          { prop: 'dureDate', label: 'Date', itemType: 'date', value: '20211028', offset: -2 },
          { prop: 'datetime', label: 'DateTime', itemType: 'datetime', offset: 300 },
          { prop: 'month', label: 'Month', itemType: 'monthrange', range: 6 },
          { prop: 'date', label: 'Date Rage', itemType: 'daterange', dayRange: 7 },
          { prop: 'date2', label: 'Date Rage2', itemType: 'daterange', dayRange: 7, ignoreToday: true },
          { prop: 'radio', label: 'By Radio', itemType: 'radio',
            options: [
              { value: 0, label: 'Male' },
              { value: 1, label: 'Female' },
            ],
          },
          { prop: 'dateTimeRange', label: 'DateTimeRange', urlSync: true, itemType: 'datetimerange', dayRange: 7, defaultTime: ['02:30:00', '02:30:00'], maxRangeDays: 30 },
          { prop: 'uids', label: 'Select Input', itemType: 'selectInput', selectName: 'selectType',
            options: [
              { value: 'uids', label: 'UID' },
              { value: 'names', label: 'Names' }
            ],
          },
          { prop: 'selectDate', label: 'Select Date', itemType: 'selectDate', value: '20210701', 
            periodName: 'date_period', periodRange: ['daily', 'week', 'month', 'year'], periodValue: 'week'
          },
          { prop: 'textarea', label: 'Textarea', itemType: 'textarea', autosize: { minRows: 1 },  style: {width: '400px'} }
        ],
      },
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile' }
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: '15299xxxxxx' + index
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 20
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 表格配置

列出可能出现的表格项配置

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
    @search="searchHandle"
    @excel="searchHandle($event, true)"
  >
    <template v-slot:options="{ row }">
        <el-button type="primary" @click="editHandle(row)">Edit</el-button>
      </template>
  </bo-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' }
        ],
        autoSearch: true
      },
      columns: [
        { prop: 'uid', label: 'Uid', linkPrefix: 'https://www.vuepress.cn/hero.png?index=', target: '_self' },
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile', sortable: true },
        { prop: 'index', label: 'Index', sortable: 'custom' },
        { prop: 'avatar', label: 'Avatar', image: true },
        { prop: 'num', label: 'Num', filter: 'number' },
        { prop: 'sex', label: 'Sex', render: (row) => {
            const { sex } = row
            return sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
          },
        },
        { prop: 'status', label: 'Status', html: (row) => {
            const { status } = row
            return status === 0 ? '<span style="color:blue">On</span>' : status === 1 ? '<span>Off</span>' : '<span>Unknow</span>'
          },
        },
        {
          label: 'Options',
          slotName: 'options',
        },
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      // 打印，便于查看查询参数
      console.log(params)

      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          avatar: 'https://www.vuepress.cn/hero.png',
          uid: 493434 + index,
          mobile: '12345678' + index,
          index: index,
          num: 1234567 + index,
          sex: index % 2,
          status: index % 2
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 20
        }, 2000)
      }
    },
    editHandle() {
      alert('click edit')
    },
  },
};
</script>
```

:::

### 提示框配置

用于展示和页面相关的提示

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :tips="tips"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
      tips: [
        '本页面所有的统计单位均为钻石数量（颗）',
        'Total：全服的钻石消耗数量（并非后面所有统计项简单相加）',
        'Gold/Avatar Exchange等：玩家使用钻石兑换Gold/Avatar等的钻石数量。',
        'Other：其他未标明钻石使用渠道和方式，但是却是实际产生消耗的钻石数量。',
        'Country：由产生钻石消耗的玩家的国家归属进行钻石消耗分类和统计。'
      ],
      formOptions: {
        forms: [
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' }
        ],
      },
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile' }
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: '15299xxxxxx' + index
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 20
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 多级表头配置

用于展示多级表头

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' }
        ],
        autoSearch: true
      },
      columns: [
        {
          label: "Persion Info",
          children: [
            {
              label: "Basic Info",
              children: [
                { prop: 'name', label: 'Name' },
                { prop: 'mobile', label: 'Mobile' }
              ],
            },
            { prop: "age", label: "Age" },
          ],
        },
        { prop: 'num', label: 'Num' },
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: 1234567 + index,
          age: 12 + index,
          num: 43 + index
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 20
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 筛选栏增加按钮

筛选栏位除了查询和导出按钮，还想增加更多按钮等

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
    @search="searchHandle"
    @excel="searchHandle($event, true)"
  >
    <template v-slot:extraBtn>
      <el-button type="primary" @click="editHandle('add1')">Add 1</el-button>
      <el-button type="primary" @click="editHandle('add2')">Add 2</el-button>
    </template>
  </bo-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: 'name', label: 'Name' }
        ]
      },
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile' }
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: '15299xxxxxx' + index
        }))
      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
          this.tableOptions.paginationTotals = 20
        }, 2000)
      }
    },
    editHandle(type) {
      alert(type)
    },
  },
};
</script>
```

:::

### 展示多个table

一次查询展示多个table，并且table都不需要分页，使用tabs，默认不展示分页

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :tabs="tabs"
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
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' }
        ],
        autoSearch: true
      },
      tabs: [
        {
          label: 'consumption',
          columns: [
            { prop: 'name', label: 'Name' },
            { prop: 'mobile', label: 'Mobile' }
          ],
          tableOptions: {
            data: []
          }
        },
        {
          label: 'source',
          columns: [
            { prop: 'name', label: 'Name' },
            { prop: 'mobile', label: 'Mobile' }
          ],
          tableOptions: {
            data: []
          }
        }
      ]
    }
  },
  methods: {
    searchHandle(params, excel) {
      const consumeList = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: '15299xxxxxx' + index
        }))
      const sourceList = new Array(20).fill(0).map((_, index) => ({
          name: 'Tom' + index,
          mobile: '19474xxxxxx' + index
        }))

      if (excel) {
        const tabActive = filter.tabActive - 1
        this.$exportExcel({ 
          columns: this.tabs[tabActive].columns, 
          data: tabActive === 0 ? consumeList : sourceList
        })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tabs[0].tableOptions.data = consumeList
          this.tabs[1].tableOptions.data = sourceList
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 图表配置

表格数据与图形关联展示

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
          { prop: 'name', label: 'Name' }
        ],
        autoSearch: true
      },
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'mobile', label: 'Mobile' }
      ],
      tableOptions: {
        data: [],
        chart: {
          show: true,
          type: 'line',
          labelProp: 'name'
        },
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = new Array(20).fill(0).map((_, index) => ({
          name: 'Sam' + index,
          mobile: index * index
        }))

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
        }, 2000)
      }
    }
  },
};
</script>
```

:::

### 自定义图表

可自定义图形的维度和展示细节

:::demo

```html
<template>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :columns="columns"
    :tableOptions="tableOptions"
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
          { prop: 'task', label: '任务' }
        ],
        autoSearch: true
      },
      columns: [
        { prop: 'task', label: '任务' },
        { prop: 'task1', label: '任务1' },
        { prop: 'task2', label: '任务2' },
        { prop: 'task3', label: '任务3' },
        { prop: 'task4', label: '任务4' }
      ],
      tableOptions: {
        data: [],
        chart: {
          show: true,
          type: 'bar',
          dimension: 'row',
          labelProp: 'task',
          option: {
            label: {
              formatter: '{b} ({d}%)'
            }
          }
        },
      }
    }
  },
  methods: {
    searchHandle(params, excel) {
      const data = [
        { task: '参加人数', task1: 10, task2: 20, task3: 30, task4: 40 },
        // { task: '完成人数', task1: 5, task2: 8, task3: 12, task4: 23 }
      ]

      if (excel) {
        this.$exportExcel({ columns: this.columns, data })
      } else {
        // 使用setTimeout模拟调接口
        setTimeout(() => {
          this.tableOptions.data = data
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
| formOptions | 筛选筛配置   | object  | —      | {} |
| columns            | table配置  | array  | —      | [] |
| tableOptions       | table资料 | object   | —      | {}        |
| tabs        | 用于多表格页面，每一个元素都是包含columns和tableOptions的对象，配置会使columns和tableOptions失效   | array | —      | []      |
| tips           | 展示提示信息按钮和资料   | array   | —      | []         |
| loading       | loading展示 | boolean   | —      | false        |
| hasPagination       | 是否展示分页栏,如果配置了tabs，那么该参数会自动设置为false | boolean   | —      | true      |

### formOptions Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| submitBtnText | 查询按钮文案     | string  | —      | Search |
| exportBtn | 导出按钮配置     | object  | —      | {} |
| forms           |  筛选项配置列表 | array   | —      | []         |
| autoSearch     |  自动触发查询按钮 | boolean   | —      | false   |

### formOptions exportBtn Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| type | 按钮类型     | String  | primary/success/info/warning/danger    | primary |
| text | 文案     | String  | —      | Excel |

### formOptions forms Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| prop | 必填，筛选对象的key值，如果为date且值为时间范围，则返回startAt和endAt，便于快速获取开始时间和结束时间  | String  | —      | — |
| label           |  筛选项说明文案 | String   | —      |   —      |
| urlSync           |  筛选值是否同步到url | boolean   | —      | false         |
| itemType           |  筛选项类型 | String   | input / select / multSelect / date / datetime / monthrange / daterange / radio / datetimerange / selectInput / selectDate / textarea      | input         |
| value           |  筛选项默认值 | string / array / boolean   | —      |   —        |
| style           |  筛选项样式 | object   | —      |   —        |
| options           |  针对itemType为select / multSelect / radio / selectInput的下拉框配置 | array   | —      | []         |
| offset           |  针对itemType为date / datetime的默认时间配置，支持负数，itemType为date时单位为天，itemType为datetime时单位为秒 | number   | —      | —        |
| dayRange           |  针对itemType为daterange / datetimerange的默认日期配置，单位为天 | number   | —      |  —         |
| defaultTime           |  针对itemType为datetimerange的默认时间范围 | array   | —      |   —       |
| maxRangeDays           |  针对itemType为daterange / datetimerange的最大时间范围，单位为天 | number   | —      | —        |
| range           |  针对itemType为monthrange的默认月份范围 | number   | —      |  —         |
| ignoreToday           |  针对itemType为daterange的配置，设置为true会忽略今天且今天之后的日期都不可选 | boolean   | —      |  false         |
| periodName           |  针对itemType为selectDate的下拉框key值 | String   | —      |—         |
| periodRange           |  针对itemType为selectDate的下拉框配置 | array   | —      | ['daily', 'week', 'month', 'year']         |
| periodValue           |  针对itemType为selectDate的下拉框默认值 | string   | —      | daily       |
| 更多属性    |  参考对应itemType的配置和element-ui配置 |  —  | —      | —         |

### columns Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| prop | 表格列对应表格数据的key     | string  | —      | — |
| label | 表头名称     | string  | —      | — |
| image | 设置表格数据为图片src     | boolean / object  | true / {style:{},fit:'contain'}      | — |
| linkPrefix |  设置表格数据为链接，作为前缀拼接表数据    | string  | —      | — |
| target |  设置了linkPrefix才会生效，指定在何处显示链接的资源    | string  |  _self/_blank    | _blank |
| filter           |  表格数据过滤,number为千分位转换，currency会自动除以100，date会转换为时间，card会转换为扑克符号，支持联合转换，如'currency\|number' | string   | number / currency / date / card      |  —        |
| render     |  使用函数来过滤数据，回调参数为当前行数据 | function   | —      | —   |
| html     |  使用v-html来过滤数据，回调参数为当前行数据 | function   | —      | —   |
| pre     |  使用white-space:pre-wrap来展示数据 | boolean   | —      | false   |
| slotName     |  使用slot来自定义数据，需要在bo-page内配置slot，开放当前行数据 | string   | —      | —   |
| align |  对齐方式    | string  | left/center/right     | center |
| sortable |  对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，会自动触发查询按钮，并给查询对象添加order, prop参数，prop为哪一列触发，order表示触发何种排序    | boolean, string  | true, false, 'custom'     | false |
| 更多[参数](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)  |  参考element-ui 的 Table-column Attributes    |  —   |  —      |  —  |

> 过滤参数的优先级为 slotName > html > render > filter > pre > linkPrefix > image

### tableOptions Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| data | 表格数据     | array  | —      | [] |
| paginationTotals | 表格数据总量，用于分页     | number  | —      | 0 |
| chart | 图表配置     | object  | —      | — |

### tableOptions chart Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| show | 是否展示图表     | boolean  | —      | false |
| type | 图标类型，支持折线图，柱状图和饼图     | line / bar / pie  | —      | line |
| labelProp | x轴对应的key     | string  | —      | — |
| dataProps | 哪些列需要展示，格式和column一致     | array  | —      | — |
| dimension | 图形展示维度，默认按列     | string  | row / column     | column |
| dataReverse | 数据是否倒序     | boolean  | —      | false |
| option | echarts配置，会与bo-charts的配置进行合并，参考[echarts](https://echarts.apache.org/zh/option.html#title)     | object  | —      | — |

### tabs Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| label | tab名称     | string  | —      | — |
| columns | 参考上面的columns Attributes配置     | array  | —      | — |
| tableOptions | 参考上面的tableOptions Attributes配置     | object  | —      | — |

### Events
| 事件名称    | 说明         | 回调参数                    |
| --------- | ------------ | ----------------------- |
| search | 查询按钮被点击后触发 | filter |
| excel | 导出按钮被点击后触发 | filter |

### Slot
| 插槽名称    | 说明         |
| --------- | ------------ |
| extraBtn | 插入至筛选栏之后的内容 |
| preTable | 插入至表格上方的内容 |
| nextTable | 插入至表格下方的内容 |

### Methods
| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
| searchHandler | 用于触发查询按钮 | 不传参数则默认为筛选项的查询数据 |
| excelHandler | 用于触发导出按钮 | 不传参数则默认为筛选项的查询数据 |
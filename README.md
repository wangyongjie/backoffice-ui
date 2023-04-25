# Element Backoffice-ui

## 安装

``` shell
npm i --save backoffice-ui
```

## 相关文档
介绍 https://juejin.cn/post/7010711177521020965

教程 https://wangyongjie.github.io/backoffice-ui-docs/advanced/page.html

## 例子

暂无

## 变更日志

Detailed changes for each release are documented in the [release notes](./CHANGELOG.md).

## 国际化
组件内部默认使用英文，若希望使用其他语言，则需要进行多语言设置。以中文为例，在 main.js 中：

```js
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'
import locale from 'backoffice-ui/BoLocale/lang/zh-CN'

Vue.use(BackofficeUI, { locale })
```
其他設定同 https://element.eleme.io/#/zh-CN/component/i18n  
目前内置了以下语言：

- 简体中文（zh-CN）
- 英语（en）

## 快速开始

Import modules and set up settings in `main.js`:

```js
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'

Vue.use(BackofficeUI)
```

> Use this package in a page:

```vue
<template>
  <div class="app-container">
    <bo-menu :menus="menus">
      <template #diamonds>
        <diamonds />
      </template>
      <template #log>
        <log />
      </template>
    </bo-menu>
  </div>
</template>

<script>
import diamonds from './diamonds.vue'
import log from './log.vue'

export default {
  components: {
    diamonds,
    log
  },
  data() {
    return {
      menus: [
        {
          index: 'diamonds',
          label: 'Diamonds'
        },
        {
          index: 'log',
          label: 'Log'
        }
      ]
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #f2f2f2c7;
}
</style>

```

And the diamond page

```vue
<template>
  <bo-page
    :form-options="formOptions"
    :tabs="tabs"
    :loading.sync="loading"
    @search="searchHandle"
    @excel="excelHandle"
  >
    <template v-slot:consumeTotal="{ row }">
      <span :class="{ red_color: parseInt(row.consume_total) !== parseInt(row.chip_exchange) + parseInt(row.avatar_exchange) + parseInt(row.consume_other) }">{{ row.consume_total }}</span>
    </template>
    <template v-slot:sourceTotal="{ row }">
      <span :class="{ red_color: parseInt(row.source_total) !== parseInt(row.in_app_purchase) + parseInt(row.season_award) + parseInt(row.sent_via_backoffice) + parseInt(row.source_other) }">{{ row.source_total }}</span>
    </template>
  </bo-page>
</template>

<script>
import { getDiamondStats } from '@/api/diamonds'

export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: 'date', label: 'Date:', itemType: 'daterange', dayRange: 1 },
          {
            prop: 'region',
            label: 'Country',
            itemType: 'multSelect',
            options: this.$store.getters.platform
          }
        ],
        autoSearch: true
      },
      tabs: [
        {
          label: 'consumption',
          columns: [
            { prop: 'dataType', label: 'Country' },
            { prop: 'consume_total', label: 'Total', slotName: 'consumeTotal' },
            { prop: 'chip_exchange', label: 'Chip Exchange' },
            { prop: 'avatar_exchange', label: 'Avatar Exchange' },
            { prop: 'consume_other', label: 'Other' }
          ],
          tableOptions: {
            data: []
          }
        },
        {
          label: 'source',
          columns: [
            { prop: 'dataType', label: 'Country' },
            { prop: 'source_total', label: 'Total', slotName: 'sourceTotal' },
            { prop: 'in_app_purchase', label: 'In-app Purchase' },
            { prop: 'season_award', label: 'Season Reward' },
            { prop: 'sent_via_backoffice', label: 'Sent Via Backoffice' },
            { prop: 'source_other', label: 'Other' }
          ],
          tableOptions: {
            data: []
          }
        }
      ]
    }
  },
  methods: {
    searchHandle(filter) {
      getDiamondStats(filter)
        .then((res) => {
          this.tabs[0].tableOptions.data = res.data.consumeList
          this.tabs[1].tableOptions.data = res.data.sourceList
        })
        .catch(() => {
          this.loading = false
        })
    },
    excelHandle(filter) {
      const tabActive = filter.tabActive
      delete filter.tabActive

      getDiamondStats(filter).then((res) => {
        import('@/vendor/Export2Excel').then((excel) => {
          const header =
            tabActive === 1
              ? this.tabs[0].columns.map((item) => item.label)
              : this.tabs[1].columns.map((item) => item.label)
          const filterVal =
            tabActive === 1
              ? this.tabs[0].columns.map((item) => item.prop)
              : this.tabs[1].columns.map((item) => item.prop)
          const data =
            tabActive === 1 ? res.data.consumeList : res.data.sourceList
          excel.export_json_to_excel({
            header,
            filterVal,
            data,
            filename: tabActive === 1 ? this.tabs[0].label : this.tabs[1].label
          })
        })
      })
    }
  }
}
</script>
```

And the log page

```vue
<template>
  <bo-page
    :form-options="formOptions"
    :columns="columns"
    :table-options="tableOptions"
    :loading.sync="loading"
    @search="searchHandle"
    @excel="excelHandle"
  />
</template>

<script>
import { getDiamondLog, getUserNameList } from '@/api/diamonds'

export default {
  data() {
    return {
      loading: false,
      formOptions: {
        forms: [
          { prop: 'date', label: 'Date:', itemType: 'daterange', dayRange: 7 },
          { prop: 'userIDs', label: 'Uid:' }
        ]
      },
      columns: [
        { prop: 'userID', label: 'User ID' },
        { prop: 'nickname', label: 'Nickname' },
        { prop: 'type', label: 'Type' },
        { prop: 'amount', label: 'Amount' },
        { prop: 'balance', label: 'Balance' },
        { prop: 'note', label: 'Note' },
        { prop: 'date', label: 'Date' }
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      }
    }
  },
  methods: {
    searchHandle(filter) {
      getDiamondLog(filter).then((res) => {
        this.addNickname(res.data.list, (list) => {
          this.tableOptions.data = list
        })
        this.tableOptions.paginationTotals = res.data.total
      }).catch(() => {
        this.loading = false
      })
    },
    excelHandle(filter) {
      getDiamondLog(filter).then((res) => {
        import('@/vendor/Export2Excel').then((excel) => {
          const header = this.columns.map((item) => item.label)
          const filterVal = this.columns.map((item) => item.prop)
          excel.export_json_to_excel({
            header,
            filterVal,
            data,
            filename: 'log'
          })
        })
      })
    }
  }
}
</script>
```

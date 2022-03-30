## Dialog 弹出框

封装了el-dialog,可以快速完成常见的新增，编辑表单等需求

### 基本用法

简单用法

:::demo

```html
<template>
  <div>
    <bo-page
      ref="bopage"
      :loading.sync="loading"
      :formOptions="formOptions"
      :columns="columns"
      :tableOptions="tableOptions"
      @search="searchHandle"
      @excel="searchHandle($event, true)"
    >
      <template v-slot:extraBtn>
          <el-button type="primary" @click="addHandle">Add</el-button>
      </template>
    </bo-page>

    <bo-dialog
      v-bind="editDialog"
      :visible.sync="editDialogVisible"
      :loading.sync="editDialogLoading"
      @confirm="confirm"
    >
    </bo-dialog>
  </div>
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
      },
      editDialogVisible: false,
      editDialogLoading: false,
      editDialog: {
        form: {
          type: 'add',
          model: {
            name: ''
          },
          rules: {
            name: [
              { required: true, trigger: 'change' }
            ]
          },
        },
        formItems: [
          { prop: 'name', label: 'Name' }
        ],
      },
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
    },
    addHandle() {
      this.editDialog.form.type = 'add';
      this.editDialogVisible = true;
    },
    confirm() {
      this.editDialogLoading = true;

      setTimeout(() => {
        this.editDialogVisible = false;
        this.editDialogLoading = false;
        this.$refs.bopage.searchHandler()
      }, 2000);
    },
  },
};
</script>
```

:::

### 复杂用法

列出所有配置并实现常见的新增，编辑和预览功能

:::demo

```html
<template>
  <div>
    <bo-page
      :loading.sync="loading"
      :formOptions="formOptions"
      :columns="columns"
      :tableOptions="tableOptions"
      @search="searchHandle"
      @excel="searchHandle($event, true)"
    >
      <template v-slot:extraBtn>
          <el-button type="primary" @click="doHandle('add')">Add</el-button>
      </template>
      <template v-slot:options="{ row }">
        <el-button type="primary" @click="doHandle('edit', row)">Edit</el-button>
        <el-button type="primary" @click="doHandle('preview', row)">Preview</el-button>
      </template>
    </bo-page>

    <bo-dialog
      v-bind="editDialog"
      :visible.sync="editDialogVisible"
      :loading.sync="editDialogLoading"
      @confirm="confirm"
    >
      <template v-slot:slotTest="{ model }">
        <el-input v-model="model.slotTest"></el-input>
      </template>

      <template v-slot:slotPlus="{ item, model }">
        <el-input v-model="item.test"></el-input>
      </template>
    </bo-dialog>
  </div>
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
        { prop: 'mobile', label: 'Mobile' },
        { label: 'Options', slotName: 'options' },
      ],
      tableOptions: {
        data: [],
        paginationTotals: 0
      },
      editDialogVisible: false,
      editDialogLoading: false,
      editDialog: {
        form: {
          type: 'add',
          model: {
            id: 1,
            sb: '',
            fee: '',
            roomName: '',
            name: '',
            mobile: '',
            sex: 0,
            region: [],
            date: '',
            daterange: '',
            datetime: '',
            month: '',
            delivery: false,
            checkbox: [],
            radio: 0,
            resource: '',
            textarea: '',
            multLang: {
              'en': { title: 'test', textarea: 'test' },
              'br': { title: 'test1', textarea: 'test1' },
            },
            slotTest: '',
            plus: []
          },
          labelWidth: '100px',
          rules: {
            sb: [
              { required: true, trigger: 'change' }
            ],
            fee: [
              { required: true, trigger: 'change' }
            ],
            roomName: [
              { required: true, message: 'Please check the configuration.', trigger: 'change' }
            ],
            slotTest: [
              { required: true, message: 'Please check the configuration.', trigger: 'blur' }
            ],
          },
        },
        formItems: [
          { prop: 'id', label: 'ID', type: 'number', itemType: 'text', showOn: 'edit' },
          { prop: 'sb', label: 'S.B.', itemType: 'currency' },
          { prop: 'fee', label: 'Fee', prependSlot: 'prepend', appendSlot: 'append' },
          { prop: 'roomName', label: 'RoomName', disabledOn: 'edit', tips: 'RootNmae不可重複且不可再次修改' },
          { prop: 'name', label: 'Name' },
          { prop: 'mobile', label: 'Mobile' },
          { prop: 'sex', label: 'Sex', itemType: 'select',
            options: [
              { value: 0, label: 'Male' },
              { value: 1, label: 'Female' },
            ],
          },
          { prop: 'region', label: 'Country', itemType: 'multSelect',
            options: [
              { value: 0, label: 'options1' },
              { value: 1, label: 'options2' },
            ],
          },
          {
            prop: 'multLang', label: 'Content', itemType: 'multLang',
            langs: [
              { value: 'en', label: 'English' },
              { value: 'br', label: 'Brazie' },
              { value: 'jp', label: 'Japan' },
            ],
            form: {
              model: {
                title: '',
                textarea: '',
              },
              rules: {
                title: [{ required: true, message: 'Please check the title.', trigger: 'blur' }],
                textarea: [{ required: true, message: 'Please check the textarea.', trigger: 'blur' }],
              },
            },
            formItems: [
              { prop: 'title', label: 'Title' },
              { prop: 'textarea', label: 'Textarea', itemType: 'textarea', showWordLimit: true, rows: 4 },
            ],
          },
          { prop: 'date', label: 'Date:', itemType: 'date' },
          { prop: 'datetime', label: 'DateTime', itemType: 'datetime', offset: 300 },
          { prop: 'month', label: 'Month', itemType: 'monthrange', range: 6 },
          { prop: 'daterange', label: 'Daterange:', itemType: 'daterange', dayRange: 1 },
          { prop: 'delivery', label: 'Delivery:', itemType: 'switch' },
          { prop: 'checkbox', label: 'Checkbox', itemType: 'checkbox',
            options: [
              { label: 'checkbox1' },
              { label: 'checkbox2' },
              { label: 'checkbox3' },
            ],
          },
          { prop: 'radio', label: 'Radio', itemType: 'radio',
            options: [
              { value: 1, label: 'radio1' },
              { value: 2, label: 'radio2' },
              { value: 3, label: 'radio3' },
            ],
          },
          { prop: 'textarea', label: 'Textarea', itemType: 'textarea', showWordLimit: true, size: 'medium', rows: 2 },
          { prop: 'slotTest', label: 'SlotTest', itemType: 'slot', slotName: 'slotTest' },
          { prop: 'plus', label: 'Plus', itemType: 'plus', slotName: 'slotPlus',
            plusStyle: {'margin-top': '40px', 'margin-left': '-100px'},
            onlyRemoveLast: true
          },
        ],
      },
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
    doHandle(type, row) {
      if (row) {
        this.editDialog.form.model = {
          ...this.editDialog.form.model,
          ...row,
          sb: "123",
          fee: "456",
        };
      }
      this.editDialog.form.type = type;
      this.editDialogVisible = true;
    },
    confirm() {
      this.editDialogLoading = true;

      setTimeout(() => {
        this.editDialogLoading = false;
      }, 2000);
    },
  },
};
</script>
```

:::

### Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| title | dialog的标题，如没有配置，会根据form.type来自动设置   | string  | —      | — |
| form            | dialog中的表单配置  | object  | —      | {} |
| formItems       | dialog中的表单项配置 | array   | —      | []        |
| visible        | 是否显示dialog，支持.sync修饰符   | boolean | —      | false      |
| loading           | 是否loading，支持.sync修饰符   | boolean   | —      | false         |
| confirmTitle       | confirm按钮名称 | string   | —      | confirm        |
| showFooter       | 是否显示footer | boolean   | —      | true      |

### form Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| type | 表单类型,为add时会自动清空表单，为preview是自动把所有表单项设为不可编辑   | string  | add / edit / preview      | — |
| model            | 表单数据对象  | object  | —      | {} |
| labelWidth       | 表单域标签的宽度 | string   | —      | —        |
| rules        | 表单验证规则   | object | —      | —      |
| 更多[参数](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)  |  参考element-ui 的 Form Attributes    |  —   |  —      |  —  |

### formItems Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| prop | 表单域 model 字段   | string  | 传入 Form 组件的 model 中的字段      | — |
| label            | 标签文本  | string  | —      | —  |
| labelWidth       | 表单域标签的的宽度 | string   | —      | —        |
| rules        | 表单验证规则   | object | —      | —      |
| itemType        | 表单项类型   | string | input / select / multSelect / date / datetime / monthrange / daterange / radio / datetimerange / selectInput / selectDate / textarea / switch / checkbox / slot / plus      | input      |
| showOn        | 表单项在何种表单类型下展示   | string | add / edit / preview     | —      |
| disabledOn        | 表单项在何种表单类型下不可编辑   | string | add / edit / preview     | —      |
| tips        | 表单项提示，位于表单项下方   | string |   —  | —      |
| itemType相关的参数  |  根据itemType的不同，支持不同的参数，参考bo-form-item    |  —   |  —      |  —  |
| 更多[参数](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)  |  参考element-ui 的 Form-Item Attributes    |  —   |  —      |  —  |

### Events
| 事件名称    | 说明         | 回调参数                    |
| --------- | ------------ | ----------------------- |
| confirm | 确认按钮被点击后触发 | model |

### Methods
| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
| confirm | 用于触发确认按钮 | — |

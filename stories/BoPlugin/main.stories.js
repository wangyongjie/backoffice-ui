import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoPlugin/exportExcel',
  argTypes: {
    // slot
    default: {
      table: {
        type: null,
      },
    },
  }
};

const html = `<div>
  <el-button type="primary" @click="exportExcelBtn(exportExcel)">Export Excel</el-button>
  <p>this.$exportExcel(exportExcel)</p>
  <bo-table 
    :columns="exportExcel.columns" 
    :data="exportExcel.data"
  ></bo-table> 
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  template: html,
  methods: {
    exportExcelBtn(data) {
      this.$exportExcel(data)
    }
  },
});


// ####################### shared data #######################

const tableData = [{
  date: '2016-05-03',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-02',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-04',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-01',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-08',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-06',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-07',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}]

const describe = ['test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1']
// ####################### shared data #######################


export const Primary = Template.bind({});
Primary.storyName = "default"
Primary.args = {
  exportExcel: {
    columns: [{
        prop: "date",
        label: "日期",
      },
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "province",
        label: "省份",
      },
      {
        prop: "city",
        label: "市区",
      },
      {
        prop: "address",
        label: "地址",
      },
      {
        prop: "zip",
        label: "邮编",
      },
    ],
    data: tableData,
    describe
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const header = Template.bind({});
header.storyName = "header & filterVal"
header.args = {
  exportExcel: {
    header: ['Custom 日期'],
    filterVal: ['date'],
    columns: [{
        prop: "date",
        label: "日期",
      },
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "province",
        label: "省份",
      },
      {
        prop: "city",
        label: "市区",
      },
      {
        prop: "address",
        label: "地址",
      },
      {
        prop: "zip",
        label: "邮编",
      },
    ],
    data: tableData,
    describe
  }
};
header.parameters = parseDocsSourceCode(html, header.args)


export const multiHeader = Template.bind({});
multiHeader.storyName = "multiHeader"
multiHeader.args = {
  exportExcel: {
    multiHeader: [
      ['Header1', 'Header2', 'Header3'],
    ],
    columns: [{
        prop: "date",
        label: "日期",
      },
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "province",
        label: "省份",
      },
      {
        prop: "city",
        label: "市区",
      },
      {
        prop: "address",
        label: "地址",
      },
      {
        prop: "zip",
        label: "邮编",
      },
    ],
    data: tableData,
    describe
  }
};
multiHeader.parameters = parseDocsSourceCode(html, multiHeader.args)


export const groupTableHeader = Template.bind({});
groupTableHeader.storyName = "Grouping table head"
groupTableHeader.args = {
  exportExcel: {
    columns: [{
        prop: "date",
        label: "日期",
      },
      {
        label: "配送信息",
        children: [{
            prop: "name",
            label: "姓名",
          },
          {
            label: "地址",
            children: [{
                prop: "province",
                label: "省份",
              },
              {
                prop: "city",
                label: "市区",
              },
              {
                prop: "address",
                label: "地址",
              },
              {
                prop: "zip",
                label: "邮编",
              },
            ]
          },
        ]
      },
    ],
    data: tableData,
    describe
  }
};
groupTableHeader.parameters = parseDocsSourceCode(html, groupTableHeader.args)
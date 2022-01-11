import BoPage from '../../packages/BoPage/src/main.vue'

import BoSearch from "../../packages/BoSearch/src/main.vue";
import BoPagination from "../../packages/BoPagination/src/main.vue";
import BoTable from "../../packages/BoTable/src/main.vue";
import BoChart from "../../packages/BoChart/src/main.vue";

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoPage',
  component: BoPage,
  subcomponents: {
    BoSearch,
    BoPagination,
    BoTable,
    BoChart,
  },
  argTypes: {
    // event
    'update:loading': {
      table: {
        disable: true
      }
    },
  }
};

const html = `<div>
  <bo-page
    :loading.sync="loading"
    :formOptions="formOptions"
    :tips="tips"
    :columns="columns"
    :tableOptions="tableOptions"
    :tabs="tabs"
    @search="search"
    @excel="excel"
  >
    <template v-slot:options="{ row }">
      <el-button type="primary">Edit</el-button>
    </template>
  </bo-page>
</div>`


//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoPage
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "example"
Primary.args = {
  loading: false,
  formOptions: {
    submitBtnText: "Search",
    forms: [{
        prop: "name",
        label: "Name",
        urlSync: true
      },
      {
        prop: "mobile",
        label: "Mobile",
        urlSync: true
      },
      {
        prop: "sex",
        label: "Sex",
        itemType: "select",
        options: [{
            value: 0,
            label: "Male"
          },
          {
            value: 1,
            label: "Female"
          },
        ],
      },
    ],
  },
  tips: [
    "test test",
    {
      label: "Type of Data",
      child: ["tips tips1", "tips tips2"]
    },
    "test 2222",
  ],
  columns: [{
      prop: "name",
      label: "Name",
      minWidth: 140,
      align: "center",
      // sortable: true, false, 'custom'
      sortable: "custom",
    },
    {
      prop: "mobile",
      label: "Mobile",
      minWidth: 140,
      align: "center",
      sortable: true,
    },
    {
      prop: "sex",
      label: "Sex",
      minWidth: 140,
      align: "center",
      render: (row) => {
        const {
          sex
        } = row;
        return sex === 0 ? "Male" : sex === 1 ? "Female" : "Unknow";
      },
    },
    {
      label: "Options",
      minWidth: 140,
      align: "center",
      slotName: "options",
    },
  ],
  tableOptions: {
    data: [{
        name: "Sam",
        mobile: "15299xxxx",
        sex: 0
      },
      {
        name: "Jean",
        mobile: "13452xxxx",
        sex: 1
      },
      {
        name: "Tony",
        mobile: "187233xxxx",
        sex: 0
      },
      {
        name: "Sam",
        mobile: "15299xxxx",
        sex: 0
      },
      {
        name: "Jean",
        mobile: "13452xxxx",
        sex: 1
      },
      {
        name: "Tony",
        mobile: "187233xxxx",
        sex: 0
      },
      {
        name: "Sam",
        mobile: "15299xxxx",
        sex: 0
      },
      {
        name: "Jean",
        mobile: "13452xxxx",
        sex: 1
      },
      {
        name: "Tony",
        mobile: "187233xxxx",
        sex: 0
      },
    ],
  },
  tabs: []
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const tips = Template.bind({});
tips.storyName = "tips"
tips.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: [
    "test test",
    {
      label: "Type of Data",
      child: ["tips tips1", "tips tips2"]
    },
    "test 2222",
  ],
  columns: [],
  tableOptions: {}
}
tips.parameters = parseDocsSourceCode(html, tips.args)



const columns = [{
    prop: "time",
    label: "Time"
  },
  {
    prop: `prop1`,
    label: `Label1`
  },
  {
    prop: `prop2`,
    label: `Label2`
  }
]
const tableOptions = {
  chart: {
    show: true,
    type: 'line',
    labelProp: 'time',
    dataProps: []
  },
  data: [{
      time: '10:00',
      prop1: 1,
      prop2: 2
    },
    {
      time: '11:00',
      prop1: 10,
      prop2: 20
    },
    {
      time: '12:00',
      prop1: 11,
      prop2: 12
    },
    {
      time: '13:00',
      prop1: 15,
      prop2: 18
    },
  ]
}
export const tabsShow = Template.bind({});
tabsShow.storyName = "tabs"
tabsShow.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: null,
  columns: [],
  tableOptions: {},
  tabs: [{
      label: 'LineChart Tab',
      columns,
      tableOptions
    },
    {
      label: 'BarChart Tab',
      columns,
      tableOptions: {
        chart: {
          show: true,
          type: 'bar',
          labelProp: 'time',
        },
        data: [{
            time: '10:00',
            prop1: 10,
            prop2: 12
          },
          {
            time: '11:00',
            prop1: 5,
            prop2: 2
          },
          {
            time: '12:00',
            prop1: 8,
            prop2: 22
          },
          {
            time: '13:00',
            prop1: 25,
            prop2: 28
          },
        ]
      }
    },
    {
      label: 'PieChart Tab',
      columns,
      tableOptions: {
        chart: {
          show: true,
          type: 'pie',
          labelProp: 'time',
        },
        data: [{
            time: '10:00',
            prop1: 15,
            prop2: 5
          },
          {
            time: '11:00',
            prop1: 13,
            prop2: 10
          },
          {
            time: '12:00',
            prop1: 21,
            prop2: 22
          },
          {
            time: '13:00',
            prop1: 35,
            prop2: 15
          },
        ]
      }
    },
    {
      label: 'No Data Tab',
      columns,
      tableOptions: {
        chart: {
          show: true,
          type: 'pie',
          labelProp: 'time',
        },
      }
    }
  ]
}
tabsShow.parameters = parseDocsSourceCode(html, tabsShow.args)


export const lineChart = Template.bind({});
lineChart.storyName = "lineChart"
lineChart.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: null,
  columns,
  tableOptions
}
lineChart.parameters = parseDocsSourceCode(html, lineChart.args)

export const customLineChart = Template.bind({});
customLineChart.storyName = "custom chart"
customLineChart.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: null,
  columns,
  tableOptions: {
    ...tableOptions,
    chart: {
      show: true,
      type: 'line',
      labelProp: 'time',
      dataProps: [{
        prop: 'prop1',
        label: 'Custom Label',
        color: 'black'
      }],
      option: {
        title: {
          text: 'Custom title'
        },
      }
    },
  }
}
customLineChart.parameters = parseDocsSourceCode(html, customLineChart.args)

export const sectionExample = Template.bind({});
sectionExample.storyName = "chart.option"
sectionExample.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: null,
  columns: [{
      prop: "section",
      label: "section",
      minWidth: 140,
      align: "center",
      sortable: true
    },
    {
      prop: "user",
      label: "Qualified Users",
      minWidth: 140,
      align: "center",
      filter: 'number'
    },
  ],
  tableOptions: {
    chart: {
      show: true,
      type: 'bar',
      labelProp: 'section',
      option: {
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
        }
      }
    },
    data: [{
        section: 'section1',
        user: 1200,
      },
      {
        section: 'section2',
        user: 2400,
      },
      {
        section: 'section3',
        user: 3600,
      },
      {
        section: 'section4',
        user: 4800,
      }
    ]
  }
}
sectionExample.parameters = parseDocsSourceCode(html, sectionExample.args)



export const groupingTableHeadChart = Template.bind({});
groupingTableHeadChart.storyName = "Grouping Table Head Chart"
groupingTableHeadChart.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  tips: null,
  columns: [{
      label: "Group",
      children: [{
          prop: "time",
          label: "Time"
        },
        {
          prop: `prop1`,
          label: `Label1`
        },
      ]
    },
    {
      prop: `prop2`,
      label: `Label2`
    }
  ],
  tableOptions
}
groupingTableHeadChart.parameters = parseDocsSourceCode(html, groupingTableHeadChart.args)



const slotHtml = (name) => `<div>
<bo-page
  :loading.sync="loading"
  :formOptions="formOptions"
  :tips="tips"
  :columns="columns"
  :tableOptions="tableOptions"
  :tabs="tabs"
  @search="search"
  @excel="excel"
>
  <template slot="${name}"">
    ${name}
  </template>
</bo-page>
</div>`
export const preTable = (args, {
  argTypes
}) => ({
  components: {
    BoPage
  },
  props: Object.keys(argTypes),
  template: slotHtml('preTable'),
});
preTable.storyName = "slot: preTable"
preTable.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  columns: [],
  tableOptions: {}
}
preTable.parameters = parseDocsSourceCode(slotHtml('preTable'), preTable.args)


export const nextTable = (args, {
  argTypes
}) => ({
  components: {
    BoPage
  },
  props: Object.keys(argTypes),
  template: slotHtml('nextTable'),
});
nextTable.storyName = "slot: nextTable"
nextTable.args = {
  ...Primary.args,
  formOptions: {
    forms: []
  },
  columns: [],
  tableOptions: {}
}
nextTable.parameters = parseDocsSourceCode(slotHtml('nextTable'), nextTable.args)
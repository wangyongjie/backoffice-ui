import BoTable from '../../BoTable'
import BoChart from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoChart',
  component: BoChart,
  subcomponents: {
    BoTable
  }
};

const html = `<div>
  <bo-chart :chartOptions="chartOptions" />
  <bo-table
    v-bind="chartOptions.tableOptions"
    border
    :columns="chartOptions.columns"
  />
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoChart,
    BoTable
  },
  props: Object.keys(argTypes),
  template: html,
});

const tableData = {
  "columns": [{
      "prop": "time",
      "label": "Time"
    },
    {
      "prop": "prop0",
      "label": "Label0"
    },
    {
      "prop": "prop1",
      "label": "Label1"
    },
    {
      "prop": "prop2",
      "label": "Label2"
    },
    {
      "prop": "prop3",
      "label": "Label3"
    },
    {
      "prop": "prop4",
      "label": "Label4"
    },
    {
      "prop": "prop5",
      "label": "Label5"
    },
    {
      "prop": "prop6",
      "label": "Label6"
    },
    {
      "prop": "prop7",
      "label": "Label7"
    },
    {
      "prop": "prop8",
      "label": "Label8"
    },
    {
      "prop": "prop9",
      "label": "Label9"
    },
  ],
  "tableOptions": {
    "data": [{
        "time": "time0",
        "prop0": 27,
        "prop1": 8,
        "prop2": 35,
        "prop3": 23,
        "prop4": 48,
        "prop5": 38,
        "prop6": 23,
        "prop7": 29,
        "prop8": 10,
        "prop9": 17,
      },
      {
        "time": "time1",
        "prop0": 18,
        "prop1": 10,
        "prop2": 28,
        "prop3": 23,
        "prop4": 46,
        "prop5": 12,
        "prop6": 8,
        "prop7": 48,
        "prop8": 24,
        "prop9": 17,
      },
      {
        "time": "time2",
        "prop0": 6,
        "prop1": 36,
        "prop2": 36,
        "prop3": 31,
        "prop4": 10,
        "prop5": 5,
        "prop6": 39,
        "prop7": 15,
        "prop8": 18,
        "prop9": 47,
      },
      {
        "time": "time3",
        "prop0": 10,
        "prop1": 35,
        "prop2": 20,
        "prop3": 38,
        "prop4": 6,
        "prop5": 22,
        "prop6": 26,
        "prop7": 40,
        "prop8": 6,
        "prop9": 32,
      },
      {
        "time": "time4",
        "prop0": 28,
        "prop1": 29,
        "prop2": 42,
        "prop3": 31,
        "prop4": 40,
        "prop5": 39,
        "prop6": 39,
        "prop7": 30,
        "prop8": 24,
        "prop9": 42,
      },
      {
        "time": "time5",
        "prop0": 9,
        "prop1": 44,
        "prop2": 17,
        "prop3": 14,
        "prop4": 36,
        "prop5": 28,
        "prop6": 8,
        "prop7": 5,
        "prop8": 18,
        "prop9": 32,
      },
      {
        "time": "time6",
        "prop0": 32,
        "prop1": 10,
        "prop2": 46,
        "prop3": 26,
        "prop4": 26,
        "prop5": 8,
        "prop6": 19,
        "prop7": 24,
        "prop8": 13,
        "prop9": 29,
      },
      {
        "time": "time7",
        "prop0": 22,
        "prop1": 47,
        "prop2": 46,
        "prop3": 46,
        "prop4": 42,
        "prop5": 16,
        "prop6": 33,
        "prop7": 35,
        "prop8": 50,
        "prop9": 18,
      },
      {
        "time": "time8",
        "prop0": 24,
        "prop1": 15,
        "prop2": 46,
        "prop3": 22,
        "prop4": 42,
        "prop5": 37,
        "prop6": 49,
        "prop7": 48,
        "prop8": 29,
        "prop9": 41,
      },
      {
        "time": "time9",
        "prop0": 28,
        "prop1": 43,
        "prop2": 17,
        "prop3": 15,
        "prop4": 44,
        "prop5": 38,
        "prop6": 7,
        "prop7": 23,
        "prop8": 9,
        "prop9": 20,
      }
    ]
  }
}


export const Primary = Template.bind({});
Primary.storyName = "lineChart"
Primary.args = {
  chartOptions: {
    visible: true,
    tableOptions: {
      ...tableData.tableOptions,
      chart: {
        type: 'line',
        labelProp: 'time',
      }
    },
    columns: tableData.columns,
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

export const barChart = Template.bind({});
barChart.storyName = "barChart"
barChart.args = {
  chartOptions: {
    visible: true,
    tableOptions: {
      ...tableData.tableOptions,
      chart: {
        type: 'bar',
        labelProp: 'time',
        dataProps: ['prop0', 'prop3', 'prop5']
      }
    },
    columns: tableData.columns,
  }
};
barChart.parameters = parseDocsSourceCode(html, barChart.args)

export const pieChart = Template.bind({});
pieChart.storyName = "pieChart"
pieChart.args = {
  chartOptions: {
    visible: true,
    tableOptions: {
      ...tableData.tableOptions,
      chart: {
        type: 'pie',
        labelProp: 'time',
        dataProps: ['prop1', 'prop2', 'prop3', 'prop4', 'prop5']
      }
    },
    columns: tableData.columns,
  }
};
pieChart.parameters = parseDocsSourceCode(html, pieChart.args)
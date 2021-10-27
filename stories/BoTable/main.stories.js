import {
  action
} from '@storybook/addon-actions'
import {
  numberFormat
} from '../../packages/BoFilter/src/main';
import BoTable from '../../packages/BoTable/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoTable',
  component: BoTable,
};

const html = `<div>
  <bo-table
    v-loading.lock="loading"
    :data="data"
    :height="height"
    border
    :summary="summary"
    :columns="columns"
    @sort-change="sortChange"
  >
    <template v-slot:options="{ row }">
      <el-button type="primary">Edit</el-button>
    </template>
  </bo-table>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoTable
  },
  props: Object.keys(argTypes),
  template: html,
  methods: {
    sortChange: action('sortChange')
  }
});


export const Primary = Template.bind({});
Primary.storyName = "example"
Primary.args = {
  loading: false,
  height: "300px",
  summary: null,
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
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const slotName = Template.bind({});
slotName.storyName = "column.slotName"
slotName.args = {
  ...Primary.args,
  columns: [{
    label: "Options",
    minWidth: 140,
    align: "center",
    slotName: "options",
  }, ],
  data: [{
    name: "Sam",
    mobile: "15299xxxx",
    sex: 0
  }, ],
}
slotName.parameters = parseDocsSourceCode(html, slotName.args)


export const htmlExample = Template.bind({});
htmlExample.storyName = "column.htmlExample"
htmlExample.args = {
  ...Primary.args,
  columns: [{
    prop: "status",
    label: "Status",
    minWidth: 140,
    align: "center",
    html: (row) => {
      const {
        status
      } = row;
      const color = {
        1: "red",
        2: "green",
        3: "blue",
        4: "black",
      } [status];
      const text = {
        1: "Reject",
        2: "Success",
        3: "Confirm",
        4: "Pedding",
      } [status];
      return `<p style="color: ${color}">${text}</p>`;
    },
  }, ],
  data: [{
      status: "1"
    },
    {
      status: "2"
    },
    {
      status: "3"
    },
    {
      status: "4"
    },
  ],
}
htmlExample.parameters = parseDocsSourceCode(html, htmlExample.args)


export const render = Template.bind({});
render.storyName = "column.render"
render.args = {
  ...Primary.args,
  columns: [{
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
  }, ],
  data: [{
    name: "Sam",
    mobile: "15299xxxx",
    sex: 0
  }, ],
}
render.parameters = parseDocsSourceCode(html, render.args)


export const filter = Template.bind({});
filter.storyName = "column.filter"
filter.args = {
  ...Primary.args,
  columns: [{
      prop: "date",
      label: "Filter date",
      minWidth: 140,
      align: "center",
      filter: 'date'
    },
    {
      prop: "currency",
      label: "Filter currency",
      minWidth: 140,
      align: "center",
      filter: 'currency'
    },
    {
      prop: "number",
      label: "Filter number",
      minWidth: 140,
      align: "center",
      filter: 'number'
    },
    {
      prop: "currencyNumber",
      label: "Filter currency|number",
      minWidth: 140,
      align: "center",
      filter: 'currency|number'
    },
  ],
  data: [{
      date: '20211221',
      currency: 123124,
      number: 123124,
      currencyNumber: 1212121
    }, {
      date: 1635218799,
      currency: '123124',
      number: null,
      currencyNumber: ''
    },
    {
      date: 'error format',
      currency: null,
      number: null,
      currencyNumber: ''
    },
  ],
}
filter.parameters = parseDocsSourceCode(html, filter.args)


export const linkPrefix = Template.bind({});
linkPrefix.storyName = "column.linkPrefix, target:'_blank' "
linkPrefix.args = {
  ...Primary.args,
  columns: [{
    prop: "uid",
    label: "Uid",
    minWidth: 140,
    align: "center",
    linkPrefix: './?uid=',
    // _blank || _self
    target: ''
  }, ],
  data: [{
    uid: 11
  }, ],
}
linkPrefix.parameters = parseDocsSourceCode(html, linkPrefix.args)


export const groupingTableHead = Template.bind({});
groupingTableHead.storyName = "Grouping Table Head"
groupingTableHead.args = {
  ...Primary.args,
  columns: [{
    label: "Delivery Info",
    children: [{
        label: "Delivery Info",
        children: [{
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
      {
        prop: "mobile",
        label: "Mobile",
        minWidth: 180,
        align: "center"
      },
    ],

  }, {
    prop: "sex",
    label: "Sex",
    minWidth: 80,
    align: "center",
    render: (row) => {
      const {
        sex
      } = row;
      return sex === 0 ? "Male" : sex === 1 ? "Female" : "Unknow";
    },
  }, ],
  data: [{
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Jean",
      mobile: "13452xxxx",
      sex: 1,
      currency: 200000000
    },
    {
      name: "Tony",
      mobile: "187233xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Jean",
      mobile: "13452xxxx",
      sex: 1,
      currency: 200000000
    },
    {
      name: "Tony",
      mobile: "187233xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
  ],
}
groupingTableHead.parameters = parseDocsSourceCode(html, groupingTableHead.args)


export const groupingTableHeadSummary = Template.bind({});
groupingTableHeadSummary.storyName = "Grouping Table Head Summary"
groupingTableHeadSummary.args = {
  ...Primary.args,
  summary: {
    type: 'avg',
    excludeProps: ['a']
  },
  columns: [{
    label: "Delivery Info",
    children: [{
        label: "Delivery Info",
        children: [{
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
      {
        prop: "mobile",
        label: "Mobile",
        minWidth: 180,
        align: "center"
      },
    ],

  }, {
    prop: "sex",
    label: "Sex",
    minWidth: 80,
    align: "center",
  }, ],
  data: [{
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Jean",
      mobile: "13452xxxx",
      sex: 1,
      currency: 200000000
    },
    {
      name: "Tony",
      mobile: "187233xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Jean",
      mobile: "13452xxxx",
      sex: 1,
      currency: 200000000
    },
    {
      name: "Tony",
      mobile: "187233xxxx",
      sex: 0,
      currency: 200000000
    },
    {
      name: "Sam",
      mobile: "15299xxxx",
      sex: 0,
      currency: 200000000
    },
  ],
}
groupingTableHeadSummary.parameters = parseDocsSourceCode(html, groupingTableHeadSummary.args)


export const sum = Template.bind({});
sum.storyName = "summary:sum"
sum.args = {
  ...Primary.args,
  summary: 'sum',
  columns: [{
    prop: "id",
    label: "Id",
  }, {
    prop: "a",
    label: "A",
  }, {
    prop: "b",
    label: "B",
  }, {
    prop: "c",
    label: "C",
  }, ],
  data: [{
      id: 1,
      a: 10,
      b: 'text',
      c: 15
    },
    {
      id: 2,
      a: 15,
      b: 'text',
      c: 5
    },
    {
      id: 3,
      a: 30,
      b: 'text',
      c: 10
    },
  ],
}
sum.parameters = parseDocsSourceCode(html, sum.args)


export const avg = Template.bind({});
avg.storyName = "summary:avg with excludeProps"
avg.args = {
  ...Primary.args,
  summary: {
    type: 'avg',
    excludeProps: ['a']
  },
  columns: [{
    prop: "id",
    label: "Id",
  }, {
    prop: "a",
    label: "A",
  }, {
    prop: "b",
    label: "B",
  }, {
    prop: "c",
    label: "C",
  }, ],
  data: [{
      id: 1,
      a: 10,
      b: 'text',
      c: 15
    },
    {
      id: 2,
      a: 15,
      b: 'text',
      c: 5
    },
    {
      id: 3,
      a: 30,
      b: 'text',
      c: 10
    },
  ],
}
avg.parameters = parseDocsSourceCode(html, avg.args)


export const avgPrecision = Template.bind({});
avgPrecision.storyName = "summary:avg with precision"
avgPrecision.args = {
  ...Primary.args,
  summary: {
    type: 'avg',
    precision: 2
  },
  columns: [{
    prop: "id",
    label: "Id",
  }, {
    prop: "a",
    label: "A",
  }, {
    prop: "b",
    label: "B",
  }, {
    prop: "c",
    label: "C",
  }, ],
  data: [{
      id: 1,
      a: 10,
      b: 'text',
      c: 15
    },
    {
      id: 2,
      a: 15,
      b: 'text',
      c: 5
    },
    {
      id: 3,
      a: 30,
      b: 'text',
      c: 10
    },
  ],
}
avgPrecision.parameters = parseDocsSourceCode(html, avgPrecision.args)
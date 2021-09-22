import BoSearch from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoSearch',
  component: BoSearch,
  argTypes: {
    // slot
    default: {
      table: {
        type: {
          summary: '範例',
          detail: `
<bo-search>
  <el-button type="primary">Add</el-button>
</bo-search>
`
        },
      },
    },
    tips: {
      table: {
        type: {
          summary: '範例',
          detail: `
<bo-search>
  <template v-if="tips && tips.length" v-slot:tips>
    ....
  </template>
</bo-search>
`
        },
      },
    },
  }
};

const html = `<div>
  <bo-search
    :labelWidth="labelWidth"
    :itemWidth="itemWidth"
    :loading="loading"
    :submitBtnText="submitBtnText"
    :forms="forms"
    @search="search"
    @excel="excel"
  >
    <el-button type="primary">Add</el-button>
  </bo-search>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoSearch
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "example"
Primary.args = {
  labelWidth: '100px',
  itemWidth: '100px',
  loading: false,
  submitBtnText: "Search",
  forms: [{
      prop: "name",
      label: "Name"
    },
    {
      prop: "mobile",
      label: "Mobile"
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
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)



export const input = Template.bind({});
input.storyName = "itemType: input"
input.args = {
  ...Primary.args,
  forms: [{
    prop: "name",
    label: "Name"
  }]
}
input.parameters = parseDocsSourceCode(html, input.args)


export const select = Template.bind({});
select.storyName = "itemType: select"
select.args = {
  ...Primary.args,
  forms: [{
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
  }]
}
select.parameters = parseDocsSourceCode(html, select.args)


export const multSelect = Template.bind({});
multSelect.storyName = "itemType: multSelect"
multSelect.args = {
  ...Primary.args,
  forms: [{
    prop: "region",
    label: "Country",
    itemType: "multSelect",
    options: [{
        value: 0,
        label: "options1"
      },
      {
        value: 1,
        label: "options2"
      },
    ],
  }]
}
multSelect.parameters = parseDocsSourceCode(html, multSelect.args)


export const date = Template.bind({});
date.storyName = "itemType: date"
date.args = {
  ...Primary.args,
  forms: [{
    prop: "date",
    label: "Date:",
    itemType: "date",
    pastDays: 1,
  }]
}
date.parameters = parseDocsSourceCode(html, date.args)



export const daterange = Template.bind({});
daterange.storyName = "itemType: daterange"
daterange.args = {
  ...Primary.args,
  forms: [{
    prop: "daterange",
    label: "Daterange:",
    itemType: "daterange",
    pastDays: 1,
  }]
}
daterange.parameters = parseDocsSourceCode(html, daterange.args)


export const urlSync = Template.bind({});
urlSync.storyName = "urlSync"
urlSync.args = {
  ...Primary.args,
  forms: [{
    prop: "name",
    label: "Name",
    urlSync: true
  }]
}
urlSync.parameters = parseDocsSourceCode(html, urlSync.args)

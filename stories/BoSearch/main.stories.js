import BoSearch from '../../packages/BoSearch/src/main.vue'


import BoFormItem from '../../packages/BoFormItem/src/main.vue'
import BoSelect from "../../packages/BoSelect/src/main.vue";
import BoSelectInput from "../../packages/BoSelectInput/src/main.vue";
import BoSelectDate from "../../packages/BoSelectDate/src/main.vue";
import BoSection from "../../packages/BoSection/src/main.vue";

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoSearch',
  component: BoSearch,
  subcomponents: {
    BoFormItem,
    BoSelect,
    BoSelectInput,
    BoSelectDate,
    BoSection,
  },
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
    :exportBtn="exportBtn"
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
    {
      itemType: "selectInput",
      selectName: 'selectType',
      prop: 'uid',
      options: [{
          value: 'uid',
          label: "UID"
        },
        {
          value: 'gameId',
          label: "Games"
        }
      ],
    }
  ],
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const exportBtn = Template.bind({});
exportBtn.storyName = "exportBtn"
exportBtn.args = {
  ...Primary.args,
  exportBtn: {
    type: 'success',
    text: 'Export',
    percentage: 50
  }
}
exportBtn.parameters = parseDocsSourceCode(html, exportBtn.args)


export const selectInput = Template.bind({});
selectInput.storyName = "itemType: selectInput"
selectInput.args = {
  ...Primary.args,
  forms: [{
    itemType: "selectInput",
    selectName: 'selectType',
    prop: 'gameid',
    style: null,
    options: [{
        value: 'uid',
        label: "UID"
      },
      {
        value: 'name',
        label: "Names"
      }
    ],
    urlSync: true
  }]
}
selectInput.parameters = parseDocsSourceCode(html, selectInput.args)



export const selectDate = Template.bind({});
selectDate.storyName = "itemType: selectDate"
selectDate.args = {
  ...Primary.args,
  forms: [{
    itemType: "selectDate",
    selectName: 'selectType',
    prop: 'gameid',
    style: null,
    value: '20210701',
    periodName: 'date_period',
    periodRange: ['daily', 'week'],
    periodValue: 'week',
    urlSync: true,
  }]
}
selectDate.parameters = parseDocsSourceCode(html, selectDate.args)


export const section = Template.bind({});
section.storyName = "itemType: section"
section.args = {
  ...Primary.args,
  forms: [{
    prop: "section",
    label: "Section:",
    itemType: "section",
    maxSections: 10,
    minShowDelete: 3,
    // value: [1,2,3],
    Econfirm: (data) => console.log(data),
    Edefault: (data) => console.log(data)
  }]
}
section.parameters = parseDocsSourceCode(html, section.args)




export const datetimerange = Template.bind({});
datetimerange.storyName = "itemType: datetimerange"
datetimerange.args = {
  ...Primary.args,
  forms: [{
    prop: "datetimerange",
    label: "Datetimerange:",
    itemType: "datetimerange",
    maxRangeDays: 31,
    dayRange: 1,
    placeholder: '',
    pickerOptions: null,
    valueFormat: null,
    defaultTime: null,
    style: null,
    props: {
      'readonly': null,
      'disabled': null,
      'editable': null,
      // 'clearable': null, 已設定
      'size': null,
      // 'placeholder': null, 已設定
      'start-placeholder': null,
      'end-placeholder': null,
      // 'type': null,已設定
      // 'format': null,已設定
      'align': null,
      'popper-class': null,
      // 'picker-options': null,,已設定
      'range-separator': null,
      'default-value': null,
      // 'default-time': null,,已設定
      // 'value-format': null,,已設定
      'name': null,
      'unlink-panels': null,
      'prefix-icon': null,
      'clear-icon': null,
      'validate-event': null,
    },
    events: {
      change: () => console.log('change'),
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
    }
    
  }]
}
datetimerange.parameters = parseDocsSourceCode(html, datetimerange.args)



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
import BoSearch from '../../packages/BoSearch/src/main.vue'


import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoSearch/BoFormItem',
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
Primary.storyName = "itemType: input"
Primary.args = {
  labelWidth: '100px',
  itemWidth: '100px',
  loading: false,
  submitBtnText: "Search",
  forms: [{
    // itemType: 'input', // 預設值可不給
    prop: "name",
    label: "Name",
    type: '',
    disabledOn: 'form.type',
    placeholder: '',
    props: {
      'maxlength': null,
      'minlength': null,
      'show-word-limit': null,
      'clearable': null,
      'show-password': null,
      'disabled': null,
      'size': null,
      'prefix-icon': null,
      'suffix-icon': null,
      'rows': null,
      'autosize': null,
      'autocomplete': null,
      'auto-complete': null,
      'name': null,
      'readonly': null,
      'max': null,
      'min': null,
      'step': null,
      'resize': null,
      'autofocus': null,
      'form': null,
      'label': null,
      'tabindex': null,
      'validate-event': null,
    },
    events: {
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
      change: () => console.log('change'),
      input: () => console.log('input'),
      clear: () => console.log('clear'),
    }
  }]
}
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const textarea = Template.bind({});
textarea.storyName = "itemType: textarea"
textarea.args = {
  ...Primary.args,
  forms: [{
    itemType: 'textarea',
    prop: "textarea",
    label: "Textarea",
    disabledOn: 'form.type',
    "showWordLimit": true,
    "size": "medium",
    "rows": 2,
    autosize: false,
    placeholder: '',
    style: null,
    change: (form) => console.log('onChange', form),
    events: {
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
      change: () => console.log('change'),
      input: () => console.log('input'),
      clear: () => console.log('clear'),
    }
  }],
};
textarea.parameters = parseDocsSourceCode(html, textarea.args)


export const select = Template.bind({});
select.storyName = "itemType: select"
select.args = {
  ...Primary.args,
  forms: [{
    prop: "sex",
    label: "Sex",
    itemType: "select",
    placeholder: '',
    style: null,
    change: (form) => console.log('onChange', form),
    multiple: null,
    value: 0,
    options: [{
        value: 0,
        label: "Male"
      },
      {
        value: 1,
        label: "Female"
      },
    ],
    props: {
      'disabled': null,
      'value-key': null,
      'size': null,
      'clearable': null,
      'collapse-tags': null,
      'multiple-limit': null,
      'name': null,
      'autocomplete': null,
      'auto-complete': null,
      'filterable': null,
      'allow-create': null,
      'filter-method': null,
      'remote': null,
      'remote-method': null,
      'loading': null,
      'loading-text': null,
      'no-match-text': null,
      'no-data-text': null,
      'popper-class': null,
      'reserve-keyword': null,
      'default-first-option': null,
      'popper-append-to-body': null,
      'automatic-dropdown': null,
    },
    events: {
      change: () => console.log('change'),
      'visible-change': () => console.log('visible-change'),
      'remove-tag': () => console.log('remove-tag'),
      clear: () => console.log('clear'),
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
    }
  }]
}
select.parameters = parseDocsSourceCode(html, select.args)


export const radio = Template.bind({});
radio.storyName = "itemType: radio"
radio.args = {
  ...Primary.args,
  forms: [{
    itemType: 'radio',
    prop: "radio",
    label: "Radio",
    disabledOn: 'form.type',
    "options": [{
        "label": "radio1",
        value: 1, // custom file for element ui label
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
      },
      {
        "label": "radio2",
        value: 2, // custom file for element ui label
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
      },
      {
        "label": "radio3",
        value: 3, // custom file for element ui label
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
      }
    ],
    props: {
      'size': null,
      'disabled': null,
    },
    events: {
      change: () => console.log('change'),
    }
  }]
}
radio.parameters = parseDocsSourceCode(html, radio.args)


export const multSelect = Template.bind({});
multSelect.storyName = "itemType: multSelect"
multSelect.args = {
  ...Primary.args,
  forms: [{
    prop: "region",
    label: "Country",
    itemType: "multSelect",
    style: null,
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
    dayRange: 1,
    placeholder: '',
    pickerOptions: null,
    style: null,
    valueFormat: null,
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
      'default-time': null,
      // 'value-format': null,
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
date.parameters = parseDocsSourceCode(html, date.args)



export const datetime = Template.bind({});
datetime.storyName = "itemType: datetime"
datetime.args = {
  ...Primary.args,
  forms: [{
    itemType: 'datetime',
    prop: "datetime",
    label: "Datetime",
    disabledOn: 'form.type',
    placeholder: '',
    pickerOptions: null,
    valueFormat: null,
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
      'default-time': null,
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
datetime.parameters = parseDocsSourceCode(html, datetime.args)


export const monthrange = Template.bind({});
monthrange.storyName = "itemType: monthrange"
monthrange.args = {
  ...Primary.args,
  forms: [{
    prop: "monthrange",
    label: "monthrange:",
    itemType: "monthrange",
    maxRangeDays: 31,
    dayRange: 1,
    // placeholder: '',
    pickerOptions: null,
    valueFormat: null,
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
      'picker-options': null,
      'range-separator': null,
      'default-value': null,
      'default-time': null,
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
monthrange.parameters = parseDocsSourceCode(html, monthrange.args)


export const daterange = Template.bind({});
daterange.storyName = "itemType: daterange (pickerOptions)"
daterange.args = {
  ...Primary.args,
  forms: [{
    prop: "daterange",
    label: "Daterange:",
    itemType: "daterange",
    maxRangeDays: 31,
    dayRange: 1,
    placeholder: '',
    pickerOptions: null,
    // valueFormat: null,
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
      'default-time': null,
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
daterange.parameters = parseDocsSourceCode(html, daterange.args)

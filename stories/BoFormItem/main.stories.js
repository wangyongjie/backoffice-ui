import BoFormItem from '../../packages/BoFormItem/src/main.vue'

import BoSelect from "../../packages/BoSelect/src/main.vue";
import BoCurrencyInput from "../../packages/BoCurrencyInput/src/main.vue";
import BoMultLang from "../../packages/BoMultLang/src/main.vue";
import BoEmoji from "../../packages/BoEmoji/src/main.vue";
import BoImageUpload from "../../packages/BoImageUpload/src/main.vue";
import BoRangeInput from "../../packages/BoRangeInput/src/main.vue";
import BoPlus from "../../packages/BoPlus/src/main.vue"

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFormItem',
  component: BoFormItem,
  subcomponents: {
    BoSelect,
    BoCurrencyInput,
    BoMultLang,
    BoEmoji,
    BoImageUpload,
    BoRangeInput,
    BoPlus,
  },
  argTypes: {}
};

const html = `<div>
  <bo-form-item
    v-model="form.model[item.prop]"
    :item="item"
  ></bo-form-item>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoFormItem
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "itemType: input"
Primary.args = {
  form: {
    type: '',
    model: {
      name: "",
    }
  },
  item: {
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
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)



export const currency = Template.bind({});
currency.storyName = "itemType: currency"
currency.args = {
  form: {
    type: '',
    model: {
      currency: "",
    }
  },
  item: {
    itemType: 'currency',
    prop: "currency",
    label: "Currency",
    // type: '', type 固定為 text
    disabledOn: 'form.type',
    placeholder: '',
    props: {
      'maxlength': null,
      'minlength': null,
      'show-word-limit': null,
      'clearable': null,
      // 'show-password': null, // type is 'text' or 'textarea'
      'disabled': null,
      'size': null,
      'prefix-icon': null,
      'suffix-icon': null,
      // 'rows': null, // type is 'textarea'
      // 'autosize': null, // type is 'textarea'
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
  }
};
currency.parameters = parseDocsSourceCode(html, currency.args)


export const text = Template.bind({});
text.storyName = "itemType: text"
text.args = {
  form: {
    type: '',
    model: {
      text: "",
    }
  },
  item: {
    itemType: 'text',
    prop: "text",
    label: "Text",
  }
};
text.parameters = parseDocsSourceCode(html, text.args)


export const select = Template.bind({});
select.storyName = "itemType: select"
select.args = {
  form: {
    type: '',
    model: {
      select: "",
    }
  },
  item: {
    itemType: 'select',
    prop: "select",
    label: "Select",
    type: '',
    disabledOn: 'form.type',
    placeholder: '',
    multiple: null,
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
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
  }
};
select.parameters = parseDocsSourceCode(html, select.args)


export const multSelect = Template.bind({});
multSelect.storyName = "itemType: multSelect"
multSelect.args = {
  form: {
    type: '',
    model: {
      multSelect: [],
    }
  },
  item: {
    itemType: 'multSelect',
    prop: "multSelect",
    label: "MultSelect",
    disabledOn: 'form.type',
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
  }
};
multSelect.parameters = parseDocsSourceCode(html, multSelect.args)


export const multLang = Template.bind({});
multLang.storyName = "itemType: multLang"
multLang.args = {
  form: {
    type: '',
    model: {
      "value": {
        "en": {
          "title": "test",
          "textarea": "test"
        },
        "br": {
          "title": "test1",
          "textarea": "test1"
        }
      }
    }
  },
  item: {
    "prop": "value",
    label: "Value",
    disabledOn: 'form.type',
    "itemType": "multLang",
    "langs": [{
        "value": "en",
        "label": "English"
      },
      {
        "value": "br",
        "label": "Brazie"
      },
      {
        "value": "jp",
        "label": "Japan"
      }
    ],
    "form": {
      "model": {
        "title": "",
        "textarea": "",
        "einput": "",
        "etextarea": ""
      },
      "rules": {
        "title": [{
          "required": true,
          "message": "Please check the title.",
          "trigger": "blur"
        }],
        "textarea": [{
          "required": true,
          "message": "Please check the textarea.",
          "trigger": "blur"
        }]
      }
    },
    "formItems": [{
        "prop": "title",
        "label": "Title"
      },
      {
        "prop": "textarea",
        "label": "Textarea",
        "itemType": "textarea",
        "showWordLimit": true,
        "rows": 4
      },
      {
        "prop": "einput",
        "label": "Emoji Input",
        "itemType": "emoji",
        "rows": 1
      },
      {
        "prop": "etextarea",
        "label": "Emoji Textarea",
        "itemType": "emoji",
        "rows": 3
      }
    ]
  }
};
multLang.parameters = parseDocsSourceCode(html, multLang.args)


export const date = Template.bind({});
date.storyName = "itemType: date"
date.args = {
  form: {
    type: '',
    model: {
      date: "",
    }
  },
  item: {
    itemType: 'date',
    prop: "date",
    label: "Date",
    disabledOn: 'form.type',
    placeholder: '',
    pickerOptions: null,
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
  }
};
date.parameters = parseDocsSourceCode(html, date.args)


export const datetime = Template.bind({});
datetime.storyName = "itemType: datetime"
datetime.args = {
  form: {
    type: '',
    model: {
      datetime: "",
    }
  },
  item: {
    itemType: 'datetime',
    prop: "datetime",
    label: "Datetime",
    disabledOn: 'form.type',
    placeholder: '',
    pickerOptions: null,
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
  }
};
datetime.parameters = parseDocsSourceCode(html, datetime.args)


export const monthrange = Template.bind({});
monthrange.storyName = "itemType: monthrange (monthPickerOptions)"
monthrange.args = {
  form: {
    type: '',
    model: {
      monthrange: "",
    }
  },
  item: {
    itemType: 'monthrange',
    prop: "monthrange",
    label: "Monthrange",
    disabledOn: 'form.type',
    // placeholder: '',
    pickerOptions: null,
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
  },
};
monthrange.parameters = parseDocsSourceCode(html, monthrange.args)


export const daterange = Template.bind({});
daterange.storyName = "itemType: daterange (pickerOptions)"
daterange.args = {
  form: {
    type: '',
    model: {
      daterange: "",
    }
  },
  item: {
    itemType: 'daterange',
    prop: "daterange",
    label: "Daterange",
    disabledOn: 'form.type',
    placeholder: '',
    pickerOptions: null,
    // valueFormat: null,
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
  },
};
daterange.parameters = parseDocsSourceCode(html, daterange.args)


export const switchExample = Template.bind({});
switchExample.storyName = "itemType: switch"
switchExample.args = {
  form: {
    type: '',
    model: {
      switch: "",
    }
  },
  item: {
    itemType: 'switch',
    prop: "switch",
    label: "Switch",
    disabledOn: 'form.type',
    props: {
      'disabled': null,
      'width': null,
      'active-icon-class': null,
      'inactive-icon-class': null,
      'active-text': null,
      'inactive-text': null,
      'active-value': null,
      'inactive-value': null,
      'active-color': null,
      'inactive-color': null,
      'name': null,
      'validate-event': null,
    },
    events: {
      change: () => console.log('change'),
    }
  },
};
switchExample.parameters = parseDocsSourceCode(html, switchExample.args)


export const checkbox = Template.bind({});
checkbox.storyName = "itemType: checkbox"
checkbox.args = {
  form: {
    type: '',
    model: {
      checkbox: [],
    }
  },
  item: {
    itemType: 'checkbox',
    prop: "checkbox",
    label: "Checkbox",
    disabledOn: 'form.type',
    "options": [{
        "label": "checkbox1",
        'true-label': null,
        'false-label': null,
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
        'checked': null,
        'indeterminate': null,
      },
      {
        "label": "checkbox2",
        'true-label': null,
        'false-label': null,
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
        'checked': null,
        'indeterminate': null,
      },
      {
        "label": "checkbox3",
        'true-label': null,
        'false-label': null,
        'disabled': null,
        'border': null,
        'size': null,
        'name': null,
        'checked': null,
        'indeterminate': null,
      }
    ],
    props: {
      'size': null,
      'disabled': null,
      'min': null,
      'max': 2,
    },
    events: {
      change: () => console.log('change'),
    }
  },
};
checkbox.parameters = parseDocsSourceCode(html, checkbox.args)


export const radio = Template.bind({});
radio.storyName = "itemType: radio"
radio.args = {
  form: {
    type: '',
    model: {
      radio: null,
    }
  },
  item: {
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
  },
};
radio.parameters = parseDocsSourceCode(html, radio.args)


export const textarea = Template.bind({});
textarea.storyName = "itemType: textarea"
textarea.args = {
  form: {
    type: '',
    model: {
      textarea: null,
    }
  },
  item: {
    itemType: 'textarea',
    prop: "textarea",
    label: "Textarea",
    disabledOn: 'form.type',
    "showWordLimit": true,
    "size": "medium",
    "rows": 2,
    autosize: false,
    placeholder: '',
    events: {
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
      change: () => console.log('change'),
      input: () => console.log('input'),
      clear: () => console.log('clear'),
    }
  },
};
textarea.parameters = parseDocsSourceCode(html, textarea.args)


export const emoji = Template.bind({});
emoji.storyName = "itemType: emoji"
emoji.args = {
  form: {
    type: '',
    model: {
      emoji: null,
    }
  },
  item: {
    itemType: 'emoji',
    prop: "emoji",
    label: "Emoji",
    disabledOn: 'form.type',
    "showWordLimit": true,
    "rows": 2,
    autosize: false,
    placeholder: '',
    events: {
      blur: () => console.log('blur'),
      focus: () => console.log('focus'),
      change: () => console.log('change'),
      input: () => console.log('input'),
      clear: () => console.log('clear'),
    }
  },
};
emoji.parameters = parseDocsSourceCode(html, emoji.args)


export const imageUpload = Template.bind({});
imageUpload.storyName = "itemType: imageUpload (valid png)"
imageUpload.args = {
  form: {
    type: '',
    model: {
      imageUpload: null,
    }
  },
  item: {
    itemType: 'imageUpload',
    prop: "imageUpload",
    label: "ImageUpload",
    disabledOn: 'form.type',
    "onValid": function onValid(file) {
      console.log('file', file);
      if (file.raw.type === "image/png") {
        console.log('ok');
        return true;
      } else {
        console.error('not allow type');
        return false;
      }
    }
  },
};
imageUpload.parameters = parseDocsSourceCode(html, imageUpload.args)


export const tips = Template.bind({});
tips.storyName = "tips"
tips.args = {
  form: {
    type: '',
    model: {}
  },
  item: {
    tips: 'any itemType with tops'
  },
};
tips.parameters = parseDocsSourceCode(html, tips.args)

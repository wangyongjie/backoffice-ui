import BoDialog from '../../packages/BoDialog/src/main.vue'

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoDialog/BoFormItem',
  component: BoDialog,
  argTypes: {
    // hide from table
    'update:visible': {
      table: {
        disable: true
      }
    },
    'update:loading': {
      table: {
        disable: true
      }
    },
    // slot
    default: {
      table: {
        type: {
          summary: '範例',
          detail: `
<bo-dialog>
  <template v-slot:slotTest="{model}">
    <el-input v-model="model.slotTest"></el-input>
  </template>
</bo-dialog>
`
        },
      },
    },
  },
};

const html = `<div>
  <el-button @click="onAdd">Add</el-button>
  <el-button @click="onEdit">Edit</el-button>
  <el-button @click="onPreview">Preview</el-button>

  <bo-dialog
    :title="title"
    :form="form"
    :formItems="formItems"
    :visible.sync="visible"
    :loading.sync="loading"
    @confirm="confirm($event); onLoad()"
  >
    <!-- itemType: slot -->
    <template v-slot:slotTest="{model}">
      <el-input v-model="model.slotTest"></el-input>
    </template>
    <!-- itemType: plus -->
    <template v-slot:slotItem="{item, index}">
      <div>
        1-{{ index+1 }}
        <el-input v-model="item.name">
          <template slot="prepend">Name</template>
        </el-input>
        <el-input v-model="item.activity">
          <template slot="prepend">Activity</template>
        </el-input>
      </div>
    </template>
  </bo-dialog>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoDialog
  },
  props: Object.keys(argTypes),
  template: html,
  methods: {
    onAdd() {
      this.visible = true
      this.form.type = 'add'
    },
    onEdit() {
      this.visible = true
      this.form.type = 'edit'
      this.form.model.id = 1234
    },
    onPreview() {
      this.form.type = 'preview'
      this.visible = true
    },
    onLoad() {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 1000)
    },
  },
});

export const Primary = Template.bind({});
Primary.storyName = "itemType: input"
Primary.args = {
  visible: false,
  loading: false,
  title: '',
  form: {
    type: 'add',
    model: {
      name: "",
    }
  },
  formItems: [{
    prop: "name",
    label: "Name"
  }]
}
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const currency = Template.bind({});
currency.storyName = "itemType: currency"
currency.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      sb: "",
    }
  },
  formItems: [{
    prop: "sb",
    label: "S.B.",
    itemType: "currency"
  }]
}
currency.parameters = parseDocsSourceCode(html, currency.args)


export const text = Template.bind({});
text.storyName = "itemType: text"
text.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      id: "",
    }
  },
  formItems: [{
    prop: "id",
    label: "ID",
    type: "number",
    itemType: "text",
  }]
}
text.parameters = parseDocsSourceCode(html, text.args)


export const select = Template.bind({});
select.storyName = "itemType: select"
select.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      sex: "",
    }
  },
  formItems: [{
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
  form: {
    type: 'add',
    model: {
      region: "",
    }
  },
  formItems: [{
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
    value: [0, 1]
  }]
}
multSelect.parameters = parseDocsSourceCode(html, multSelect.args)


export const multLang = Template.bind({});
multLang.storyName = "itemType: multLang"
multLang.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      value: {
        'en': {
          title: 'test',
          textarea: 'test'
        },
        'br': {
          title: 'test1',
          textarea: 'test1'
        },
      },
    }
  },
  formItems: [{
    prop: 'value',
    itemType: 'multLang',
    langs: [{
        value: 'en',
        label: 'English'
      },
      {
        value: 'br',
        label: 'Brazie'
      },
      {
        value: 'jp',
        label: 'Japan'
      },
    ],
    form: {
      model: {
        title: '',
        textarea: '',
        einput: '',
        etextarea: '',
      },
      rules: {
        title: [{
          required: true,
          message: "Please check the title.",
          trigger: "blur"
        }],
        textarea: [{
          required: true,
          message: "Please check the textarea.",
          trigger: "blur"
        }],
      },
    },
    formItems: [{
        prop: "title",
        label: "Title",
      },
      {
        prop: "textarea",
        label: "Textarea",
        itemType: "textarea",
        showWordLimit: true,
        rows: 4,
      },
      {
        prop: "einput",
        label: "Emoji Input",
        itemType: "emoji",
        rows: 1,
      },
      {
        prop: "etextarea",
        label: "Emoji Textarea",
        itemType: "emoji",
        rows: 3,
      }
    ],
  }]
}
multLang.parameters = parseDocsSourceCode(html, multLang.args)


export const date = Template.bind({});
date.storyName = "itemType: date"
date.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      date: "",
    }
  },
  formItems: [{
    prop: "date",
    label: "Date:",
    itemType: "date",
    dayRange: 1,
    value: '2021-11-04'
  }]
}
date.parameters = parseDocsSourceCode(html, date.args)

export const datetime = Template.bind({});
datetime.storyName = "itemType: datetime"
datetime.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      datetime: "",
    }
  },
  formItems: [{
    prop: "datetime",
    label: "Datetime:",
    itemType: "datetime",
    dayRange: 1,
    value: '2021-11-30 00:00:00'
  }]
}
datetime.parameters = parseDocsSourceCode(html, datetime.args)


export const monthrange = Template.bind({});
monthrange.storyName = "itemType: monthrange"
monthrange.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      monthrange: "",
    }
  },
  formItems: [{
    prop: "monthrange",
    label: "Monthrange:",
    itemType: "monthrange",
    dayRange: 1,
    value: ["202102", "202108"]
  }]
}
monthrange.parameters = parseDocsSourceCode(html, monthrange.args)


export const daterange = Template.bind({});
daterange.storyName = "itemType: daterange"
daterange.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      daterange: "",
    }
  },
  formItems: [{
    prop: "daterange",
    label: "Daterange:",
    itemType: "daterange",
    dayRange: 1,
    value: ["20211206", "20211215"]
  }]
}
daterange.parameters = parseDocsSourceCode(html, daterange.args)

export const switchItem = Template.bind({});
switchItem.storyName = "itemType: switch"
switchItem.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      delivery: "",
    }
  },
  formItems: [{
    prop: "delivery",
    label: "Delivery:",
    itemType: "switch",
  }]
}
switchItem.parameters = parseDocsSourceCode(html, switchItem.args)


export const checkbox = Template.bind({});
checkbox.storyName = "itemType: checkbox"
checkbox.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      checkbox: [],
    }
  },
  formItems: [{
    prop: "checkbox",
    label: "Checkbox",
    itemType: "checkbox",
    options: [{
        label: "checkbox1"
      },
      {
        label: "checkbox2"
      },
      {
        label: "checkbox3"
      },
    ],
  }]
}
checkbox.parameters = parseDocsSourceCode(html, checkbox.args)


export const radio = Template.bind({});
radio.storyName = "itemType: radio"
radio.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      radio: "",
    }
  },
  formItems: [{
    prop: "radio",
    label: "Radio",
    itemType: "radio",
    options: [{
        value: 1,
        label: "radio1"
      },
      {
        value: 2,
        label: "radio2"
      },
      {
        value: 3,
        label: "radio3"
      },
    ],
  }]
}
radio.parameters = parseDocsSourceCode(html, radio.args)


export const textarea = Template.bind({});
textarea.storyName = "itemType: textarea"
textarea.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      textarea: "",
    }
  },
  formItems: [{
    prop: "textarea",
    label: "Textarea",
    itemType: "textarea",
    showWordLimit: true,
    size: "medium",
    rows: 2,
  }]
}
textarea.parameters = parseDocsSourceCode(html, textarea.args)

export const emoji = Template.bind({});
emoji.storyName = "itemType: emoji"
emoji.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      emoji: "",
    }
  },
  formItems: [{
    prop: "emoji",
    label: "Emoji",
    itemType: "emoji",
    showWordLimit: true,
    rows: 3,
  }]
}
emoji.parameters = parseDocsSourceCode(html, emoji.args)

export const imageUpload = Template.bind({});
imageUpload.storyName = "itemType: imageUpload"
imageUpload.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      imageUpload: "",
    }
  },
  formItems: [{
    prop: "imageUpload",
    label: "ImageUpload",
    itemType: "imageUpload",
    onValid: (file) => {
      console.log('file', file)
      if (file.raw.type === "image/png") {
        console.log('ok')
        return true
      } else {
        console.error('not allow type')
        return false
      }
    }
  }]
}
imageUpload.parameters = parseDocsSourceCode(html, imageUpload.args)


export const rangeInput = Template.bind({});
rangeInput.storyName = "itemType: rangeInput"
rangeInput.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      rangeInput: "",
      rangeProp: "",
    }
  },
  formItems: [{
    itemType: "rangeInput",
    prop: "rangeInput",
    label: "RangeInput",
    rangeProp: 'rangeProp',
  }]
}
rangeInput.parameters = parseDocsSourceCode(html, rangeInput.args)

export const plus = Template.bind({});
plus.storyName = "itemType: plus"
plus.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      plus: [{
        name: 'name',
        activity: 'activity'
      }, ],
    }
  },
  formItems: [{
    "prop": "plus",
    label: "Plus",
    "itemType": "plus",
    "slotName": "slotItem",
    "maxSlots": 5,
    defaultValue: {
      name: '1111',
      activity: '2222'
    }
  }]
}
plus.parameters = parseDocsSourceCode(html, plus.args)



export const slot = Template.bind({});
slot.storyName = "itemType: slot"
slot.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      slotTest: "",
    }
  },
  formItems: [{
    prop: "slotTest",
    label: "SlotTest",
    itemType: "slot",
    slotName: "slotTest",
  }]
}
slot.parameters = parseDocsSourceCode(html, slot.args)
import BoDialog from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoDialog',
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
  <bo-dialog
    :form="form"
    :formItems="formItems"
    :visible.sync="visible"
    :loading.sync="loading"
    @confirm="confirm($event); onLoad()"
  >
    <template v-slot:slotTest="{model}">
      <el-input v-model="model.slotTest"></el-input>
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
Primary.storyName = "all with validation"
Primary.args = {
  visible: false,
  loading: false,
  form: {
    type: 'add',
    model: {
      id: 1,
      sb: "",
      fee: "",
      roomName: "",
      name: "",
      mobile: "",
      sex: 0,
      region: [],
      date: "",
      daterange: "",
      delivery: false,
      checkbox: [],
      radio: 0,
      resource: "",
      textarea: "",
      slotTest: "",
    },
    labelWidth: "100px",
    rules: {
      sb: [{
        required: true,
        trigger: "change",
      }, ],
      fee: [{
        required: true,
        trigger: "change",
      }, ],
      slotTest: [{
        required: true,
        message: "Please check the configuration.",
        trigger: "blur",
      }, ],
    },
  },
  formItems: [
    // type text, only edit
    {
      prop: "id",
      label: "ID",
      type: "number",
      itemType: "text",
      showOn: "edit",
    },
    {
      prop: "sb",
      label: "S.B.",
      itemType: "currency"
    },
    {
      prop: "fee",
      label: "Fee"
    },
    {
      prop: "roomName",
      label: "RoomName",
      disabledOn: "edit",
      tips: "RootNmae不可重複且不可再次修改",
    },
    {
      prop: "name",
      label: "Name",
      rules: [{
        required: true,
        trigger: "blur",
      }, ],
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
    },
    {
      prop: "date",
      label: "Date:",
      itemType: "date",
      pastDays: 1,
    },
    {
      prop: "daterange",
      label: "Daterange:",
      itemType: "daterange",
      pastDays: 1,
    },
    {
      prop: "delivery",
      label: "Delivery:",
      itemType: "switch",
    },
    {
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
    },
    {
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
    },
    {
      prop: "textarea",
      label: "Textarea",
      itemType: "textarea",
      showWordLimit: true,
      size: "medium",
      rows: 2,
    },
    {
      prop: "slotTest",
      label: "SlotTest",
      itemType: "slot",
      slotName: "slotTest",
    },
  ],
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

export const input = Template.bind({});
input.storyName = "itemType: input"
input.args = {
  ...Primary.args,
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
input.parameters = parseDocsSourceCode(html, input.args)


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
  }]
}
multSelect.parameters = parseDocsSourceCode(html, multSelect.args)



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
    pastDays: 1,
  }]
}
date.parameters = parseDocsSourceCode(html, date.args)


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
    pastDays: 1,
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



export const withTips = Template.bind({});
withTips.storyName = "with tips"
withTips.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      name: "",
    }
  },
  formItems: [{
    prop: "name",
    label: "Name",
    tips: 'tips text'
  }]
}
withTips.parameters = parseDocsSourceCode(html, withTips.args)


export const showOn = Template.bind({});
showOn.storyName = "showOn with form.type"
showOn.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      name: "",
    }
  },
  formItems: [{
    prop: "name",
    label: "Name",
    showOn: 'edit'
  }]
}
showOn.parameters = parseDocsSourceCode(html, showOn.args)


export const disabledOn = Template.bind({});
disabledOn.storyName = "disabledOn with form.type"
disabledOn.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      name: "",
    }
  },
  formItems: [{
    prop: "name",
    label: "Name",
    disabledOn: 'edit'
  }]
}
disabledOn.parameters = parseDocsSourceCode(html, disabledOn.args)


export const change = Template.bind({});
change.storyName = "formItems.change"
change.args = {
  ...Primary.args,
  form: {
    type: 'add',
    model: {
      name: "",
    }
  },
  formItems: [{
    prop: 'name',
      label: "Name",
      change: (value) => {
      }
    },
  ]
}
change.parameters = parseDocsSourceCode(html, change.args)

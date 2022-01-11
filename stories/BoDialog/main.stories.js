import BoDialog from '../../packages/BoDialog/src/main.vue'
import BoFormItem from '../../packages/BoFormItem/src/main.vue'

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoDialog',
  component: BoDialog,
  subcomponents: {
    BoFormItem
  },
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
Primary.storyName = "all with validation"
Primary.args = {
  visible: false,
  loading: false,
  title: '',
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
      dayRange: 1,
    },
    {
      prop: "daterange",
      label: "Daterange:",
      itemType: "daterange",
      dayRange: 1,
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

export const title = Template.bind({});
title.storyName = "title"
title.args = {
  ...Primary.args,
  title: 'title',
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
title.parameters = parseDocsSourceCode(html, title.args)


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


export const resetOnAdd = Template.bind({});
resetOnAdd.storyName = "resetOnAdd"
resetOnAdd.args = {
  ...Primary.args,
  form: {
    type: 'add',
    resetOnAdd: false,
    model: {
      name: "test",
    }
  },
  formItems: [{
    prop: "name",
    label: "Name",
    tips: 'tips text'
  }]
}
resetOnAdd.parameters = parseDocsSourceCode(html, resetOnAdd.args)


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
    change: (value) => {}
  }, ]
}
change.parameters = parseDocsSourceCode(html, change.args)

export const isExist = Template.bind({});
isExist.storyName = "formItems.isExist"
isExist.args = {
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
    isExist: false
  }, ]
}
isExist.parameters = parseDocsSourceCode(html, isExist.args)
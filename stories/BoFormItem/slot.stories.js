import BoFormItem from '../../packages/BoFormItem/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFormItem/itemType:slot',
  component: BoFormItem,
  argTypes: {}
};

const html = `<div>
  <bo-form-item
    v-model="form.model[item.prop]"
    :item="item"
    :formModel="form.model"
  >
    <template v-slot:slotTest="{model}">
      <el-input v-model="model.slotTest"></el-input>
    </template>
  </bo-form-item>
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
Primary.storyName = "itemType:slot"
Primary.args = {
  form: {
    type: '',
    model: {
      "slot": "",
    }
  },
  item: {
    itemType: 'slot',
    prop: "slot",
    label: "Slot",
    "slotName": "slotTest",
    disabledOn: 'form.type',
  },
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


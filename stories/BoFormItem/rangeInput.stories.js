import BoFormItem from '../../packages/BoFormItem/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFormItem/itemType:rangeInput',
  component: BoFormItem,
  argTypes: {}
};

const html = `<div>
  <bo-form-item
    v-model="form.model[item.prop]"
    :item="item"
    :formModel="form.model"
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
Primary.storyName = "itemType:rangeInput"
Primary.args = {
  form: {
    type: '',
    model: {
      "rangeInput": "",
      "rangeProp": ""
    }
  },
  item: {
    itemType: 'rangeInput',
    prop: "rangeInput",
    label: "rangeInput",
    "rangeProp": "rangeProp",
    disabledOn: 'form.type',
  },
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


import BoRangeInput from '../../packages/BoRangeInput/src/main.vue'

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoRangeInput',
  component: BoRangeInput,
};

const html = `<div>
  <bo-range-input
    :prop.sync="model[form.prop]"
    :rangeProp.sync="model[form.rangeProp]"
    :rangeOptions="form.rangeOptions"
  ></bo-range-input>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoRangeInput
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  model: {},
  form: {
    itemType: "rangeInput",
    prop: 'value',
    rangeProp: 'range',
    rangeOptions: ['<', '=', '>'],
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
import BoCurrencyInput from '../../packages/BoCurrencyInput/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoCurrencyInput',
  component: BoCurrencyInput,
};

const html = `<div>
  <bo-currency-input
    v-model="model"
    clearable
    :placeholder="placeholder"
    :disabled="disabled"
  ></bo-currency-input>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoCurrencyInput
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  model: '',
  placeholder: '',
  disabled: false
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

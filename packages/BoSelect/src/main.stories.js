import BoSelect from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoSelect',
  component: BoSelect,
};

const html = `<div>
<bo-select
  v-model="model"
  :list="list"
  :collapseTags="collapseTags"
  :disabled="disabled"
  :showBtn="showBtn"
  :showType="showType"
>
  </bo-select>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoSelect
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  model: '',
  list: [{
      value: 0,
      label: "Male"
    },
    {
      value: 1,
      label: "Female"
    },
  ],
  collapseTags: true,
  disabled: false,
  showBtn: true,
  showType: 1,
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

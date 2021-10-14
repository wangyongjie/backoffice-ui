import BoSelectInput from '../../packages/BoSelectInput/src/main.vue'

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoSelectInput',
  component: BoSelectInput,
};

const html = `<div>
  <bo-select-input
    :params="params"
    :form="form"
    @onEnter="onEnter"
  ></bo-select-input>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoSelectInput
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  params: {},
  form: {
    itemType: "selectInput",
    selectName: 'selectType',
    prop: 'uid',
    options: [{
        value: 'uid',
        label: "UID"
      },
      {
        value: 'gameId',
        label: "Games"
      }
    ],
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
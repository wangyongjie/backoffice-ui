import BoCopy from '../../packages/BoCopy/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoCopy',
  component: BoCopy,
};

const html = `<div>
  <bo-copy>text to copy</bo-copy>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoCopy
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

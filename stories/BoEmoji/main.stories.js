import BoEmoji from '../../packages/BoEmoji/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoEmoji',
  component: BoEmoji,
  argTypes: {
  }
};

const html = `<div>
  <bo-emoji v-model="textarea"></bo-emoji>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoEmoji
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "default"
Primary.args = {
  textarea: '',
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

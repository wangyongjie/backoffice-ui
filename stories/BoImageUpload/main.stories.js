import BoImageUpload from '../../packages/BoImageUpload/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoImageUpload',
  component: BoImageUpload,
  argTypes: {
  }
};

const html = `<div>
  <bo-image-upload v-model="image"></bo-image-upload>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoImageUpload
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "default"
Primary.args = {
  image: {
    src: '',
    file: null
  },
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

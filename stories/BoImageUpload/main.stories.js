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
  <bo-image-upload v-model="image" :disabled="disabled" :onValid="onValid"></bo-image-upload>
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
  disabled: false,
  onValid: null
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const onValid = Template.bind({});
onValid.storyName = "with valid"
onValid.args = {
  image: {
    src: '',
    file: null
  },
  disabled: false,
  onValid: (file) => {
    console.log('file', file)
    if ( file.raw.type === "image/png") {
      console.log('ok')
      return true
    } else {
      console.error('not allow type')
      return false
    }
  }
};
onValid.parameters = parseDocsSourceCode(html, onValid.args)
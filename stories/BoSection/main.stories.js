import BoSection from '../../packages/BoSection/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoSection',
  component: BoSection,
  argTypes: {
    model: {
      description: 'v-model data with :value & @input',
    }
  }
};

const html = `<div>
  model: {{ model }}
  <bo-section 
  v-model="model"
  :maxSections="maxSections"
  :minShowDelete="minShowDelete"
  @input="input"
  @onDefault="onDefault"
  ></bo-section>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoSection
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  model: [],
  maxSections: 10,
  minShowDelete: 3,
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

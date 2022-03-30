import BoFileHandler from '../../packages/BoFileHandler/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFileHandler',
  component: BoFileHandler,
  argTypes: {}
};

const html = `<div>
  model: {{ model}}
  <bo-file-handler v-model="model" :format="format" :filename="filename">
    <template scope="{importFile, exportFile}"> 
      <el-button type="success" @click="importFile">Import</el-button>
      <el-button type="primary" @click="exportFile">Export</el-button>
    </template>
  </bo-file-handler>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoFileHandler
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "txt example"
Primary.args = {
  model: '',
  format: null,
  filename: 'txtExample'
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const jsonExample = Template.bind({});
jsonExample.storyName = "json example"
jsonExample.args = {
  model: {
    text: ''
  },
  format: 'json',
  filename: 'jsonExample'
};
jsonExample.parameters = parseDocsSourceCode(html, jsonExample.args)
import BoFormItem from '../../packages/BoFormItem/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFormItem/itemType:plus',
  component: BoFormItem,
  argTypes: {}
};

const html = `<div>
  <bo-form-item
    v-model="form.model[item.prop]"
    :item="item"
  >
    <template v-slot:slotItem="{item, index}">
      <div>
        1-{{ index+1 }}
        <el-input v-model="item.name">
          <template slot="prepend">Name</template>
        </el-input>
        <el-input v-model="item.activity">
          <template slot="prepend">Activity</template>
        </el-input>
      </div>
    </template>
  </bo-form-item>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoFormItem
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.storyName = "itemType:plus"
Primary.args = {
  form: {
    type: '',
    model: {
      name: "",
    }
  },
  item: {
    "prop": "plus",
    "label": "Plus",
    "itemType": "plus",
    "slotName": "slotItem",
    "maxSlots": 5
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

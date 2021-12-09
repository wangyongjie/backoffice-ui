import BoPlus from '../../packages/BoPlus/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoPlus',
  component: BoPlus,
};

const html = `<div>
form.model: {{ form.model }}
<el-form ref="form" :model="form" label-width="120px">
  <bo-plus v-model="form.model" :maxSlots="formItems.maxSlots" :slotName="formItems.slotName">
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
  </bo-plus>
</el-form>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoPlus
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  form: {
    model: [{
      name: 'name',
      activity: 'activity'
    }, ],
  },
  formItems: {
    "prop": "plus",
    "itemType": "plus",
    "slotName": "slotItem",
    "maxSlots": 10
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
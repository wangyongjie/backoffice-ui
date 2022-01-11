import BoMultLang from '../../packages/BoMultLang/src/main.vue'

import BoFormItem from '../../packages/BoFormItem/src/main.vue'

import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoMultLang',
  component: BoMultLang,
  subcomponents: {
    BoFormItem
  },
  argTypes: {
    // slot
    default: {
      table: {
        type: null,
      },
    },
  }
};

const html = `<div>
  <bo-mult-lang
  v-model="model[item.prop]"
  :langs="item.langs"
  :form="item.form"
  :formItems="item.formItems"
  ></bo-mult-lang>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoMultLang
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  model: {
    value: {
      'en': {
        title: 'test',
        textarea: 'test'
      },
      'br': {
        title: 'test1',
        textarea: 'test1'
      },
    },
  },
  item: {
    prop: 'value',
    itemType: 'multLang',
    langs: [{
        value: 'en',
        label: 'English'
      },
      {
        value: 'br',
        label: 'Brazie'
      },
      {
        value: 'jp',
        label: 'Japan'
      },
    ],
    form: {
      model: {
        title: '',
        textarea: '',
        einput: '',
        etextarea: '',
      },
      rules: {
        title: [{
          required: true,
          message: "Please check the title.",
          trigger: "blur"
        }],
        textarea: [{
          required: true,
          message: "Please check the textarea.",
          trigger: "blur"
        }],
      },
    },
    formItems: [{
        prop: "title",
        label: "Title",
      },
      {
        prop: "textarea",
        label: "Textarea",
        itemType: "textarea",
        showWordLimit: true,
        rows: 4,
      },
      {
        prop: "einput",
        label: "Emoji Input",
        itemType: "emoji",
        rows: 1,
      },
      {
        prop: "etextarea",
        label: "Emoji Textarea",
        itemType: "emoji",
        rows: 3,
      }
    ],
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
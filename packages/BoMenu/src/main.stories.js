import BoMenu from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoMenu',
  component: BoMenu,
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
  <bo-menu :menus="menus">
  <template #banner>
    banner
  </template>
  <template #seo>
    seo
  </template>
  <template #form>
    form
  </template>
  </bo-menu>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoMenu
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  menus: [{
      index: "banner",
      label: "Banner",
    },
    {
      index: "seo",
      label: "SEO",
    },
    {
      index: "form",
      label: "Form",
    },
  ],
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

import BoMenu from '../../packages/BoMenu/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

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
  <!-- Default -->
  <template #banner>
    banner
  </template>
  <template #seo>
    seo
  </template>
  <template #form>
    form
  </template>
  <!-- Tree -->
  <template #section>
    section
  </template>
  <template #trend>
    trend
  </template>
  <template #layer>
  layer
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
Primary.storyName = "default"
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
      default: true,
    },
  ],
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

export const withTree = Template.bind({});
withTree.storyName = "with Tree"
withTree.args = {
  menus: [{
      label: "Label",
      children: [
        {
          label: 'Activity',
          children: [
            {
              label: 'Hands',
              children: [
                {
                  label: 'Section',
                  index: 'section'
                },
                {
                  label: 'Trend',
                  index: 'trend',
                  default: true
                },
              ]
            },
            {
              label: 'Non-match Hands'
            },
            {
              label: 'Matches'
            },
            {
              label: 'Days Played'
            },
            {
              label: 'Time played'
            },
            {
              label: 'Game TO'
            },
            {
              label: 'Player RW'
            },
          ]
        }
      ]
    },
    {
      label: "Layer",
      index: "layer",
    },
  ],
};
withTree.parameters = parseDocsSourceCode(html, withTree.args)

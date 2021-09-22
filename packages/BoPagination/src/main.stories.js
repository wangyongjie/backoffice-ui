import BoPagination from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoPagination',
  component: BoPagination,
  argTypes: {
    // hide from table
    'update:page': {
      table: {
        disable: true
      }
    },
    'update:limit': {
      table: {
        disable: true
      }
    },
  }
};

const html = `<div>
  <bo-pagination
    :total="total"
    :page.sync="page"
    :limit.sync="limit"
    :disabled="disabled"
    @pagination="pagination"
  />
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoPagination
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  total: 0,
  page: 1,
  limit: 20,
  disabled: false
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
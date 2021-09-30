import BoSelectDate from './main.vue'
import {
  parseDocsSourceCode
} from '../../utils/storybook'

export default {
  title: 'Components/BoSelectDate',
  component: BoSelectDate,
};

const html = `<div>
  <bo-select-date
    :value.sync="params[form.prop]"
    :period.sync="params[form.periodName]"
    :period-range="form.periodRange"
    >
  </bo-select-date>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoSelectDate
  },
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  params: {},
  form: {
    prop: "dates",
    label: "Time",
    itemType: "selectDate",
    value: '20210701',
    periodName: 'date_period',
    periodRange: ['daily', 'week', 'month', 'year'],
    periodValue: 'daily',
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)
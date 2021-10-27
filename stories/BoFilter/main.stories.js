import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoFilter',
};

const html = `<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  template: html,
});


export const Primary = Template.bind({});
Primary.args = {
  label: 'number filter',
  value: 1231231,
  type: 'number'
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)


export const currency = Template.bind({});
currency.args = {
  label: 'currency filter',
  value: 1235,
  type: 'currency'
};
currency.parameters = parseDocsSourceCode(html, currency.args)


export const date = Template.bind({});
date.args = {
  label: 'date filter',
  value: '20211221',
  type: 'date'
};
date.parameters = parseDocsSourceCode(html, date.args)


export const multiple = Template.bind({});
multiple.args = {
  label: 'multiple filter',
  value: 1212121,
  type: 'currency|number'
};
multiple.parameters = parseDocsSourceCode(html, multiple.args)

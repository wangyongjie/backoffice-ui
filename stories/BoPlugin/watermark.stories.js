import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoPlugin/watermark',
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
  <p>this.$watermark(watermarkProp)</p>
  <div style="width: 900px; height: 900px; border: 1px solid black" ref="divRef"></div>
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  template: html,
  watch: {
    watermarkProp: {
      deep: true,
      handler(val) {
        this.watermark(val)
      }
    }
  },
  mounted() {
    this.watermark()
  },
  methods: {
    watermark(item) {
      const container = this.$refs.divRef
      this.$watermark({
        content: 'content',
        ...item,
        container,
      })
    }
  },
});


export const Primary = Template.bind({});
Primary.storyName = "watermark"
Primary.args = {
  watermarkProp: {
    container: 'this.$refs.divRef',
    width: '220px',
    height: '110px',
    textAlign: 'center',
    textBaseline: 'middle',
    font: "18px Microsoft Yahei",
    fillStyle: 'rgba(184, 184, 184, 0.2)',
    content: 'content',
    rotate: '-25',
    zIndex: 4000
  },
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

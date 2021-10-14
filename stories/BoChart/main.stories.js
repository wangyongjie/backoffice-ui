import BoChart from '../../packages/BoChart/src/main.vue'
import {
  parseDocsSourceCode
} from '../utils/storybook'

export default {
  title: 'Components/BoChart',
  component: BoChart
};

const html = `<div>
  <bo-chart :type="type" :chartData="chartData" />
</div>`

//👇 We create a “template” of how args map to rendering
const Template = (args, {
  argTypes
}) => ({
  components: {
    BoChart,
  },
  props: Object.keys(argTypes),
  template: html,
});

export const Primary = Template.bind({});
Primary.storyName = "lineChart"
Primary.args = {
  type: 'line',
  chartData: {
    labels: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
};
Primary.parameters = parseDocsSourceCode(html, Primary.args)

export const barChart = Template.bind({});
barChart.storyName = "barChart"
barChart.args = {
  type: 'bar',
  chartData: {
    labels: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  }
};
barChart.parameters = parseDocsSourceCode(html, barChart.args)

export const pieChart = Template.bind({});
pieChart.storyName = "pieChart"
pieChart.args = {
  type: 'pie',
  chartData: {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
};
pieChart.parameters = parseDocsSourceCode(html, pieChart.args)
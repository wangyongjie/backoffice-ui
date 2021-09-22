import {
    Pie,
    mixins
} from 'vue-chartjs'
const {
    reactiveProp
} = mixins

export default {
    name: "PieChart",
    extends: Pie,
    mixins: [reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
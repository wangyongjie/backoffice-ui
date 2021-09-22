import {
    Line,
    mixins
} from 'vue-chartjs'
const {
    reactiveProp
} = mixins

export default {
    name: "LineChart",
    extends: Line,
    mixins: [reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                datasets: {
                    // options for all line datasets
                    line: {
                        fill: false,
                        tension: 0
                    }
                }
            },
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
import {
    Bar,
    mixins
} from 'vue-chartjs'
const {
    reactiveProp
} = mixins

export default {
    name: "BarChart",
    extends: Bar,
    mixins: [reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
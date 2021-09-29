import {
    shallowMount
} from '@vue/test-utils'
import BoChart from './main.vue'

const tableData = {
    "columns": [{
        "prop": "time",
        "label": "Time"
      },
      {
        "prop": "prop0",
        "label": "Label0"
      },
      {
        "prop": "prop1",
        "label": "Label1"
      },
    ],
    "tableOptions": {
      "data": [{
          "time": "time0",
          "prop0": 27,
          "prop1": 8,
        },
        {
          "time": "time1",
          "prop0": 18,
          "prop1": 10,
        },
        {
          "time": "time2",
          "prop0": 6,
          "prop1": 36,
        },
        {
          "time": "time3",
          "prop0": 10,
          "prop1": 35,
        },
        {
          "time": "time4",
          "prop0": 28,
          "prop1": 29,
        },
        {
          "time": "time5",
          "prop0": 9,
          "prop1": 44,
        },
        {
          "time": "time6",
          "prop0": 32,
          "prop1": 10,
        },
        {
          "time": "time7",
          "prop0": 22,
          "prop1": 47,
        },
        {
          "time": "time8",
          "prop0": 24,
          "prop1": 15,
        },
        {
          "time": "time9",
          "prop0": 28,
          "prop1": 43,
        }
      ]
    }
  }
  

describe('BoChart', () => {

    it('watch.chartOptions null', async () => {
        const wrapper = shallowMount(BoChart, {
            propsData: {
                chartOptions: {
                    visible: false
                }
            }
        })
        expect(wrapper.vm.type).toBe("")
        expect(wrapper.vm.chartData).toBe(null)
    })

    it('watch.chartOptions line', async () => {
        const wrapper = shallowMount(BoChart, {
            propsData: {
                chartOptions: {
                    visible: true,
                    tableOptions: {
                        ...tableData.tableOptions,
                        chart: {
                          type: 'line',
                          labelProp: 'time',
                        }
                      },
                      columns: tableData.columns,
                }
            }
        })
        const result = {"datasets": [{"borderColor": "#619ED6", "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28], "label": "Label0"}, {"borderColor": "#6BA547", "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43], "label": "Label1"}], "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]}
        expect(wrapper.vm.type).toBe("line")
        expect(wrapper.vm.chartData).toEqual(result)
    })

    it('watch.chartOptions bar', async () => {
        const wrapper = shallowMount(BoChart, {
            propsData: {
                chartOptions: {
                    visible: true,
                    tableOptions: {
                        ...tableData.tableOptions,
                        chart: {
                          type: 'bar',
                          labelProp: 'time',
                        }
                      },
                      columns: tableData.columns,
                }
            }
        })
        const result = {"datasets": [{"backgroundColor": "#619ED6", "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28], "label": "Label0"}, {"backgroundColor": "#6BA547", "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43], "label": "Label1"}], "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]}
        expect(wrapper.vm.type).toBe("bar")
        expect(wrapper.vm.chartData).toEqual(result)
    })

    it('watch.chartOptions pie', async () => {
        const wrapper = shallowMount(BoChart, {
            propsData: {
                chartOptions: {
                    visible: true,
                    tableOptions: {
                        ...tableData.tableOptions,
                        chart: {
                          type: 'pie',
                          labelProp: 'time',
                        }
                      },
                      columns: tableData.columns,
                }
            }
        })
        const result = {"datasets": [{"backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"], "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28], "hoverOffset": 4, "label": "Label0"}, {"backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"], "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43], "hoverOffset": 4, "label": "Label1"}], "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]}
        expect(wrapper.vm.type).toBe("pie")
        expect(wrapper.vm.chartData).toEqual(result)
    })

})
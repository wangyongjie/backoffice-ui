import {
    transformUtils
} from '../../packages/BoChart/src/transform-utils'

describe('transformUtils.boChartData', () => {
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
            {
                "prop": "prop2",
                "label": "Label2"
            },
            {
                "prop": "prop3",
                "label": "Label3"
            },
            {
                "prop": "prop4",
                "label": "Label4"
            },
            {
                "prop": "prop5",
                "label": "Label5"
            },
            {
                "prop": "prop6",
                "label": "Label6"
            },
            {
                "prop": "prop7",
                "label": "Label7"
            },
            {
                "prop": "prop8",
                "label": "Label8"
            },
            {
                "prop": "prop9",
                "label": "Label9"
            },
        ],
        "tableOptions": {
            "data": [{
                    "time": "time0",
                    "prop0": 27,
                    "prop1": 8,
                    "prop2": 35,
                    "prop3": 23,
                    "prop4": 48,
                    "prop5": 38,
                    "prop6": 23,
                    "prop7": 29,
                    "prop8": 10,
                    "prop9": 17,
                },
                {
                    "time": "time1",
                    "prop0": 18,
                    "prop1": 10,
                    "prop2": 28,
                    "prop3": 23,
                    "prop4": 46,
                    "prop5": 12,
                    "prop6": 8,
                    "prop7": 48,
                    "prop8": 24,
                    "prop9": 17,
                },
                {
                    "time": "time2",
                    "prop0": 6,
                    "prop1": 36,
                    "prop2": 36,
                    "prop3": 31,
                    "prop4": 10,
                    "prop5": 5,
                    "prop6": 39,
                    "prop7": 15,
                    "prop8": 18,
                    "prop9": 47,
                },
                {
                    "time": "time3",
                    "prop0": 10,
                    "prop1": 35,
                    "prop2": 20,
                    "prop3": 38,
                    "prop4": 6,
                    "prop5": 22,
                    "prop6": 26,
                    "prop7": 40,
                    "prop8": 6,
                    "prop9": 32,
                },
                {
                    "time": "time4",
                    "prop0": 28,
                    "prop1": 29,
                    "prop2": 42,
                    "prop3": 31,
                    "prop4": 40,
                    "prop5": 39,
                    "prop6": 39,
                    "prop7": 30,
                    "prop8": 24,
                    "prop9": 42,
                },
                {
                    "time": "time5",
                    "prop0": 9,
                    "prop1": 44,
                    "prop2": 17,
                    "prop3": 14,
                    "prop4": 36,
                    "prop5": 28,
                    "prop6": 8,
                    "prop7": 5,
                    "prop8": 18,
                    "prop9": 32,
                },
                {
                    "time": "time6",
                    "prop0": 32,
                    "prop1": 10,
                    "prop2": 46,
                    "prop3": 26,
                    "prop4": 26,
                    "prop5": 8,
                    "prop6": 19,
                    "prop7": 24,
                    "prop8": 13,
                    "prop9": 29,
                },
                {
                    "time": "time7",
                    "prop0": 22,
                    "prop1": 47,
                    "prop2": 46,
                    "prop3": 46,
                    "prop4": 42,
                    "prop5": 16,
                    "prop6": 33,
                    "prop7": 35,
                    "prop8": 50,
                    "prop9": 18,
                },
                {
                    "time": "time8",
                    "prop0": 24,
                    "prop1": 15,
                    "prop2": 46,
                    "prop3": 22,
                    "prop4": 42,
                    "prop5": 37,
                    "prop6": 49,
                    "prop7": 48,
                    "prop8": 29,
                    "prop9": 41,
                },
                {
                    "time": "time9",
                    "prop0": 28,
                    "prop1": 43,
                    "prop2": 17,
                    "prop3": 15,
                    "prop4": 44,
                    "prop5": 38,
                    "prop6": 7,
                    "prop7": 23,
                    "prop8": 9,
                    "prop9": 20,
                }
            ]
        }
    }
    it('line ', () => {
        const tableOptions = {
            ...tableData.tableOptions,
            chart: {
                type: 'line',
                labelProp: 'time',
            }
        }
        const columns = tableData.columns
        const result = {
            "chartData": {
                "datasets": [{
                    "borderColor": "#619ED6",
                    "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28],
                    "label": "Label0"
                }, {
                    "borderColor": "#6BA547",
                    "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43],
                    "label": "Label1"
                }, {
                    "borderColor": "#F7D027",
                    "data": [35, 28, 36, 20, 42, 17, 46, 46, 46, 17],
                    "label": "Label2"
                }, {
                    "borderColor": "#E48F1B",
                    "data": [23, 23, 31, 38, 31, 14, 26, 46, 22, 15],
                    "label": "Label3"
                }, {
                    "borderColor": "#B77EA3",
                    "data": [48, 46, 10, 6, 40, 36, 26, 42, 42, 44],
                    "label": "Label4"
                }, {
                    "borderColor": "#E64345",
                    "data": [38, 12, 5, 22, 39, 28, 8, 16, 37, 38],
                    "label": "Label5"
                }, {
                    "borderColor": "#60CEED",
                    "data": [23, 8, 39, 26, 39, 8, 19, 33, 49, 7],
                    "label": "Label6"
                }, {
                    "borderColor": "#9CF168",
                    "data": [29, 48, 15, 40, 30, 5, 24, 35, 48, 23],
                    "label": "Label7"
                }, {
                    "borderColor": "#F7EA4A",
                    "data": [10, 24, 18, 6, 24, 18, 13, 50, 29, 9],
                    "label": "Label8"
                }, {
                    "borderColor": "#FBC543",
                    "data": [17, 17, 47, 32, 42, 32, 29, 18, 41, 20],
                    "label": "Label9"
                }],
                "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]
            },
            "type": "line"
        }
        expect(transformUtils.boChartData({
            tableOptions,
            columns
        })).toEqual(result)
    });

    it('bar ', () => {
        const tableOptions = {
            ...tableData.tableOptions,
            chart: {
                type: 'bar',
                labelProp: 'time',
            }
        }
        const columns = tableData.columns
        const result = {
            "chartData": {
                "datasets": [{
                    "backgroundColor": "#619ED6",
                    "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28],
                    "label": "Label0"
                }, {
                    "backgroundColor": "#6BA547",
                    "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43],
                    "label": "Label1"
                }, {
                    "backgroundColor": "#F7D027",
                    "data": [35, 28, 36, 20, 42, 17, 46, 46, 46, 17],
                    "label": "Label2"
                }, {
                    "backgroundColor": "#E48F1B",
                    "data": [23, 23, 31, 38, 31, 14, 26, 46, 22, 15],
                    "label": "Label3"
                }, {
                    "backgroundColor": "#B77EA3",
                    "data": [48, 46, 10, 6, 40, 36, 26, 42, 42, 44],
                    "label": "Label4"
                }, {
                    "backgroundColor": "#E64345",
                    "data": [38, 12, 5, 22, 39, 28, 8, 16, 37, 38],
                    "label": "Label5"
                }, {
                    "backgroundColor": "#60CEED",
                    "data": [23, 8, 39, 26, 39, 8, 19, 33, 49, 7],
                    "label": "Label6"
                }, {
                    "backgroundColor": "#9CF168",
                    "data": [29, 48, 15, 40, 30, 5, 24, 35, 48, 23],
                    "label": "Label7"
                }, {
                    "backgroundColor": "#F7EA4A",
                    "data": [10, 24, 18, 6, 24, 18, 13, 50, 29, 9],
                    "label": "Label8"
                }, {
                    "backgroundColor": "#FBC543",
                    "data": [17, 17, 47, 32, 42, 32, 29, 18, 41, 20],
                    "label": "Label9"
                }],
                "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]
            },
            "type": "bar"
        }
        expect(transformUtils.boChartData({
            tableOptions,
            columns
        })).toEqual(result)
    });


    it('pie ', () => {
        const tableOptions = {
            ...tableData.tableOptions,
            chart: {
                type: 'pie',
                labelProp: 'time',
            }
        }
        const columns = tableData.columns
        const result = {
            "chartData": {
                "datasets": [{
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [27, 18, 6, 10, 28, 9, 32, 22, 24, 28],
                    "hoverOffset": 4,
                    "label": "Label0"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [8, 10, 36, 35, 29, 44, 10, 47, 15, 43],
                    "hoverOffset": 4,
                    "label": "Label1"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [35, 28, 36, 20, 42, 17, 46, 46, 46, 17],
                    "hoverOffset": 4,
                    "label": "Label2"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [23, 23, 31, 38, 31, 14, 26, 46, 22, 15],
                    "hoverOffset": 4,
                    "label": "Label3"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [48, 46, 10, 6, 40, 36, 26, 42, 42, 44],
                    "hoverOffset": 4,
                    "label": "Label4"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [38, 12, 5, 22, 39, 28, 8, 16, 37, 38],
                    "hoverOffset": 4,
                    "label": "Label5"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [23, 8, 39, 26, 39, 8, 19, 33, 49, 7],
                    "hoverOffset": 4,
                    "label": "Label6"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [29, 48, 15, 40, 30, 5, 24, 35, 48, 23],
                    "hoverOffset": 4,
                    "label": "Label7"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [10, 24, 18, 6, 24, 18, 13, 50, 29, 9],
                    "hoverOffset": 4,
                    "label": "Label8"
                }, {
                    "backgroundColor": ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543"],
                    "data": [17, 17, 47, 32, 42, 32, 29, 18, 41, 20],
                    "hoverOffset": 4,
                    "label": "Label9"
                }],
                "labels": ["time0", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"]
            },
            "type": "pie"
        }
        expect(transformUtils.boChartData({
            tableOptions,
            columns
        })).toEqual(result)
    });

});
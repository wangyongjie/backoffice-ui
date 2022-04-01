import { deepClone } from '../../utils/index'

const getSeriesByType = ({
    type,
    dataProps,
    columnLabelMap
}) => {
    return dataProps.map(x => {
        const result = {
            type: type,
            // 設定 label, 預設名稱為 columns.label
            name: x.label || columnLabelMap[x.prop],
            // 設定 line chart 曲線是否平滑
            smooth: x.smooth || true
        }
        // 如果有指定顏色才設定
        if (x.color) {
            //  設定線的顏色
            result['lineStyle'] = {
                color: x.color
            }
            //  設定點的顏色
            result['itemStyle'] = {
                color: x.color
            }
        }
        return result
    })
}

const tableToLineChart = ({
    dataProps,
    columnLabelMap
}) => {
    const series = getSeriesByType({
        type: 'line',
        dataProps,
        columnLabelMap
    })
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: null
        },
        legend: {
            orient: 'horizontal',
            top: 'top'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
                alignWithLabel: true
            }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {
            type: 'value'
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: series
    }
}


const tableToBarChart = ({
    dataProps,
    columnLabelMap
}) => {
    const series = getSeriesByType({
        type: 'bar',
        dataProps,
        columnLabelMap
    })

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            orient: 'horizontal',
            top: 'top'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {
            type: 'value'
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: series
    }
}


const tableToPieChart = ({
    dataProps,
    columnLabelMap
}) => {
    const series = getSeriesByType({
        type: 'pie',
        dataProps,
        columnLabelMap
    })
    return {
        tooltip: {
            trigger: 'item',
            axisPointer: null
        },
        legend: {
            orient: 'horizontal',
            top: 'top'
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: series
    }
}

const boChartData = ({
    tableOptions,
    columns,
}) => {
    let chart = tableOptions.chart
    if (!chart) {
        return
    }
    const labelProp = chart.labelProp
    if (!labelProp) {
        console.error('chart.labelProp field is required.')
        return
    }

    if(chart.dimension === 'row') {
        // 使用深拷贝来规避影响
        tableOptions = deepClone(tableOptions)
        columns = deepClone(columns)

        let copyColumns = columns.filter(c => c.prop === labelProp).concat(tableOptions.data.map(d => {
            return { prop: d[labelProp], label: d[labelProp] }
        }))

        tableOptions.data = columns.filter(c => c.prop !== labelProp).map(item => {
            let obj = {}
            tableOptions.data.forEach(d => {
                obj[d[labelProp]] = d[item.prop]
            })
            return {
                [labelProp]: item.label,
                ...obj
            }
        })
        columns = copyColumns
    }

    console.log(tableOptions.data, columns)


    // 預設為 line chart
    const type = chart.type || 'line'

    // custom option 會覆蓋預設值
    const customOption = chart.option || {}

    // dataProps 預設為除了label外的所有欄位
    let dataProps = columns.filter(x => x.prop !== labelProp)
    // 如果有設定 chart.dataProps 則使用 chart.dataProps的資料
    if (chart.dataProps && chart.dataProps.length) {
        // { prop, label, color}
        dataProps = chart.dataProps
    }

    // map columns's prop to label
    const columnLabelMap = columns.reduce((pre, cur) => {
        pre[cur.prop] = cur.label
        return pre
    }, {})



    let option = {}
    if (type === 'line') {
        option = tableToLineChart({
            dataProps,
            columnLabelMap
        })
    } else if (type === 'bar') {
        option = tableToBarChart({
            dataProps,
            columnLabelMap
        })
    } else if (type === 'pie') {
        option = tableToPieChart({
            dataProps,
            columnLabelMap
        })
    }

    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
    const reestDimensions = dataProps.map(x => x.prop)
    let dimensions = [labelProp, ...reestDimensions]

    console.log({
        type,
        // dataset: https://echarts.apache.org/handbook/zh/concepts/dataset
        option: {
            dataset: {
                dimensions: dimensions,
                // 預設為 table data array object
                // 使用deepclone避免影响table表数据
                source: chart.dataReverse ? deepClone(tableOptions.data).reverse() : tableOptions.data
            },
            ...option,
            /// custom option
            ...customOption
        }
    })
    
    return {
        type,
        // dataset: https://echarts.apache.org/handbook/zh/concepts/dataset
        option: {
            dataset: {
                dimensions: dimensions,
                // 預設為 table data array object
                // 使用deepclone避免影响table表数据
                source: chart.dataReverse ? deepClone(tableOptions.data).reverse() : tableOptions.data
            },
            ...option,
            /// custom option
            ...customOption
        }
    }
}


export const transformUtils = {
    boChartData
}
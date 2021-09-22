const getColorByIndex = (index) => {
    const colorList = ["#619ED6", "#6BA547", "#F7D027", "#E48F1B", "#B77EA3", "#E64345", "#60CEED", "#9CF168", "#F7EA4A", "#FBC543", "#FFC9ED", "#E6696E"]
    const mode = index % colorList.length
    return colorList[mode];
};


const tableToLineChart = ({
    tableOptions,
    filteredColumns,
}) => {
    const datasets = [];
    filteredColumns.forEach((column, index) => {
        const data = tableOptions["data"].map(
            (row) => row[column.prop]
        );
        datasets.push({
            label: column.label,
            borderColor: getColorByIndex(index),
            data,
        });
    });

    return datasets
}


const tableToBarChart = ({
    tableOptions,
    filteredColumns,
}) => {
    const datasets = [];
    filteredColumns.forEach((column, index) => {
        const data = tableOptions["data"].map(
            (row) => row[column.prop]
        );
        datasets.push({
            label: column.label,
            backgroundColor: getColorByIndex(index),
            data,
        });
    });

    return datasets
}


const tableToPieChart = ({
    tableOptions,
    filteredColumns,
}) => {
    const datasets = [];
    filteredColumns.forEach((column) => {
        const backgroundColor = tableOptions["data"].map(
            (_, index) => getColorByIndex(index)
        );
        const data = tableOptions["data"].map(
            (row) => row[column.prop]
        );
        datasets.push({
            label: column.label,
            backgroundColor,
            data,
            hoverOffset: 4,
        });
    });

    return datasets
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
    const dataProps = chart.dataProps
    if (!labelProp) {
        console.error('chart.labelProp field is required.')
        return
    }
    const labels = tableOptions.data.map((x) => x[labelProp]);
    // 預設為 line chart
    const type = chart.type || 'line'
    // 過濾設定為 label 的資料
    let filteredColumns = columns.filter((column) => column.prop !== labelProp)
    // 預設為全部資料 如果有設定 dataProps 則使用裡面的資料
    if (dataProps && dataProps.length) {
        filteredColumns = filteredColumns.filter((column) => dataProps.includes(column.prop))
    }


    let datasets = []
    if (type === 'line') {
        datasets = tableToLineChart({
            tableOptions,
            filteredColumns
        })
    } else if (type === 'bar') {
        datasets = tableToBarChart({
            tableOptions,
            filteredColumns
        })
    } else if (type === 'pie') {
        datasets = tableToPieChart({
            tableOptions,
            filteredColumns
        })
    }

    return {
        type,
        chartData: {
            labels,
            datasets
        }
    }
}


export const transformUtils = {
    boChartData
}
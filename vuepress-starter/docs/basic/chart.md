## Chart 图表

用于数据上的报表及展示数据分析图表，可配置不同的图表类型(参考[echarts](https://echarts.apache.org/examples/zh/index.html))

### 基本用法

可添加不同chart表格

## Stacked Line
:::demo 

```html
<template>
  <div>
    <bo-chart :option="option" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        title: {
          text: "Stacked Line"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "Email",
            "Union Ads",
            "Video Ads",
            "Direct",
            "Search Engine"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [{
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
}
</script>

```

:::

## BarChart
:::demo 

```html
<template>
  <div>
    <bo-chart :option="option" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [{
          type: "category",
          data: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: "value"
        }],
        series: [{
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [
            10,
            52,
            200,
            334,
            390,
            330,
            220
          ]
        }]
      }
    };
  },
}
</script>

```

:::

## PieChart
:::demo 

```html
<template>
  <div>
    <bo-chart :option="option" />
  </div>
</template>

<script>
  export default {
  data() {
    return {
      option: {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [{
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [{
              value: 1048,
              name: "Search Engine"
            },
            {
              value: 735,
              name: "Direct"
            },
            {
              value: 580,
              name: "Email"
            },
            {
              value: 484,
              name: "Union Ads"
            },
            {
              value: 300,
              name: "Video Ads"
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }]
      }
    };
  },
}
</script>
```

:::

## 关系图

可用于金币溯源等关系图

:::demo

```html
<template>
  <bo-chart :initOptions="initOptions" :option="option" @dblclick="dblclick" />
</template>

<script>
  export default {
  data() {
    return {
      initOptions: {
        height: '700px'
      },
      option:  {
        title: {
          text: '金币溯源图'
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbol: 'path://M512 512c123.776 0 224-100.224 224-224S635.776 64 512 64a223.936 223.936 0 0 0-224 224C288 411.776 388.224 512 512 512z m0 64c-149.504 0-448 85.76-448 256v128h896v-128c0-170.24-298.496-256-448-256z',
            symbolSize: 25,
            label: {
              show: true,
              position: 'bottom'
            },
            edgeSymbol: ['none', 'arrow'],
            edgeLabel: {
              fontSize: 14
            },
            force: {
              repulsion: 1000,
              layoutAnimation: false
            },
            roam: true,
            data: [
              {
                name: 'Node 1',
                // fixed: true,
                x: 500,
                y: 400,
                itemStyle: {
                  color: 'red'
                }
              },
              {
                name: 'Node 2',
              },
              {
                name: 'Node 3',
              },
              {
                name: 'Node 4',
              },
              {
                name: 'Node 5',
              },
              {
                name: 'Node 6',
              },
              {
                name: 'Node 7',
              },
              {
                name: 'Node 8',
                label: {
                  formatter : 'Node 6'
                },
                itemStyle: {
                  color: 'grey'
                }
              }
            ],
            links: [
              {
                source: 'Node 1',
                target: 'Node 2',
                value: 11,
                lineStyle: {
                  curveness: 0.2,
                  color: 'blue'
                }
              },
              {
                source: 'Node 2',
                target: 'Node 1',
                value: 10,
                lineStyle: {
                  curveness: 0.2
                }
              },
              {
                source: 'Node 1',
                target: 'Node 3'
              },
              {
                source: 'Node 1',
                target: 'Node 4'
              },
              {
                source: 'Node 2',
                target: 'Node 5'
              },
              {
                source: 'Node 2',
                target: 'Node 6'
              },
              {
                source: 'Node 3',
                target: 'Node 7'
              },
              {
                source: 'Node 3',
                target: 'Node 8'
              }
            ],
            lineStyle: {
              width: 2,
              color: '#666',
              curveness: 0
            }
          }
        ]
      }
    };
  },
  methods: {
    dblclick(params) {
      alert(params.name)
    }
  }
}
</script>
```

:::

### Input Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| option          | ECharts 的万能接口。修改这个 prop 会触发 ECharts 实例的 setOption 方法。（配置可参考 option Parameter)| Object  |  —  |  — |
|   type        | type: 'pie' or others | string  |  —  |  — |

#### Option Parameter

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| title          | 标题组件，包含主标题和副标题。| Object  |  详细其他属性可参考echart setOption 的其他属性[title](https://echarts.apache.org/zh/option.html#title)  |  — |
| tooltip        | 提示框組件 | Object  |  详细其他属性可参考echart setOption 的其他属性[tooltip](https://echarts.apache.org/zh/option.html#tooltip)|  — |
| legend         | 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。| Object  | 详细其他属性可参考echart setOption 的其他属性[legend](https://echarts.apache.org/zh/option.html#legend)  |  — |
| grid           | 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。)| Object  | 详细其他属性可参考echart setOption 的其他属性[grid](https://echarts.apache.org/zh/option.html#grid)  |  — |
| toolbox        | 工具栏| Object  | 详细其他属性可参考echart setOption 的其他属性[toolbox](https://echarts.apache.org/zh/option.html#toolbox)  |  — |
| xAxis          | 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。| Object  |  详细其他属性可参考echart setOption 的其他属性[xAxis](https://echarts.apache.org/zh/option.html#xAxis)   |  — |
| yAxis          | 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。| Object  |  详细其他属性可参考echart setOption 的其他属性[yAxis](https://echarts.apache.org/zh/option.html#yAxis)   |  — |
| series         | 可以选择不同type | Object  |  详细其他属性可参考echart setOption 的其他属性[series](https://echarts.apache.org/zh/option.html#series)    |  — |

### Events
无

### Methods
| 方法名    | 说明         | 参数                    | 范例
| --------- | ------------ | ----------------------- | ----------------------- |
| clear | 清空圖表內容(設定bo-chart 的ref="boChartRef" ) | - | this.$refs.boChartRef.clear()|
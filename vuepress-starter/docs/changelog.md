# 更新日志

## 1.0.120

2022-03-09

- bo-filter  优化时间过滤
- bo-select  优化全选默认值

## 1.0.119

2022-03-2

- bo-form-item  修复报错

## 1.0.118

2022-02-22

- bo-chart 可自定义高度和放开dblclick事件

## 1.0.117

2022-02-16

- bo-locale 修复使用中文文案出现的报错

## 1.0.116

2022-02-15

- bo-search 的dateRange支持新属性 ignoreToday，设置为true会忽略今天且今天之后的日期都不可选
- 新增 导入和导出配置组件
- 修复export导出多级表头的展示不正确问题

## 1.0.115

2022-01-26

- bo-plus 支持model

## 1.0.114

2022-01-25

- bo-menu 的tree点击任意项都可收缩菜单
- exportExcel 修复自动宽度问题


## 1.0.113

2022-01-21

- bo-form-item 的 plus 增加onlyRemoveLast配置
- bo-dialog 修复无法关闭问题和可配置宽度

## 1.0.112

2022-01-21

- bo-form-item增加plusStyle


## 1.0.111

2022-01-17

- 修复bug

## 1.0.110

2022-01-13

- backoffice-ui导出编译后的umd文件

## 1.0.109

2022-01-11

- bo-search 去除上边距

## 1.0.108

2022-01-10

- bo-form-item
  - select选择默认可搜索
  - el-input支持配置prependSlot和appendSlot插槽
  
- 修复一些eslint报错

## 1.0.107

2022-01-07

- bo-dialog 初始化默認值優化

## 1.0.106

2022-01-06

- fixed bo-select-input 初始值问题
- bo-plus 新增预设值 & 调整 UI


## 1.0.105

2022-01-05

- bo-plugin
  - excel auto width 以 header 的第一行为基准
  - fixed header & filterVal

- bo-search 
  - exportBtn 按钮增加百分比 & 动画

## 1.0.104

2022-01-04

- bo-section 修正数字比对前转成int
- bo-locale 新增国际化设定同 element-ui

## 1.0.103

2021-12-28

- bo-form-item 让 bo-dialog, bo-search, bo-multLang 共用
- 组件支持所有element原有组件的属性和方法
- bo-section 修復初始值问题

## 1.0.101

2021-12-21

- bo-pagination
- fix change limit callback twice problem

## 1.0.100

2021-12-21

- bo-table
 - table image add height fixed scroll issue

## 1.0.99

2021-12-21

- bo-image-upload
 - add validation

## 1.0.98

2021-12-18

- bo-dialog
 - image error msg


## 1.0.97

2021-12-18

- bo-table
 - image preview 

## 1.0.96

2021-12-17

- bo-table 
 - [hotfix]多级表头slot问题

## 1.0.95

2021-12-16

- bo-plugin
 - exportExcel 支援多级表头

## 1.0.94

2021-12-14

- bo-page 优化自动高度判断，先设置高度后更改表头
  
## 1.0.93

2021-12-13

- bo-search 新增itemType为textarea

## 1.0.92

2021-12-10

- bo-menu 可配置多级菜单

- bo-chart 可配置option来实现横向柱状图

## 1.0.91

2021-12-09

- bo-plugin 新增 this.$exportExcel 方法，会根据columns自动处理filter和render，增加describe参数配置

- bo-page 的chart配置新增 dataReverse, 默认为false，设置true，图标的x轴是倒序展示数据

## 1.0.90

2021-12-08

- 新增 bo-section 元件

## 1.0.89

2021-12-07

- [hotfix] export bo-chart 元件

## 1.0.88

2021-12-06

- 新增 bo-plus 元件

## 1.0.87

2021-12-03

- bo-form-item
- item.type = textarea 开放placeholder

## 1.0.86

2021-12-01

- bo-chart 更改为用 echart
- bo-page
- 优化bo-chart的设置

配置参考如下：

``` javascript
chart: {   
 show: true,    // 是否显示
 type: 'line',  // 图表类型
 labelProp: 'time', // x轴栏位 
 dataProps: [{  
   prop: 'prop1',  // y轴对应表格的列
   label: 'Custom Label', // label名称， 不配置就用column对应的label
   color: 'black' // 线颜色，不配置就用预设的10个颜色中的某一个
 }],
 option: {} // 可依照 echart.option 复盖
}
```

## 1.0.85

2021-11-30

- bo-dialog
- 新增 form.type = preview
- 可自行设定 title

## 1.0.84

2021-11-23

- bo-table
  - 修复自动高度问题

## 1.0.83

2021-11-23

- bo-chart
  - 优化配置，可自定义label和color

## 1.0.82

2021-11-23

- bo-table
  - 配置render时仍然支持配置fliter，先进行render后执行filter

## 1.0.81

2021-11-23

- 新增 BoPlugin
- 可在元件内使用 this.$watermark 新增浮水印
- bo-filter
- 新增 card filter

## 1.0.80

2021-11-23

- bo-dialog
  - fixed bo-form-item v-model issue

## 1.0.79

2021-11-22

- bo-dialog
  - add form.resetOnAdd 关闭重设表单 预设为 true

## 1.0.78

2021-11-15

- [hotfix] bo-dialog
  - bo-form-item not pass slot

## 1.0.77

2021-11-15

- bo-page autoHeight 自动判断高 不需外部传入
- bo-dialog 新增 isExist 栏位, false 时会清空 model

## 1.0.76

2021-11-15

- 新增 bo-range-input 元件

## 1.0.75

2021-11-15

- 新增 bo-form-item 元件
  - dialog & multlang 共用 form-item

## 1.0.74

2021-11-12

- bo-dialog 新增 transition 修復关闭动画流畅度

## 1.0.73

2021-11-11

- bo-multlang fixed emoji v-model error

## 1.0.72

2021-11-11

- bo-multlang 新增 emoji 元件

## 1.0.71

2021-11-10

- bo-menu
  - 新增keepAlive，默认为false，如果配置true，menu互相切换时，旧的页面会缓存，不会重置数据

## 1.0.70

2021-11-08

- 新增 bo-image-upload 元件
- 新增 bo-emoji 元件
- bo-dialog 新增两种 itemType
  - itemType === 'emoji'
  - itemType === 'imageUpload'

## 1.0.69

2021-11-08

- bo-search
  - itemType为datetimerange的增加maxRangeDays判断

## 1.0.68

2021-11-08

- bo-search
  - itemType为datetimerange的添加快捷选项

## 1.0.67

2021-11-08

- bo-search
  - 优化itemType为datetimerange的dayRange值，和defaultTime关联起来

  -

## 1.0.66

2021-11-08

- bo-search
  - itemType为datetimerange的新增defaultTime配置

  -

## 1.0.65

2021-11-08

- bo-search
  - 新增itemType为datetimerange的类型，默认值为dayRange:1,如果想自定义，请用value，如[1635734224826, 1636339024826],格式默认为时间戳，如果希望其他格式，请配置valueFormat

## 1.0.64

2021-11-03

- bo-search
  - 新增style参数配置，可以更改组件的样式

## 1.0.63

2021-10-29

- bo-table
  - 如设置summary: { type: 'avg', precision: 2}，精度为2，如果判断平均值为整数，则忽略精度

## 1.0.62

2021-10-29

- bo-select-input
  - 默认也传selectType值

## 1.0.61

2021-10-29

- bo-search
  - 修复input输入框出现科学计数法问题

## 1.0.60

2021-10-28

- bo-search
  - itemType:'date' 新增参数offset，表示偏移量，单位是天，如-1表示昨天，0表示今天

## 1.0.59

2021-10-28

- bo-search
  - itemType:'date' 新增参数offset，表示偏移量，单位是天，如-1表示昨天，0表示今天

## 1.0.58

2021-10-28

- bo-dialog
  - fix blur error
- bo-search
  - urlSync需优化，只需从url同步到bo-search，点击search按钮不需要同步数据到url
  - BoSelectInput的urlSync有bug，无法根据url的参数切到对应的select框
  - BoSelectInput会把订单号等比较长的查询参数转成科学计数法，需修复

## 1.0.57

2021-10-27

- bo-search
  - 放开input和select的值变化

## 1.0.56

2021-10-27

- bo-table
  - 修复更换表头引起的表头混乱问题
- bo-search
  - 增加导出按钮的配置，如 exportBtn: { type: 'success', text: 'Export' }

## 1.0.55

2021-10-26

- bo-table
  - filter: 'date', 优化格式判断

## 1.0.54

2021-10-26

- bo-table
  - filter: 'date', 格式化日期
  - filter: number 新增预设值 0
  - filter: 'currency' 支持货币转换
  - filter: 'currency|number' 支援多filter 照顺序执行

## 1.0.53

2021-10-25

- bo-dialog
  - 修复show-footer="false" 问题

## 1.0.52

2021-10-22

- bo-dialog
  - 可配置是否展示footer，默认展示， :show-footer="false" 就不展示

## 1.0.51

2021-10-21

- bo-dialog 和 bo-search
  - 修复input框不能输入空格的问题
- bo-search-input
  - 修复prop值不正确问题

## 1.0.50

2021-10-21

- bo-dialog
  - 新增itemType为 monthrange
- bo-search
  - 新增itemType为 monthrange
- bo-table
  - 新增pre属性，用于渲染textarea数据

## 1.0.49

2021-10-19

- bo-dialog
  - 可配置confirm文案，使用 confirm-title="preview"
- bo-menu
  - 减少高度，添加加粗
- bo-search
  - 优化maxRangeDays判断
  
## 1.0.48

2021-10-18

- bo-page
  - 优化自动高度设置

## 1.0.47

2021-10-18

- bo-dialog
  - 新增itemType为 datetime的组件
- bo-search
  - 新增itemType为 datetime的组件

## 1.0.46

2021-10-14

- bo-dialog
  - 新增itemType为 multLang的组件

## 1.0.45

2021-10-12

- bo-search
  - 新增 itemType: "radio"

## 1.0.44

2021-10-12

- bo-search
  - itemType: "daterange" 新增 maxRangeDays 限制最大天数和侧边栏快捷键显示
- bo-chart
  - move table logic to bo-page
  - adjust tooltip & grid line
  
## 1.0.43

2021-10-11

- bo-search 组件
  - 修复clearable可配置，如果clearable: null 就清除clearble

  -

## 1.0.42

2021-09-30

- bo-page 组件
  - 修复height问题，通过属性为false或null不生效来处理

## 1.0.41

2021-09-30

- bo-search 组件
  - itemType: "selectDate" 修复一下week日期不正确问题

## 1.0.40

2021-09-30

- bo-search 组件
  - 新增 itemType: "selectDate"
- bo-copy 组件
  - 修改display为inline-block
- bo-page 组件
  - height可传，如果为auto，则不自动设置table高度

## 1.0.39

2021-09-27

- bo-page 组件
  - 在 bo-table 组件前后加插槽 preTable 和 nextTable
- bo-search 组件
  - 新增 itemType: "selectInput"
- 新增 bo-copy 组件

## 1.0.38

2021-09-18

- bo-page 增加自动处理loading

## 1.0.37

2021-09-16

- bo-table 移除 summary 千分位

## 1.0.36

2021-09-16

- 修改 Storybook 文件显示格式
- 移除 console.log
- 移除 router.catch error

## 1.0.35

2021-09-15

- bo-search
- bo-menu
  - urlSync 改以 vue-router 实作

## 1.0.34

2021-09-14

- bo-table
  - 修正没资料的时候 summary 显示
  - 移除 summary 背景色
  - 修正没资料的时候 chart 显示
  - 修正多级表头 summary & chart 的问题

## 1.0.33

2021-09-11

- bo-chart
  - 移除 tableOptions.lineChartProp 设定
  - 新增 tableOptions.chart = {show: Boolean , type: 'line' | 'bar' | 'pie', labelProp: string , dataProps:[]}
    - show 是否预设展示
    - type 图表类型 除了 line 还新增 bar 和 pie 图表
    - labelProp 选 table 的哪个 prop 作为 X 轴的 label
    - dataProps 选 table 的哪些 prop 加入图表资料 (预设为全部, 除了 labelProp)
- bo-filter
  - fixed null toString bug

## 1.0.31

2021-09-09

- bo-table
  - 增加求和和平均值计算 summary: 'avg' | 'sum' 或 summary: { type: 'avg' excludeProps: ['prop']}, 预设第一个栏位会变成 Sum 或 Avg, excludeProps 可排除栏位, precision 精准度到小数第几位 (预设为0)
  - 修復多级表头 columns 格式化错误的问题
- bo-dialog
  - formItems.change: (value) => { } 当数值改变的时候呼叫
- bo-search
  - urlSync: true, 支持複杂物件及阵列 (利用encodeURIComponent, JSON.stringify)

## 1.0.30

2021-09-06

- bo-table
  - 增加 column.target = _blank or_self  (default_blank)

## 1.0.27

2021-09-03

- bo-search
  - 增加日期范围all选项和showExcel配置

## 1.0.26

2021-08-30

- bo-dialog
  - update textarea & textarea trim on blur
- bo-chart
  - add line chart with bo-table when set tableOptions.lineChartProp:"prop" (x axios columns prop)

## 1.0.25

2021-08-30

- bo-dialog
  - if screen width < 600px, dialog with become 100% and form align top
- bo-page
  - if screen width < 600px, tips dialog with become 100%
  
## 1.0.24

2021-08-27

- bo-dialog
  - add custom function to reset form

## 1.0.23

2021-08-27

- bo-dialog
  - 更新 currency input 输入为 string 格式, 按下 confirm 后会转为 number
- bo-table
  - add slot name 'extraBtn' validation

## 1.0.22

2021-08-26

- bo-table
  - fixed slot not pass issue
- bo-dialog
  - set close-on-click-modal to false 避免误触关闭
  - 更新 currency input 为 text 格式

## 1.0.21

2021-08-26

- bo-table
  - columns 新增 recursive children 支援多级表头

## 1.0.20

2021-08-26

- bo-dialog
  - 新增 form.type = type ('add' || 'edit'), type === 'add' 会帮你重设 form 表单
    - formItems 新增 showOn: "edit" 根据 type 决定是否显示
    - formItems 新增 disabledOn: "edit" 根据 type 决定是否 disabled
  - 新增预设错误讯息 form.rules && formItems[].rules
  - formItems 新增 itemType: "currency" 格式化输出为千分位, 数值为 number (目前不支持小数)
  - formItems 新增 tips 会在下方秀提示讯息

- bo-table
  - columns 新增 html function 来设定color & html 格式
  - columns 新增 linkPrefix: "/test-link?uid=" 让资料变成超连结
  - columns 新增 image 格式，设定同 element-ui Image
    image: {
      style: null,
      fit: "",
    },

## 1.0.19

2021-08-24

- bo-search
  - 增加校验部分，添加require参数可校验是否为空

## 1.0.18

2021-08-23

- bo-page
  - 新增 tips 栏位可显示提示讯息

## 1.0.17

2021-08-12

- bo-table
  - sortable: true 客户端排序
  - sortable: "custom" 后端排序, 新增栏位 order("ascending", "descending" or null), prop
- bo-dialog
  - 添加和编辑功能，input ， select，multSelect，时间，text，checkbox，slot (包含验证, confirm loading)
- bo-search
  - formOptions.forms 设定 urlSync: true 让搜寻参数和 url 同步

## 1.0.16

2021-07-30

- bo-search
  - 单选框默认可清除
  - 参数pastDays改为dayRange
  - 缩短时间范围长度
- bo-page
  - 新增hasPagination，默认为true,为有分页功能。:hasPagination="false"可清除分页
  - 新增全局过滤器boFilter, 参数增加 filter: 'number' 或者直接用 boFilter('number') 过滤。 可转千分格式

## 1.0.15

2021-07-28

- bo-page
  - 新增slot插槽
- 其他
  - 新增bo-dialog等组件

### Bug 修复

- bo-page
  - 修复total不合法问题

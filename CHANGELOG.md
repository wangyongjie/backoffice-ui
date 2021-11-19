## 更新日志

### 1.0.76
*2021-11-15*
- 新增 bo-range-input 元件 

### 1.0.75
*2021-11-15*
- 新增 bo-form-item 元件 
  - dialog & multlang 共用 form-item

### 1.0.74
*2021-11-12*
- bo-dialog 新增 transition 修復關閉動畫流暢度

### 1.0.73
*2021-11-11*
- bo-multlang fixed emoji v-model error
### 1.0.72
*2021-11-11*
- bo-multlang 新增 emoji 元件

### 1.0.71
*2021-11-10*
- bo-menu
  - 新增keepAlive，默认为false，如果配置true，menu互相切换时，旧的页面会缓存，不会重置数据

### 1.0.70
*2021-11-08*
- 新增 bo-image-upload 元件
- 新增 bo-emoji 元件
- bo-dialog 新增兩種 itemType
  - itemType === 'emoji'
  - itemType === 'imageUpload'

### 1.0.69
*2021-11-08*
- bo-search
  - itemType为datetimerange的增加maxRangeDays判断

### 1.0.68
*2021-11-08*
- bo-search
  - itemType为datetimerange的添加快捷选项

### 1.0.67
*2021-11-08*
- bo-search
  - 优化itemType为datetimerange的dayRange值，和defaultTime关联起来
  - 
### 1.0.66
*2021-11-08*
- bo-search
  - itemType为datetimerange的新增defaultTime配置
  - 
### 1.0.65
*2021-11-08*
- bo-search
  - 新增itemType为datetimerange的类型，默认值为dayRange:1,如果想自定义，请用value，如[1635734224826, 1636339024826],格式默认为时间戳，如果希望其他格式，请配置valueFormat

### 1.0.64
*2021-11-03*
- bo-search
  - 新增style参数配置，可以更改组件的样式

### 1.0.63
*2021-10-29*
- bo-table
  - 如设置summary: { type: 'avg', precision: 2}，精度为2，如果判断平均值为整数，则忽略精度

### 1.0.62
*2021-10-29*
- bo-select-input
  - 默认也传selectType值

### 1.0.61
*2021-10-29*
- bo-search
  - 修复input输入框出现科学计数法问题

### 1.0.60
*2021-10-28*
- bo-search
  - itemType:'date' 新增参数offset，表示偏移量，单位是天，如-1表示昨天，0表示今天

### 1.0.59
*2021-10-28*
- bo-search
  - itemType:'date' 新增参数offset，表示偏移量，单位是天，如-1表示昨天，0表示今天

### 1.0.58
*2021-10-28*
- bo-dialog
  - fix blur error
- bo-search
  - urlSync需优化，只需从url同步到bo-search，点击search按钮不需要同步数据到url
  - BoSelectInput的urlSync有bug，无法根据url的参数切到对应的select框
  - BoSelectInput会把订单号等比较长的查询参数转成科学计数法，需修复

### 1.0.57
*2021-10-27*
- bo-search
  - 放开input和select的值变化

### 1.0.56
*2021-10-27*
- bo-table
  - 修复更换表头引起的表头混乱问题
- bo-search
  - 增加导出按钮的配置，如 exportBtn: { type: 'success', text: 'Export' }

### 1.0.55
*2021-10-26*
- bo-table
  - filter: 'date', 优化格式判断

### 1.0.54
*2021-10-26*
- bo-table
  - filter: 'date', 格式化日期
  - filter: number 新增預設值 0
  - filter: 'currency' 支持货币转换
  - filter: 'currency|number' 支援多filter 照順序執行

### 1.0.53
*2021-10-25*
- bo-dialog
  - 修复show-footer="false" 问题

### 1.0.52
*2021-10-22*
- bo-dialog
  - 可配置是否展示footer，默认展示， :show-footer="false" 就不展示

### 1.0.51
*2021-10-21*
- bo-dialog 和 bo-search
  - 修复input框不能输入空格的问题
- bo-search-input
  - 修复prop值不正确问题

### 1.0.50
*2021-10-21*
- bo-dialog
  - 新增itemType为 monthrange
- bo-search
  - 新增itemType为 monthrange
- bo-table
  - 新增pre属性，用于渲染textarea数据

### 1.0.49
*2021-10-19*
- bo-dialog
  - 可配置confirm文案，使用 confirm-title="preview"
- bo-menu
  - 减少高度，添加加粗
- bo-search
  - 优化maxRangeDays判断
  

### 1.0.48
*2021-10-18*
- bo-page
  - 优化自动高度设置

### 1.0.47
*2021-10-18*
- bo-dialog
  - 新增itemType为 datetime的组件
- bo-search
  - 新增itemType为 datetime的组件

### 1.0.46
*2021-10-14*
- bo-dialog
  - 新增itemType为 multLang的组件

### 1.0.45
*2021-10-12*
- bo-search
  - 新增 itemType: "radio"

### 1.0.44
*2021-10-12*
- bo-search
  - itemType: "daterange" 新增 maxRangeDays 限制最大天數和側邊欄快捷鍵顯示
- bo-chart
  - move table logic to bo-page
  - adjust tooltip & grid line
  
### 1.0.43
*2021-10-11*
- bo-search 组件
  - 修复clearable可配置，如果clearable: null 就清除clearble
  - 
### 1.0.42
*2021-09-30*
- bo-page 组件
  - 修复height问题，通过属性为false或null不生效来处理

### 1.0.42
*2021-09-30*
- bo-page 组件
  - 修复height问题，通过属性为false或null不生效来处理
  - 
### 1.0.41
*2021-09-30*
- bo-search 组件
  - itemType: "selectDate" 修复一下week日期不正确问题

### 1.0.40
*2021-09-30*
- bo-search 组件
  - 新增 itemType: "selectDate"
- bo-copy 组件
  - 修改display为inline-block
- bo-page 组件
  - height可传，如果为auto，则不自动设置table高度

### 1.0.39
*2021-09-27*
- bo-page 组件
  - 在 bo-table 组件前后加插槽 preTable 和 nextTable
- bo-search 组件
  - 新增 itemType: "selectInput"
- 新增 bo-copy 组件

### 1.0.38

*2021-09-18*
- bo-page 增加自动处理loading

### 1.0.37
*2021-09-16*
- bo-table 移除 summary 千分位

### 1.0.36
*2021-09-16*
- 修改 Storybook 文件顯示格式
- 移除 console.log
- 移除 router.catch error

### 1.0.35
*2021-09-15*
- bo-search
- bo-menu
  - urlSync 改以 vue-router 實作

### 1.0.34
*2021-09-14*
- bo-table
  - 修正沒資料的時候 summary 顯示
  - 移除 summary 背景色
  - 修正沒資料的時候 chart 顯示
  - 修正多级表头 summary & chart 的問題

### 1.0.33
*2021-09-11*
- bo-chart
  - 移除 tableOptions.lineChartProp 設定
  - 新增 tableOptions.chart = {show: Boolean , type: 'line' | 'bar' | 'pie', labelProp: string , dataProps:[]}
      - show 是否預設展示
      - type 圖表類型 除了 line 還新增 bar 和 pie 圖表
      - labelProp 選 table 的哪個 prop 作為 X 軸的 label
      - dataProps 選 table 的哪些 prop 加入圖表資料 (預設為全部, 除了 labelProp)
- bo-filter
  - fixed null toString bug

### 1.0.31
*2021-09-09*
- bo-table 
  - 增加求和和平均值计算 summary: 'avg' | 'sum' 或 summary: { type: 'avg' excludeProps: ['prop']}, 預設第一個欄位會變成 Sum 或 Avg, excludeProps 可排除欄位, precision 精準度到小數第幾位 (預設為0)
  - 修復多级表头 columns 格式化錯誤的問題
- bo-dialog
  - formItems.change: (value) => { } 當數值改變的時候呼叫
- bo-search 
  - urlSync: true, 支持複雜物件及陣列 (利用encodeURIComponent, JSON.stringify)

### 1.0.30
*2021-09-06*
- bo-table
  - 增加 column.target = _blank or _self  (default_blank)

### 1.0.27
*2021-09-03*
- bo-search 
  - 增加日期范围all选项和showExcel配置

### 1.0.26
*2021-08-30*
- bo-dialog
  - update textarea & textarea trim on blur
- bo-chart
  - add line chart with bo-table when set tableOptions.lineChartProp:"prop" (x axios columns prop)

### 1.0.25
*2021-08-30*
- bo-dialog
  - if screen width < 600px, dialog with become 100% and form align top
- bo-page
  - if screen width < 600px, tips dialog with become 100%
  
### 1.0.24
*2021-08-27*
- bo-dialog
  - add custom function to reset form 

### 1.0.23
*2021-08-27*
- bo-dialog
  - 更新 currency input 輸入為 string 格式, 按下 confirm 後會轉為 number
- bo-table
  - add slot name 'extraBtn' validation

### 1.0.22
*2021-08-26*
- bo-table
  - fixed slot not pass issue
- bo-dialog
  - set close-on-click-modal to false 避免誤觸關閉
  - 更新 currency input 為 text 格式

### 1.0.21
*2021-08-26*
- bo-table
  - columns 新增 recursive children 支援多级表头

### 1.0.20
*2021-08-26*
- bo-dialog
  - 新增 form.type = type ('add' || 'edit'), type === 'add' 會幫你重設 form 表單
    - formItems 新增 showOn: "edit" 根據 type 決定是否顯示
    - formItems 新增 disabledOn: "edit" 根據 type 決定是否 disabled
  - 新增預設錯誤訊息 form.rules && formItems[].rules
  - formItems 新增 itemType: "currency" 格式化輸出為千分位, 數值為 number (目前不支持小數)
  - formItems 新增 tips 會在下方秀提示訊息

- bo-table
  - columns 新增 html function 來設定color & html 格式
  - columns 新增 linkPrefix: "/test-link?uid=" 讓資料變成超連結
  - columns 新增 image 格式，設定同 element-ui Image
    image: {
      style: null,
      fit: "",
    },

### 1.0.19
*2021-08-24*
#### 新特性
- bo-search
  - 增加校验部分，添加require参数可校验是否为空 

### 1.0.18
*2021-08-23*
#### 新特性
- bo-page
  - 新增 tips 欄位可顯示提示訊息 

### 1.0.17
*2021-08-12*
#### 新特性
- bo-table
  -  sortable: true 客戶端排序
  -  sortable: "custom" 後端排序, 新增欄位 order("ascending", "descending" or null), prop 
- bo-dialog
  - 添加和编辑功能，input ， select，multSelect，时间，text，checkbox，slot (包含驗證, confirm loading)
- bo-search
  - formOptions.forms 設定 urlSync: true 讓搜尋參數和 url 同步


### 1.0.16

*2021-07-30*
#### 新特性

- bo-search
  - 单选框默认可清除
  - 参数pastDays改为dayRange
  - 缩短时间范围长度
- bo-page
  - 新增hasPagination，默认为true,为有分页功能。:hasPagination="false"可清除分页
  - 新增全局过滤器boFilter, 参数增加 filter: 'number' 或者直接用 boFilter('number') 过滤。 可转千分格式


### 1.0.15

*2021-07-28*
#### 新特性

- bo-page
  - 新增slot插槽
- 其他
  - 新增bo-dialog等组件

#### Bug 修复

- bo-page
  - 修复total不合法问题

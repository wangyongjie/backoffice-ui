## 更新日志

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

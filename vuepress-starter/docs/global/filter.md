## Filter 全局过滤器

筛选数字为不同单位, 不同符号及日期的切换

### 基本用法

输入数字并切换为千分位的分隔(type 为 number)
如没有，默认为0

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Number filter',
      value: 1231231,
      type: 'number'
    };
  },
}
</script>

```
:::

### 小数点的切换

输入数字切换为小数点第二位(type 为 currency)
如没有，默认为0

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Currency filter',
      value: 1231231,
      type: 'currency'
    };
  },
}
</script>

```
:::

### 日前的切换(非时间戳timestamp)

输入数字切换为日期格式(type 为 date 并且数字需填入８个数字)

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Date filter',
      value: 12310231,
      type: 'date'
    };
  },
}
</script>

```
:::
### 日前的切换(时间戳timestamp)

输入数字切换为日期格式(type 为 date 并且数字需填入10个数字)

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Date filter',
      value: 1231023124,
      type: 'date'
    };
  },
}
</script>

```
:::

### 扑克牌的转换

输入数字切换为扑克牌的转换(type 为 card)
[扑克牌52张牌图表](#扑克牌52张牌图表)參考以下的圖表
:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Card filter',
      value: 268,
      type: 'card'
    };
  },
}
</script>

```
:::
### 扑克牌的转换(多個顯示)

输入多個数字切换为扑克牌的转换(type 为 card)
[扑克牌52张牌图表](#扑克牌52张牌图表)參考以下的圖表
:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Card Array filter',
      value: [
        258,
        269,
        525,
        1036,
        1027,
        775
      ],
      type: 'card'
    };
  },
}
</script>

```
:::
### 扑克牌52张牌图表
|  花色 | 數字 | 數字代碼 | 花色  | 數字 | 數字代碼 | 花色  | 數字 | 數字代碼 | 花色  | 數字 | 數字代碼 | 
| ------------ | ------------ |  ------------ |  ------------ |  ------------ | ------------ | ------------ |  ------------ | ------------ | ------------ |  ------------ | ------------ |
|  ♦ | 2 | 258 | ♣ | 2 | 514 |  ♥ | 2 |  770 | ♠ | 2 | 1026 |
|    | 3 | 259 |   | 3 | 515 |   | 3 | 771 |   | 3 | 1027 | 
|    | 4 | 260 |   | 4 | 516 |   | 4 |  772|   | 4 | 1028 | 
|    | 5 | 261 |   | 5 | 517 |   | 5 | 773 |   | 5 | 1029 | 
|    | 6 | 262 |   | 6 | 518 |   | 6 | 774 |   | 6 | 1030 | 
|    | 7 | 263 |   | 7 | 519 |   | 7 | 775 |   | 7 | 1031 | 
|    | 8 | 264 |   | 8 | 520 |   | 8 |  776|   | 8 | 1032 | 
|    | 9 | 265 |   | 9 | 521 |   | 9 | 777 |   | 9 | 1033 |
|    | 10 | 266 |  | 10 | 522 |  | 10 | 778 |  | 10 | 1034 |
|    | J | 267 |   | J | 523 |   | J | 779 |   | J | 1035 | 
|    | Q | 268 |   | Q | 524 |   | Q | 780 |   | Q | 1036 |
|    | K | 269 |   | K | 525 |   | K | 781 |   | K | 1037 | 
|    | A | 270 |   | A | 526 |   | A | 782 |   | A | 1038 |



### 多种类型的共用 (拓展小数点后几位的应用)

在類型中（type）每多加一個currency 就多加小數點後兩位

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Multiple filter combination with multi-currency',
      value: 1231023124,
      type: 'currency|currency|currency'
    };
  },
}
</script>

```
:::

### 多种类型的共用 (小数点跟千分位的应用)

在類型中（type) 输入currency 跟number 

:::demo 

```html

<template>
<div>
  <h4>{{ label }}</h4>
  {{ value | boFilter(type )}}
</div>
</template>
<script>
export default {
  data() {
    return {
      label: 'Multiple filter combination with currency and number',
      value: 1231023124,
      type: 'currency|number'
    };
  },
}
</script>

```
:::

### Input Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| type          | 数值切换的方法  | String  | number, currency, date, card | —  |
| value         | 输入的数字值    | number or string  |  —  | —  |

### Events
无

### Methods
无
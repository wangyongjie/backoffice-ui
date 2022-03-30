## RangeInput 多配置输入框

配合后台需求，输入框可以配置不同范围选项

### 基本用法

输入框只允许输入数字及科学符号（e)

:::demo 

```html
<template>
<div>
  <bo-range-input
    :prop.sync="model[form.prop]"
    :rangeProp.sync="model[form.rangeProp]"
  ></bo-range-input>
</div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        itemType: "rangeInput",
        prop: "value",
        rangeProp: "range",
      }
    };
  },
}
</script>

```
:::

### 配置不同范围选项

配置range options(>, <, = 三个符号)

:::demo 

```html
<template>
<div>
  <bo-range-input
    :prop.sync="model[form.prop]"
    :rangeProp.sync="model[form.rangeProp]"
    :rangeOptions="form.rangeOptions"
  ></bo-range-input>
</div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        itemType: "rangeInput",
        prop: "value",
        rangeProp: "range",
        rangeOptions: [
          "＝",
          "<",
          ">"
        ]
      }
    };
  },
}
</script>

```
:::

### 自定义输入框占位文本

配置placeholder文案

:::demo 

```html
<template>
<div>
  <bo-range-input
    :prop.sync="model[form.prop]"
    :rangeProp.sync="model[form.rangeProp]"
    placeholder="请输入数字或者科学符号"
  ></bo-range-input>
</div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      form: {
        itemType: "rangeInput",
        prop: "value",
        rangeProp: "range",
      }
    };
  }
}
</script>

```
:::

### Input Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| prop           | 绑定值 (form.prop)     | String  | —      | —  |
| rangeProp        | 范围的绑定值 （form.rangeProp）   | String  |  —    | — |
| placeholder     | 输入框占位文本 | String   | —      | —          |
| rangeOptions   | 可選的范围选项   | Array  | —  |  ['<', '≤', '=', '≥', '>'] |

### Events
无

### Methods
无

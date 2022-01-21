## CurrencyInput 货币输入框

将输入格式转为千分位

### 基本用法

只能將數字進行千分位的轉換

:::demo 

```html
<template>
<div>
  <bo-currency-input
    v-model="model"
    clearable
    :placeholder="placeholder"
    :disabled="disabled"
  ></bo-currency-input>
</div>
</template>
<script>
export default {
  data() {
    return {
      model: '',
      placeholder: '',
      disabled: false
    };
  },
}
</script>

```
:::

### Input Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| v-model           | 绑定值     | string  | —      | —  |
| placeholder     | 输入框占位文本 | Array   | —      | —          |
| disabled        | 禁用   | boolean  | true/false      | false         |
| clearable        | 是否可清空   | boolean  | true/false      | false         |
### Input Attributes(以下为element-ui原生支持的attributes)
| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| size       | 输入框尺寸   | string  | large, medium, small, mini  |  medium   |
| maxlength   | 原生属性，最大输入长度   | number  |  — |  —  |
| show-word-limit   | 是否显示输入字数统计   | boolean  |  — |  false  |
| show-password  | 是否显示切换密码图标   | boolean  |  — |  false  |
| prefix-icon  | 输入框头部图标   | string  |  — |  —  |
| suffix-icon  | 输入框尾部图标   | string  |  — |  —  |
| readonly  | 原生属性，是否只读   | boolean  |  — |  false  |

### Events
无

### Methods
无
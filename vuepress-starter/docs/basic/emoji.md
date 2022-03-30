## Emoji 表情输入框

输入框可以输入不同emoji图案 并提供不同emoji图库

### 基本用法

选取输入框最右边的emoji图案并选择想输入的emoji

:::demo 

```html
<template>
<div>
  <bo-emoji 
    v-model="textarea">
  </bo-emoji>
</div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
    };
  },
}
</script>

```
:::

### 显示输入框占位文本方法

设定输入框占位文本

:::demo 

```html
<template>
<div>
  <bo-emoji 
    v-model="textarea"
    placeholder="請輸入emoji"
    >
  </bo-emoji>
</div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
    };
  },
}
</script>

```
:::
### 禁用輸入框方法


设定禁用输入框

:::demo 

```html
<template>
<div>
  <bo-emoji 
    v-model="textarea"
    disabled
    >
  </bo-emoji>
</div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
    };
  },
}
</script>

```
:::

### 自定义输入框行数


设定输入框行数为四行

:::demo 

```html
<template>
<div>
  <bo-emoji 
    v-model="textarea"
    :rows="4"
    >
  </bo-emoji>
</div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
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
| placeholder     | 输入框占位文本 | String   | —      | —          |
| disabled        | 禁用   | boolean  | true/false      | false         |
| rows        | 输入框行数   |  string |   -      | 预设为 1 视同 input        |

### Events
无

### Methods
无
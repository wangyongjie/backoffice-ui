## Copy 复制

点击复制图标时，粘贴板会保存文案

### 基础用法

:::demo
```html
<template>
<div>
  <bo-copy>text to copy</bo-copy>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
}
</script>
```
:::

### Attributes
无

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| copy | 点击copy图标触发 | 复制的文案 |

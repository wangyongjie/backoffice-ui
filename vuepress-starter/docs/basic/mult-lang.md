## MultLang 多语言配置

经常用在新增表单数据的弹窗内，可配置不同语言的内容。

### 基本用法

可添加，删除不同语言的配置

:::demo 

```html
<template>
  <bo-mult-lang
    v-model="value"
    :langs="multLang.langs"
    :form="multLang.form"
    :formItems="multLang.formItems"
  >
  </bo-mult-lang>
</template>

<script>
export default {
  data() {
    return {
      value: {
        en: { title: "test", textarea: "test" },
        br: { title: "test1", textarea: "test1" },
      },
      multLang: {
        langs: [
          { value: "en", label: "English" },
          { value: "br", label: "Brazie" },
          { value: "jp", label: "Japan" },
        ],
        form: {
          model: {
            title: "",
            textarea: "",
          },
          rules: {
            title: [
              {
                required: true,
                message: "Please check the title.",
                trigger: "blur",
              },
            ],
            textarea: [
              {
                required: true,
                message: "Please check the textarea.",
                trigger: "blur",
              },
            ],
          },
        },
        formItems: [
          {
            prop: "title",
            label: "Title",
          },
          {
            prop: "textarea",
            label: "Textarea",
            itemType: "textarea",
            showWordLimit: true,
            rows: 4,
          },
        ],
      },
    };
  },
};
</script>

```
:::

### Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| value / v-model | 绑定值     | Object  | —      | { en: {} } |
| langs           | 所有语言   | Array   | —      | —          |
| form            | 表单配置   | Object  | —      | —          |
| formItems       | 表单项配置 | Array   | —      | —          |
| disabled        | 是否禁用   | boolean | —      | false      |

### Events
无

### Methods
| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
| removeTab | 移除某个语言 | 如en,jp,和参数langs相关 |
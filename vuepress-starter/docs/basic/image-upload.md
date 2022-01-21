## ImageUpload 图片上传

将本地图像上传
### 基本用法

点击图像匡的并选取要上传的图片（有预览功能及删除己上传的图像档案）

:::demo 

```html
<template>
<div>
  <bo-image-upload 
    v-model="image" 
    :disabled="disabled" 
    :onValid="onValid"
  >
  </bo-image-upload>
</div>
</template>
<script>
export default {
  data() {
    return {
      image: {
        src: "",
        file: null
      },
      disabled: false,
      onValid: null
    };
  },
}
</script>

```
:::
### 加上onValid的用法

加上on valid 的方法来确认上传的图像type是正确与否

:::demo 

```html
<template>
<div>
  <bo-image-upload v-model="image" :disabled="disabled" :onValid='onValid'></bo-image-upload>
</div>
</template>
<script>
export default {
  data() {
    return {
      image: {
        src: "",
        file: null
      },
      disabled: false
    };
  },
  methods:{
   onValid(file){
    console.log('file', file)
    if ( file.raw.type === "image/png") {
      console.log('ok')
      return true
    } else {
      console.error('not allow type')
      return false
      }
    }
  }
}
</script>

```
:::
### Input Attributes

| 参数            | 说明       | 类型    | 可选值 | 默认值     |
| --------------- | ---------- | ------- | ------ | ---------- |
| v-model         | 绑定值(可定義src, file)     | object  | —      | —  |
| disabled        | 禁用   | boolean  | true/false      | false         |
| onValid        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 function(file, fileList) 回傳 true 才會上傳圖片, 預設不驗證   | func |     |     |
### Events
无
### Methods
| 方法名    | 说明         | 参数                    |
| --------- | ------------ | ----------------------- |
| onValid | 确认上传的图片是否是正确的type | file |
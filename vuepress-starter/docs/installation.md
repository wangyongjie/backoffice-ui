## 快速上手

该组件库依赖于element-ui，请先安装[element-ui](https://element.eleme.io/#/zh-CN/component/installation)

### NPM

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i backoffice-ui -S
```

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地引入该组件

```js
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'

Vue.use(BackofficeUI)
```

### CDN

目前暂不支持
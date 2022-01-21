## 国际化

组件内部默认使用英文，若希望使用其他语言，则需要进行多语言设置。以中文为例，在 main.js 中：

```javascript
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'
import locale from 'backoffice-ui/BoLocale/lang/zh-CN'

Vue.use(BackofficeUI, { locale })
```


## 兼容其他 i18n 插件
如果不使用 `vue-i18n@5.x`，而是用其他的 i18n 将无法兼容，但是可以自定义 i18n 的处理方法。

```javascript
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'
import enLocale from 'backoffice-ui/BoLocale/lang/en'
import zhLocale from 'backoffice-ui/BoLocale/lang/zh-CN'

Vue.use(BackofficeUI, {
  i18n: function (path, options) {
    // ...
  }
})
```

## 兼容 `vue-i18n@6.x`

默认不支持 6.x 的 `vue-i18n`，你需要手动处理。

```javascript
import Vue from 'vue'
import BackofficeUI from 'backoffice-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'backoffice-ui/BoLocale/lang/en'
import zhLocale from 'backoffice-ui/BoLocale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: {
    message: 'hello',
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: '你好',
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

Vue.use(BackofficeUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({ i18n }).$mount('#app')
```

## 按需加载里定制 i18n

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enLocale from 'backoffice-ui/BoLocale/lang/en'
import zhLocale from 'backoffice-ui/BoLocale/lang/zh-CN'
import BackofficeUILocale from 'backoffice-ui/BoLocale/locale'

Vue.use(VueI18n)

const messages = {
  en: {
    message: 'hello',
    ...enLocale
  },
  zh: {
    message: '你好',
    ...zhLocale
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

BackofficeUILocale.i18n((key, value) => i18n.t(key, value))
```


目前内置了以下语言：
<ul class="language-list">
  <li>简体中文（zh-CN）</li>
  <li>英语（en）</li>
</ul>


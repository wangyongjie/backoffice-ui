import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// install BackofficeUI to use boFilter
import BackofficeUI from '../../backoffice-ui/src/index'
import {
  action
} from '@storybook/addon-actions';


Vue.use(BackofficeUI)
Vue.use(ElementUI)

// mock router: https://github.com/gvaldambrini/storybook-router/blob/master/packages/vue/vue.js
Vue.prototype.$router = {
    replace: ({
      query
    }) => {
      action('$router.replace')(query)
    }
  }
  Vue.prototype.$route = {
    query: {}
  }
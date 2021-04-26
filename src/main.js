import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index';
Vue.use(ElementUI);

import Service from '@/api/Service.js'
//加了就报错 尴尬不- Service.defaults.withCredentials=true
Vue.prototype.$axios=Service

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

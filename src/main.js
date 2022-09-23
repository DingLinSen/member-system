import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
// 引入reset.css
import './style/reset.css'
import './style/common.css'
// 页面鉴权
import './permission'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

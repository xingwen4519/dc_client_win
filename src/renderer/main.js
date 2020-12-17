import Vue from 'vue'
import Axios from './api';
import VueAxios from 'vue-axios';
import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';
import './assets/css/body.scss';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

Vue.use(VueAxios, Axios);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

//引用wantUI
import 'vant/lib/index.css';
import { Popup} from 'vant';
import { Area } from 'vant';
import { DatetimePicker } from 'vant';
import { Picker } from 'vant';

Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Area);
//引用wantUI

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './outlook/mainfont.css'
import axios from "axios";

Vue.use(ElementUI,{size:"mini"});

Vue.prototype.$axios=axios;
axios.defaults.baseURL='/proxy_url'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

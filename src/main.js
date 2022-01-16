import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'

import {postKeyValueRequest} from "@/util/api";
import {postRequest} from "@/util/api";
import {getRequest} from "@/util/api";
import {putRequest} from "@/util/api";
import {deleteRequest} from "@/util/api";
import {initMenu} from "@/util/menus";

Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest

Vue.config.productionTip = false
Vue.use(ElementUI);

//路由前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    if (sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();
    } else {
      console.log(to)
      next("/?redirect=" + to.path);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

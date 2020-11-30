import Vue from "vue";
import App from "./App.vue";

import router from "./router"
import store from "./store"
// 引入公共资源
import "./styles/reset.css"
// 引入element-ui
import './plugins/element.js'
// 引入mockSever
// 里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import "./mock/mockSever"

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    // 应用router
    router,
    store
}).$mount("#app");

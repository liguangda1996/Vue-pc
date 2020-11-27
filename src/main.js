import Vue from "vue";
import App from "./App.vue";

import router from "./router"
// 引入公共资源
import "./styles/reset.css"

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    // 应用router
    router,
}).$mount("#app");

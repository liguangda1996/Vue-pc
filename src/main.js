import Vue from "vue";
import App from "./App.vue";

import router from "./router"
import store from "./store"
// 引入公共资源
import "./styles/reset.css" // 样式重置
import "./styles/iconfont.css" // 字体图标样式
import "swiper/swiper-bundle.css"; // swiper样式
// 引入element-ui
import './plugins/element.js'
// 引入mockSever
// 里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import "./mock/mockSever"

Vue.config.productionTip = false;

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    render: h => h(App),
    // 应用router
    router,
    store
}).$mount("#app");

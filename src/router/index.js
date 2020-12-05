import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "@views/Detail"

// 重写push和replace方法
// 目的：为了让编程式导航重复点击时不报错~
console.log(VueRouter.prototype);
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, onComplete, onAbout) {
    // 如果用户想处理失败，就处理
    if (onComplete && onAbout) {
        return push.call(this, location, onComplete, onAbout);
    }
    // 如果用户不处理失败，给默认值：空函数
    return push.call(this, location, onComplete, () => { });
}

VueRouter.prototype.replace = function (location, onComplete, onAbout) {
    // 如果用户想处理失败，就处理
    if (onComplete && onAbout) {
        return replace.call(this, location, onComplete, onAbout);
    }
    // 如果用户不处理失败，给默认值：空函数
    return replace.call(this, location, onComplete, () => { });
}

// 安装插件
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/login",
            component: Login,
            // 当组件加载显示时，meta中的参数会传到$route中
            // 当组件不加载显示时，meta中的参数不会传
            meta: {
                isFooterHide: true,
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                isFooterHide: true,
            }
        },
        {
            name: "Search",
            // ? 表示params 参数是可选的
            path: "/search/:searchText?",
            component: Search,
        },
        {
            naem: "Detail",
            path: "/detail/:id",
            component: Detail,
        }
    ]
})
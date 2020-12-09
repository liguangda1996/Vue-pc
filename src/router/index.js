import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "@views/Detail";
import AddCartSuccess from "@views/AddCartSuccess";
import ShopCart from "@views/ShopCart";
import Center from "@views/Center";
import Pay from "@views/Pay";
import PaySuccess from "@views/PaySuccess";
import Trade from "@views/Trade"

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

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            name: "login",
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
            name: "Detail",
            path: "/detail/:id",
            component: Detail,
        },
        {
            name: "AddCartSuccess",
            path: "/addcartsuccess",
            component: AddCartSuccess,
        },
        {
            name: "ShopCart",
            path: "/shopcart",
            component: ShopCart
        },
        {
            name: "Center",
            path: "/center",
            component: Center
        },
        {
            name: "Pay",
            path: "/pay",
            component: Pay
        },
        {
            name: "PaySuccess",
            path: "/paysuccess",
            component: PaySuccess
        },
        {
            name: "Trade",
            path: "/trade",
            component: Trade
        },
    ],
    // 每次切换路由页面滚动条位置
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
})

const checkList = ['/trade', '/pay', '/center'];
/**
 * @params to 要去的路由对象
 * @params from 当前的的路由对象
 * @params next 之后要去的路由
 */
router.beforeEach((to, from, next) => {
    if (checkList.indexOf(to.path) > -1 && !store.state.user.token) next({ name: "login" });
    else next();
})

export default router;

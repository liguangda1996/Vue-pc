import {
    reqUpdateCartCheck, reqGetShopCartList, reqUpdateCartCount, reqDelCartProduct
} from "@api/shopcart";

export default {
    state: {
        // 购物车的所有信息
        cartList: [],
    },
    getters: {},
    actions: {
        async getShopCartList({ commit }) {
            const cartList = await reqGetShopCartList();
            commit("GET_SHOPCART_LIST", cartList);
        },
        async updateCartCount({ commit }, { skuId, skuNum }) {
            await reqUpdateCartCount(skuId, skuNum);
            // 1. 手动更新vuex的数据 --> 页面就会重新渲染(改变商品数量之后，更新页面方式一)
            commit("UPDATE_CART_COUNT", { skuId, skuNum })
        },
        async updateCartCheck({ commit }, { skuID, isChecked }) {
            await reqUpdateCartCheck(skuID, isChecked);
            commit("UPDATE_CART_CHECK", { skuID, isChecked })
        },
        async delCartProduct({ commit }, skuId) {
            await reqDelCartProduct(skuId);
            commit("DEL_CART_PRODUCT", skuId);
        },
        /* isAllCheck({ commit }, isAllChecked) {
            commit("IS_ALL_CHECK", isAllChecked)
        } */

    },
    mutations: {
        GET_SHOPCART_LIST(state, cartList) {
            state.cartList = cartList
        },
        UPDATE_CART_COUNT(state, { skuId, skuNum }) {
            state.cartList = state.cartList.map((cart) => {
                if (cart.skuId === skuId) {
                    cart.skuNum += skuNum
                }
                return cart;
            })
        },
        DEL_CART_PRODUCT(state, skuId) {
            state.cartList = state.cartList.filter((cart) => cart.skuId !== skuId)
        },
        UPDATE_CART_CHECK(state, { skuID, isChecked }) {
            state.cartList = state.cartList.map((cart) => {
                if (cart.skuId === skuID) {
                    cart.isChecked = isChecked
                }
                return cart;
            })
        },
        /* IS_ALL_CHECK(state, isAllChecked) {
            state.cartList = state.cartList.forEach((cart) => {
                 cart.isChecked = isAllChecked
            })
        } */
    }
}

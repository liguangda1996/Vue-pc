import request from "@utils/request";

// 获取所有购物车数据
export const reqGetShopCartList = () => {
    return request({
        method: "GET",
        url: "/cart/cartList"
    })
}
// 7.添加到购物车(对已有物品进行数量改动) 
export const reqUpdateCartCount = (skuId, skuNum) => {
    return request({
        method: "POST",
        url: `/cart/addToCart/${skuId}/${skuNum}`,
    })
}
// 切换商品选中状态
export const reqUpdateCartCheck = (skuID, isChecked) => {
    return request({
        method: "GET",
        url: `/cart/checkCart/${skuID}/${isChecked}`
    })
}
// 删除购物车商品
export const reqDelCartProduct = (skuId) => {
    return request({
        method: "DELETE",
        url: `/cart/deleteCart/${skuId}`
    })
}
import request from "@utils/request";

// 获取商品订单信息
export const reqGetTrade = () => {
    return request({
        method: "GET",
        url: "/order/auth/trade"
    })
}

// 提交订单信息
export const reqsubmitOrder = ({ tradeNo, consignee,
    consigneeTel,
    deliveryAddress,
    paymentWay,
    orderComment,
    orderDetailList }) => {
    return request({
        method: "POST",
        url: "/order/auth/submitOrder",
        params: {
            tradeNo
        },
        data: {
            consignee,
            consigneeTel,
            deliveryAddress,
            paymentWay,
            orderComment,
            orderDetailList
        }
    })
}

// 获取订单支付信息
export const reqGetQRcode = (orderId) => {
    return request({
        methods: "GET",
        url: `/payment/weixin/createNative/${orderId}`
    })
}

// 获取订单列表信息
export const reqOrderList = (page, limit) => {
    return request({
        method: "GET",
        url: `/order/auth/${page}/${limit}`
    })
} 
import request from "@utils/request";

export const reqGetProductDetail = (id) => {
    return request({
        method: "GET",
        url:`/item/${id}`
    })
}
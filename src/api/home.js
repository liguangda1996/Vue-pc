import request from "@utils/request";

/**
 * 获取首页三级分类数据（左侧列表导航）
 */
export const reqGetBaseCategoryList = () => {
    return request({
        method: "GET",
        url: "/product/getBaseCategoryList",
    })
}

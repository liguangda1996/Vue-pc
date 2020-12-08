import request from "@utils/request";
import mockRequest from "@utils/mockRequest"
/**
 * 获取首页三级分类数据（左侧列表导航）
 */
export const reqGetBaseCategoryList = () => {
    return request({
        method: "GET",
        url: "/product/getBaseCategoryList",
    })
}

/**
 * 获取首页轮播图数据
 */
export const reqGetBanners = () => {
    return mockRequest({
        method: "GET",
        url: "/banners",
    })
}

/**
 * 获取首页楼层数据
 */
export const reqGetFloors = () => {
    return mockRequest({
        method: "GET",
        url: "/floors"
    })
}

/**
 * 头部退出按钮事件
 */
export const reqExit = () => {
    return request({
        method: "GET",
        url: "/user/passport/logout"
    })
}
import request from "../utils/request";

export const reqLogin = (phone,
    password) => {
    return request({
        method: "POST",
        url: "/user/passport/login",
        data: {
            phone,
            password
        }
    })
}

export const reqRegister = ({ phone, password, code }) => {
    return request({
        method: "POST",
        url: "/user/passport/register",
        data: {
            phone, password, code
        }
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
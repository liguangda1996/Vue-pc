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
/* 
  封装axios拦截器
    1. 设置公共的请求地址前缀
    2. 请求拦截器：添加公共参数
    3. 响应拦截器: 
      成功：返回成功的Promise，值为成功的数据
      失败：返回失败的Promise，值为失败的原因
*/
import axios from "axios";
// 引入进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css"

import { Message } from 'element-ui';

const instance = axios.create({
    // 公共地址
    baseURL: "/api"
})

instance.interceptors.request.use(
    (config) => {
        // 开启进度条
        NProgress.start();
        return config
    }
)


instance.interceptors.response.use(
    (response) => {
        // 关闭进度条
        NProgress.done();
        // 判断响应的code是否是200
        if (response.data.code === 200) {
            // 返回成功的响应数据
            return response.data.data
        }
        const { message } = response.data;
        // 提示错误
        Message.error(message);
        // 功能失败 --> 返回失败的Promise
        return Promise.reject(message);
    },
    // 响应失败：当响应状态码不是 2xx
    (error) => {
        // 关闭进度条
        NProgress.done();
        const message = error.message || "网络错误"
        // 提示错误
        Message.error(message)
        return Promise.reject(message)
    }
);

export default instance;

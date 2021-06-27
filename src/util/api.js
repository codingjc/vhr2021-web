import axios from "axios";
import { Message } from 'element-ui';

// 响应拦截器
axios.interceptors.response.use(success => {
    // 业务错误
    if(success.status && success.status == 200 && success.data.status == 500){
        Message.error({message: success.data.msg})
        return;
    }
    if (success.data.msg) {
        Message.success({message: success.data.msg})
    }
    return success.data;
}, error => {
    if(error.response.status == 504 && error.response.status == 404){
        Message.error({message: '服务器正在开小差'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足'})
    }else if (error.response.status == 401) {
        Message.error({message: '尚未登陆'})
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误'})
        }
    }
    return;
})

let base = '';

// key=value&key1=value1请求格式
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            console.log('data: ' + data)
            let result = '';
            for(let i in data){
                result += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return result;
        }]
    })
}

// json参数请求
export const getRequest = (url, params) => {
    return new axios({
        method: "get",
        url: `${base}${url}`,
        data: params
    })
}

export const postRequest = (url, params) => {
    return new axios({
        method: "post",
        url: `${base}${url}`,
        data: params
    })
}

export const putRequest = (url, params) => {
    return new axios({
        method: "put",
        url: `${base}${url}`,
        data: params
    })
}

export const deleteRequest = (url, params) => {
    return new axios({
        method: "delete",
        url: `${base}${url}`,
        data: params
    })
}
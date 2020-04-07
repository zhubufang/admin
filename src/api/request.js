import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/token'

//http://192.168.31.87:8080
//http://192.168.31.34:8081
//http://47.97.255.55:9999
//http://10.65.165.21:8080
const host = 'http://192.168.31.88:8080'


// 创建axios实例
export const service = axios.create({
    baseURL: host,
    timeout: 5000,
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers['token'] = getToken()
    return config
}, error => {
    Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response) => {
    const res = response.data
    //if(response)
    if (res.code !== 200) {
        Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
        })
        //token失效
        if (res.code == 10001) {
            console.log('10001')
            store.dispatch('user/resetToken').then(res => {
                router.push('/login')
            })
        }
        return Promise.reject(res.msg || 'Error')
    } else {
        return response.data
    }
}, error => { // 这里是返回状态码不为200时候的错误处理
    console.log(error) // for debug
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})
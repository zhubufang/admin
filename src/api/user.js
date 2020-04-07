
import { service } from './request'


// 用户登入
export function login(data) {
    return service({
        url: "/SysUser/login",
        method: "post",
        data:data
    })
}

// 获取用户信息
export function getInfo(token) {
    return service({
        url:'/SysUser/getUserInfo',
        method:'get',  
        params:{
            token:token
        }    
    })
}

// 登出
export function loginOut(token) {
    return service({
        url:'/SysUser/logOut',
        method:'post',
    })
}
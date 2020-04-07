import router from './router'
import store from './store/index'
import { getToken } from './utils/token'



router.beforeEach(async (to, from, next) => {
    //若hasToken不存在并且前往页面不是登陆页面，进入登陆
    //若hasToken存在并且前往登陆页面，进入主页
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            const hasRoles = store.state.user.role
            if (hasRoles) {
                let index = store.getters.allMenu.findIndex(item => {
                    return item.pathname === to.name
                })
                if (index === -1 && to.name !== 'error-page_404' && to.name !== 'error-page_401') {

                    next({
                        name: 'error-page_404'
                    })

                } else {
                    next()
                }
                //next()
            } else {
                try {
                    //获取用户信息
                    const allMenu = await store.dispatch('user/getInfo')
                    let index = allMenu.findIndex(item => {
                        return item.pathname === to.name
                    })
                    if (index === -1 && to.name !== 'error-page_404' && to.name !== 'error-page_401') {
                        //跳转到该角色下的首页
                        if (to.path === '/adminIndex') {
                            next({ name: store.getters.adminIndex })
                        } else {
                            next({
                                name: 'error-page_404'
                            })
                        }
                    } else {
                        next({ ...to, replace: true })
                    }
                } catch (error) {
                    console.log(error)
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                }
            }

        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }

    }
})
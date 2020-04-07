import { getToken, setToken, removeToken } from '@/utils/token'
import { login, getInfo, loginOut } from '@/api/user'
import md5 from 'js-md5'


function toTree(treeData, pid = 0) {
    let res = []
    treeData.map(v => {
        if (v.menuType === 1 && v.isShow) {
            if (v.pid === pid) {
                v.subMenu = toTree(treeData, v.id)
                res.push({
                    name: v.menuName,
                    icon: v.icon,
                    pathname: v.alias,
                    submenu: v.subMenu
                })
            }
        }
    })
    return res
}

const state = {
    token: getToken(),
    user_id: '',
    user_name: '',
    role: '',

    menu: [], //菜单
    allMenu: [], //所有菜单
    rules: [], //规则 接口权限
    adminIndex: '' //系统首页
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, role) => {
        state.role = role
    },
    SET_USERNAME: (state, user_name) => {
        state.user_name = user_name
    },
    SET_USERID: (state, user_id) => {
        state.user_id = user_id
    },
    setMenu(state, data) {
        state.menu = toTree(data)
        //console.log(state.menu)
        data.map(v => {
            if (v.menuType === 1) {
                state.allMenu.push({
                    name: v.menuName,
                    icon: v.icon,
                    pathname: v.alias
                })
            }
        })

        data.map(v => {
            if (v.menuType === 0) {
                state.rules.push({
                    name: v.menuName,
                })
            }
        })

        if (state.menu[0]) {
            if (state.menu[0].pathname) {
                state.adminIndex = state.menu[0].pathname
            } else {
                state.adminIndex = state.menu[0].submenu[0].pathname
            }
        }

    },
};

const actions = {
    // commit相当于context.commit解构赋值context相当于modules的store实例

    //登入
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ loginName: username.trim(), password: md5(password) }).then(res => {
                const { data } = res
                commit('SET_TOKEN', data)
                setToken(data)
                resolve('登入成功')
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(res => {
                console.log(res, '用户信息')
                const { data } = res
                if (!data) {
                    reject('请重新登入')
                }
                const {
                    id,
                    username,
                    roleName,
                } = data.user
                commit('SET_USERNAME', username)
                commit('SET_USERID', id)
                commit('SET_ROLES', roleName)
                commit('setMenu', data.menu)
                resolve(state.allMenu)
            }).catch(error => {
                console.log(error, '获取用户信息错误')
                reject(error)
            })
        })
    },
    //登出
    loginOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            loginOut(state.token).then(res => {
                commit('SET_ROLES', '')
                commit('SET_TOKEN', '')
                removeToken()
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    resetToken({ commit }, state) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', '')
            removeToken()
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}
function toTree(treeData, pid = 0) {
    let res = []
    treeData.map(v => {
        if (v.menuType === 1 && v.isShow) {
            if (v.pid === pid) {
                v.subMenu = toTree(treeData, v.id)
                res.push({
                    name: v.menuName,
                    icon: v.icon,
                    submenu: v.subMenu
                })
            }
        }
    })
    return res
}

const state = {
    menu: [], //菜单
    allMenu: [], //所有菜单
    rules: [], //规则 接口权限
};

const mutations = {
    setMenu(data) {
        state.menu = toTree(data)
        state.allMenu = data.map(v => { v.menuType === 1 })
        state.rules = data.map(v => { v.menuType === 0 })
    },

};

const actions = {
    // commit相当于context.commit解构赋值context相当于modules的store实例

}


export default {
    namespaced: true,
    state,
    mutations
}
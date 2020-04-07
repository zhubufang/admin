//数据转换成树形数据
export function toTree(treeData, pid, level = -1) {
    let res = []
    treeData.map(v => {
        if (v.pid === pid) {
            v.level = level + 1
            v.children = toTree(treeData, v.id, v.level)
            res.push(v)
        }
    })
    return res
}
//树形数据数据转换成list
export function toList(treeData, list = []) {
    treeData.map(v => {
        list.push({
            id: v.id,
            level: v.level,
            menuName: v.menuName,
            pid: v.pid,
            path: v.path,
            alias: v.alias, //路由别名
            icon: v.icon,
            rule: v.rule, //后端规则
            method: v.method, //请求方式
            menuType: v.menuType,
            isShow: v.isShow,
            menuStatus: v.menuStatus
        })
        
        if (v.children && v.children.length) {
            toList(v.children, list)
        }
    })
    return list
}
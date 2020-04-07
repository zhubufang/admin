
//用户数据
export const user_id = state => state.user.user_id
export const token = state => state.user.token
export const user_name = state => state.user.user_name
export const role = state => state.user.role

//菜单开关
export const isCollapse = state => state.app.isCollapse

//菜单
export const menu = state => state.user.menu
export const allMenu = state => state.user.allMenu
export const rules = state => state.user.rules
export const adminIndex = state => state.user.adminIndex

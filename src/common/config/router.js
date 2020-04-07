/**
 * 规则：
 * 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
 * 三、填写后不会自动生成
 * **/
let routes = [
	{
		path:'/',
		name:'layout',
		redirect:{name:'index'},
		component:'layout/index',
		children:[
			{
				meta:{title:'后台首页'},
				component:'index/index'
			}
		]
	},
	{
		path:'/set',
		name:'set',
		meta:{title:'设置'},
		redirect:{name:'set_manager'},
		component:'layout/index',
		children:[{
			meta:{title:'管理员设置'},
			component:'set/manager'
		},{
			meta:{title:'角色设置'},
			component:'set/role'
		},{
			meta:{title:'权限设置'},
			component:'set/authority'
		},{
			meta:{title:'修改密码'},
			component:'resetPassword/index'
		}]
	},
	{
		meta:{title:'401'},
		component:'error-page/401'
	},
	{
		meta:{title:'404'},
		component:'error-page/404'
	},
	{
		meta:{title:'登录页'},
		component:'login/index'
	},
	// {
	// 	path:'*',
	// 	redirect:{name:'error-page_404'},
	// }
]

// 获取路由信息方法
let getRoutes = function(){
	// 自动生成路由
	createRoute(routes)
	return routes
}

// 自动生成路由
function createRoute(arr){
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) return
		// 去除index
		let val = getValue(arr[i].component)
		// 生成name
		arr[i].name = arr[i].name || val.replace(/\//g,'_')
		// 生成path
		arr[i].path = arr[i].path || `/${val}`
		// 自动生成component
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = ()=>componentFun
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}

// 去除index
function getValue(str) {
	// str = login/index
	// 获取最后一个/的索引
	let index = str.lastIndexOf('/')
	// 获取最后一个/后面的值
	let val = str.substring(index+1,str.length)
	// 判断是不是index结尾
	if (val === 'index') {
		return str.substring(index,-1)
	}
	return str
}

export default getRoutes()
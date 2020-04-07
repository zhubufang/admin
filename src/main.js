// 将一些新特性转换成es5写法
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/element-ui.js'
import router from "./router.js"
import store from "./store"
import './permission' // permission control

// 引入拖拽排序
import VueDND from 'awe-dnd'
Vue.use(VueDND)

// 引入md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// 引入阿里图标
import '@/common/iconfont/iconfont.css'
import '@/common/iconfont/iconfont.js'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import { service } from './api/request'
Vue.prototype.$service = service

// 引入全局配置文件
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf

Vue.directive('auth', {
    inserted(el, binding, vnode, oldVnode) {
        console.log(store.getters.rules)
        let rules = store.getters.rules ?store.getters.rules : []
        let v = rules.find(item => item.name === binding.value)
        if (!v) {
            el.parentNode.removeChild(el)
        }
    }

})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
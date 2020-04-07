import Vue from "vue"
import Vuex from "vuex"
import * as getters from './getters'
import app from "./modules/app.js"
import user from "./modules/user.js"
import menu from "./modules/menu.js"
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		app,
		user,
		menu
	},
	getters
})
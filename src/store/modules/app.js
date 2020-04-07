

const state = {
    isCollapse:false
};

const mutations = {
   isOpen() {
        state.isCollapse=!state.isCollapse
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
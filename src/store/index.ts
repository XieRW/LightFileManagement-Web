import Vuex from "vuex"

const store = new Vuex.Store({
    state: {
        userId: '',
        userLoginName: '',
        userName: '',
        token: ''
    },
    mutations: {
        setter(state, val) {
            state = val;
        }
    },
    actions: {
        /* increment({commit}){
           commit("INCREMENT")
         }*/
    }
});

export default store
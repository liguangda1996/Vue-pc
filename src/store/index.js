import Vuex from "vuex";
import Vue from "vue";

import modules from "./modules"

Vue.use(Vuex);

const state = {};

const getters = {};

const actions = {};

const mutations = {};

/* 
  vuex管理的数据：
  {
    testCount: 0, // 总数据
    home: { // 其他模块数据
      categoryList: []
    },
    login: {

    }
  }
*/

const store = new Vuex.Store({
    state, // 总state
    getters, // 总getters
    actions, // 总actions
    mutations, // 总mutations
    modules, // 其他vuex模块的数据

    // modules: {
    //   home: { // home的vuex数据
    //     state: {},
    //     getters: {},
    //     actions: {},
    //     mutations: {}
    //   },
    //   login: { // login的vuex数据
    //     state: {},
    //     getters: {},
    //     actions: {},
    //     mutations: {}
    //   }
    // }
})

export default store;

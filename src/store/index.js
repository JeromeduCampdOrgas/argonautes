import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

const state = {
  argonautes: "",
};

/********* GETTERS ************************/
const getters = {
  /*User*/
  getArgonautes: () => {
    return state.argonautes;
  },
};

/********* MUTATIONS  ********************/
const mutations = {
  /*User*/
  SET_ARGONAUTES: (state, argonaute) => {
    state.argonautes = argonaute;
  },
};

/********* ACTIONS ***********************/
const actions = {
  /*User*/
  getArgonautes: ({ commit }, argonaute) => {
    commit("SET_ARGONAUTES", argonaute);
  },
};

export default new Vuex.Store({
  plugins: [persistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {},
});

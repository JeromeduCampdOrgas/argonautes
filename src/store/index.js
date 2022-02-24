import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

const state = {
  argonautes: "",
  idArgonaute: "",
};

/********* GETTERS ************************/
const getters = {
  /*User*/
  getArgonautes: () => {
    return state.argonautes;
  },
  getIdArgonaute: () => {
    return state.idArgonaute;
  },
};

/********* MUTATIONS  ********************/
const mutations = {
  /*User*/
  SET_ARGONAUTES: (state, argonaute) => {
    state.argonautes = argonaute;
  },
  SET_ID_ARGONAUTE: (state, id) => {
    state.idArgonaute = id;
  },
};

/********* ACTIONS ***********************/
const actions = {
  /*User*/
  getArgonautes: ({ commit }, argonaute) => {
    commit("SET_ARGONAUTES", argonaute);
  },
  getIdArgonauteUpdating: ({ commit }, id) => {
    commit("SET_ID_ARGONAUTE", id);
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

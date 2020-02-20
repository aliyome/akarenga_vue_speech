import Vue from 'vue';
import Vuex from 'vuex';

import { initialState } from './states';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: initialState,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV,
});

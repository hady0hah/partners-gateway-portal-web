import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    statuses: null,
    programLevels: null,
    regions: null,
    countries: null,
    mdfStatuses: null
  },
  getters: {
    appVersion: (state) => {
      return process.env.PACKAGE_VERSION
    },
    StateUser: (state) => state.user,
    StateStatuses: (state) => state.statuses,
    StateProgramLevels: (state) => state.programLevels,
    StateProgramLevel(state) {
      return programLevel_id => state.programLevels.find(programLevel => programLevel.id === programLevel_id)
    },
    StateRegions: (state) => state.regions,
    StateCountries: (state) => state.countries,
    StateMdfStatuses: (state) => state.mdfStatuses
  },
  actions: {
    async StateLogin({commit}, user) {
      await commit('setUser', user)
    },
    async StateLogout({commit}) {
      commit('logout')
    },
    async StateSetStatuses({commit}, statuses) {
      await commit('setStatuses', statuses)
    },
    async StateSetProgramLevels({commit}, programLevels) {
      await commit('setProgramLevels', programLevels)
    },
    async StateSetRegions({commit}, regions) {
      await commit('setRegions', regions)
    },
    async StateSetCountries({commit}, countries) {
      await commit('setCountries', countries)
    },
    async StateSetMdfStatuses({commit}, statuses) {
      await commit('setMdfStatuses', statuses)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = null
    },
    setStatuses (state, statuses) {
      state.statuses = statuses
    },
    setProgramLevels (state, programLevels) {
      state.programLevels = programLevels
    },
    setRegions (state, regions) {
      state.regions = regions
    },
    setCountries (state, countries) {
      state.countries = countries
    },
    setMdfStatuses (state, statuses) {
      state.mdfStatuses = statuses
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

import Vuex from 'vuex'
import Vue from 'vue';
import tableModule from '~/store/tableStore'
import filterModule from '~/store/filterStore'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    tableModule,
    filterModule,
  },
})


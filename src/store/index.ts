import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import menuPermission from './modules/permissionMenus'
import appSetting from './modules/appSetting'
import getters from './getters'

export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  modules: {
    menuPermission,
    appSetting
  },
  getters
});

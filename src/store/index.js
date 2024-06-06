import Vue from "vue";
import Vuex from "vuex";

import assetsModule from "./modules/assets";
import { assetsLocal } from "@/plugins/AssetsPersist.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    assetsModule,
  },

  plugins: [assetsLocal.plugin],
});

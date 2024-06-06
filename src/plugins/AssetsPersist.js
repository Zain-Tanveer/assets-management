import VuexPersistence from "vuex-persist";

/**
 * VuexPersistance object used to persist vuex state in local storage
 *
 * @param {PersistOptions}
 */
export const assetsLocal = new VuexPersistence({
  storage: window.localStorage, // which storage to use

  // restores the saved local storage data in assetModule/assets
  restoreState: (key, storage) => {
    const storedState = JSON.parse(storage.getItem(key));
    return { assetsModule: { ...storedState } } || {};
  },

  // used to only target the assetModule/assets array.
  reducer: (state) => ({
    assets: state.assetsModule.assets,
  }),

  // will only update the local storage if one of these mutations fire
  filter: (mutation) =>
    ["SET_ASSETS", "ADD_ASSET", "UPDATE_ASSET", "DELETE_ASSET"].includes(mutation.type),
});

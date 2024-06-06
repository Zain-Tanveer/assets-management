import { getItemFromLocalStorage } from "@/utils/LocalStorage";
import { SET_ASSETS, ADD_ASSET, UPDATE_ASSET, DELETE_ASSET } from "@/types/mutation-types";

// const assets = [
//   {
//     id: 1,
//     name: "Iphone",
//     image: null,
//     type: "Electronics",
//     location: "123 Street, ABC",
//     status: "Active",
//     description: "A high-end smartphone.",
//     date: "2023-12-15",
//     value: 999,
//   },
//   {
//     id: 2,
//     name: "Samsung Galaxy",
//     image: null,
//     type: "Electronics",
//     location: "456 Avenue, XYZ",
//     status: "Active",
//     description: "A premium Android phone.",
//     date: "2024-01-10",
//     value: 899,
//   },
//   {
//     id: 3,
//     name: "MacBook Pro",
//     image: null,
//     type: "Electronics",
//     location: "789 Boulevard, DEF",
//     status: "Active",
//     description: "A powerful laptop for professionals.",
//     date: "2024-02-05",
//     value: 1999,
//   },
//   {
//     id: 4,
//     name: "Tesla Model S",
//     image: null,
//     type: "Car",
//     location: "321 Lane, GHI",
//     status: "Active",
//     description: "An electric car with autopilot.",
//     date: "2024-03-20",
//     value: 79999,
//   },
//   {
//     id: 5,
//     name: "House in LA",
//     image: null,
//     type: "Real Estate",
//     location: "654 Street, JKL",
//     status: "Active",
//     description: "A beautiful house located in Los Angeles.",
//     date: "2024-04-10",
//     value: 1200000,
//   },
//   {
//     id: 6,
//     name: "Surface Pro",
//     image: null,
//     type: "Electronics",
//     location: "987 Avenue, MNO",
//     status: "InActive",
//     description: "A versatile tablet and laptop hybrid.",
//     date: "2024-05-05",
//     value: 999,
//   },
//   {
//     id: 7,
//     name: "BMW 5 Series",
//     image: null,
//     type: "Car",
//     location: "741 Boulevard, PQR",
//     status: "Active",
//     description: "A luxury sedan with advanced features.",
//     date: "2023-12-20",
//     value: 55999,
//   },
//   {
//     id: 8,
//     name: "Condo in NYC",
//     image: null,
//     type: "Real Estate",
//     location: "852 Lane, STU",
//     status: "Active",
//     description: "A modern condo in New York City.",
//     date: "2024-01-05",
//     value: 950000,
//   },
//   {
//     id: 9,
//     name: "Apple Watch",
//     image: null,
//     type: "Electronics",
//     location: "963 Street, VWX",
//     status: "InActive",
//     description: "A smartwatch with fitness tracking.",
//     date: "2024-02-20",
//     value: 399,
//   },
//   {
//     id: 10,
//     name: "Fitbit",
//     image: null,
//     type: "Electronics",
//     location: "159 Avenue, YZA",
//     status: "Active",
//     description: "A fitness tracker with health monitoring.",
//     date: "2024-03-10",
//     value: 199,
//   },
//   {
//     id: 11,
//     name: "Toyota Camry",
//     image: null,
//     type: "Car",
//     location: "753 Boulevard, BCD",
//     status: "Active",
//     description: "A reliable and fuel-efficient sedan.",
//     date: "2024-04-05",
//     value: 24999,
//   },
//   {
//     id: 12,
//     name: "Vacation Home in Miami",
//     image: null,
//     type: "Real Estate",
//     location: "951 Lane, EFG",
//     status: "Active",
//     description: "A beachfront vacation home in Miami.",
//     date: "2024-05-01",
//     value: 850000,
//   },
//   {
//     id: 13,
//     name: "Sony Bravia TV",
//     image: null,
//     type: "Electronics",
//     location: "357 Street, HIJ",
//     status: "Active",
//     description: "A high-definition smart TV.",
//     date: "2022-06-10",
//     value: 1199,
//   },
//   {
//     id: 14,
//     name: "Audi Q7",
//     image: null,
//     type: "Car",
//     location: "159 Avenue, KLM",
//     status: "Active",
//     description: "A luxury SUV with advanced technology.",
//     date: "2021-07-15",
//     value: 69999,
//   },
//   {
//     id: 15,
//     name: "Cottage in the Countryside",
//     image: null,
//     type: "Real Estate",
//     location: "753 Boulevard, NOP",
//     status: "Active",
//     description: "A cozy cottage in the countryside.",
//     date: "2020-08-01",
//     value: 450000,
//   },
// ];

const state = {
  assets: [],
};

const getters = {
  /**
   * Getter to get all assets from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All assets
   */
  allAssets: (state) => state.assets,

  /**
   * Getter to get all assets from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All assets
   */
  assetById: (state) => (id) => state.assets.find((asset) => asset.id == id),
};

const mutations = {
  /**
   * Mutation to set the data of assets[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [SET_ASSETS]: (state, payload) => {
    state.assets = payload.assets;
  },

  /**
   * Mutation to set the data of assets[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [ADD_ASSET]: (state, payload) => {
    state.assets.push(payload.asset);
  },

  /**
   * Mutation to update the asset of assets[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [UPDATE_ASSET]: (state, payload) => {
    const index = state.assets.findIndex((asset) => asset.id == payload.asset.id);
    if (index !== -1) {
      state.assets.splice(index, 1, payload.asset);
    }
  },
  /**
   * Mutation to delete an asset from assets[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  [DELETE_ASSET]: (state, payload) => {
    const index = state.assets.findIndex((asset) => asset.id == payload.id);
    if (index !== -1) {
      state.assets.splice(index, 1);
    }
  },
};

const actions = {
  /**
   * Action to create a new asset and add it to assets[] array. This action commits a
   * mutation which pushes the new asset in array the array.
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  createAsset({ commit }, payload) {
    const assetId = getNewAssetId();

    payload.asset.id = assetId;

    // Add the new asset the the assets[] array
    commit("ADD_ASSET", { asset: payload.asset });
  },

  /**
   * Action to update an already existing asset in the assets[] array. This action commits a
   * mutation which updates the asset.
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  updateAsset({ commit }, payload) {
    // Updating the assets[] array
    commit("UPDATE_ASSET", { asset: payload.asset });
  },

  /**
   * Action to delete an asset from assets[] array. This action commits a
   * mutation which removes the asset from array.
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  deleteAsset({ commit }, payload) {
    // Deleting the asset from assets[] array
    commit("DELETE_ASSET", { id: payload.id });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

/**
 * Function to get a new asset id.
 * Since we are not using backend to save assets. We have to manually
 * generate a new id.
 *
 * @param {none}
 * @returns {String}
 */
function getNewAssetId() {
  const vuexObj = getItemFromLocalStorage("vuex");
  if (vuexObj) {
    // get all assets from local storage
    let assets = vuexObj.assets;

    // if assets exist then get the last asset, increment it and return its value.
    // otherwise return 1 which will be the starting id.
    if (assets && assets.length) {
      assets = assets.sort((a, b) => a.id - b.id);
      const prevAddedAsset = assets[assets.length - 1].id; // gets the last added post id (user assets are added at the start of the array)
      return prevAddedAsset + 1; // increments and returns it
    } else {
      return 1;
    }
  } else {
    return 1;
  }
}

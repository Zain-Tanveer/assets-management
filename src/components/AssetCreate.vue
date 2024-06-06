<template>
  <main class="assets-main">
    <!-- create asset header -->
    <div class="asset-header">
      <h3>Create a New Asset</h3>
      <!-- go back -->
      <base-button text="Go Back" @click="$router.go(-1)" />
    </div>

    <!-- asset form -->
    <asset-form buttonText="Create" @onAssetFormSubmit="handleFormSubmit" />
  </main>
</template>

<script>
import { mapActions } from "vuex";

import BaseButton from "./BaseButton.vue";
import AssetForm from "./asset-components/AssetForm.vue";

export default {
  name: "AssetCreate",

  components: {
    BaseButton,
    AssetForm,
  },

  methods: {
    ...mapActions(["createAsset"]),

    /**
     * function that handles custom event emitted from AssetForm.vue
     * it calls the createAction action of assets vuex store to add the
     * new asset in assets[] array
     *
     * @param {Object} asset - contains the newly created asset data.
     * @returns {void}
     */
    handleFormSubmit(asset) {
      this.createAsset({ asset });
      alert("Asset created successfully!");
    },
  },
};
</script>

<style scoped>
.assets-main {
  margin-block: 2rem;
}

.asset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

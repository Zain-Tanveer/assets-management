<template>
  <main class="assets-main">
    <!-- edit asset header -->
    <div class="asset-header">
      <h3>Edit Asset</h3>
      <!-- go back -->
      <base-button text="Go Back" @click="$router.go(-1)" />
    </div>

    <!-- asset form -->
    <asset-form
      buttonText="Update"
      :propAsset="assetById(id)"
      @onAssetFormSubmit="handleFormSubmit"
    />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BaseButton from "./BaseButton.vue";
import AssetForm from "./asset-components/AssetForm.vue";

export default {
  name: "AssetEdit",

  props: {
    id: {
      required: true,
    },
  },

  components: {
    BaseButton,
    AssetForm,
  },

  computed: {
    ...mapGetters(["assetById"]),
  },

  methods: {
    ...mapActions(["updateAsset"]),

    /**
     * function that handles custom event emitted from AssetForm.vue
     * it calls the updateAsset action of assets vuex store to update the
     * assets[] array
     *
     * @param {Object} asset - contains the updated asset data.
     * @returns {void}
     */
    handleFormSubmit(asset) {
      this.updateAsset({ asset });
      alert("asset updated successfully!");
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

<template>
  <main class="assets-main">
    <!-- card -->
    <div class="card">
      <div class="asset-info">
        <!-- asset image -->
        <div class="image">
          <img :src="asset.image" alt="Asset Image" />
        </div>
        <!-- asset details -->
        <div class="details">
          <h2>Asset Name: {{ asset.name }}</h2>
          <p><span class="field">Type:</span> {{ asset.type }}</p>
          <p><span class="field">Location:</span> {{ asset.location }}</p>
          <p><span class="field">Description:</span> {{ assetDescription }}</p>
          <p class="value"><span class="field">Value:</span> ${{ asset.value }}</p>
          <p><span class="field">Depreciation Value:</span> {{ assetDepreciation }}</p>
          <p><span class="field">Date:</span>{{ assetDate }}</p>
          <p class="status"><span class="field">Status:</span> {{ assetStatus }}</p>
        </div>

        <div>
          <!-- go back -->
          <base-button text="Go Back" @click="$router.go(-1)" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import BaseButton from "./BaseButton.vue";

export default {
  name: "AssetView",

  components: {
    BaseButton,
  },

  props: {
    id: {
      required: true,
    },
  },

  /**
   * 'created' lifecycle hook used to get the asset by id,
   * the id we get from params and the assetById is a getter from
   * assets vuex store
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    const asset = this.assetById(this.id);
    this.asset = { ...asset };
  },

  data() {
    return {
      asset: {
        id: null,
        name: null,
        image: null,
        type: null,
        location: null,
        status: null,
        description: null,
        date: null,
        value: null,
      },
    };
  },

  computed: {
    ...mapGetters(["assetById"]),

    assetDescription() {
      return this.asset.description ? this.asset.description : "No description available";
    },

    assetDate() {
      return this.asset.date ? this.asset.date : "No date available";
    },

    assetStatus() {
      return this.asset.status ? this.asset.status : "No status available";
    },

    assetDepreciation() {
      return this.asset.date ? this.depreciation : "None";
    },

    /**
     * computed property to calculate depreciation value based on date and asset value.
     * it uses straight line depreciation to calculate total depreciation.
     * the depreciation indicates how much an asset's value is decreased over the course of
     * it's purchase lifetime.
     *
     * @param {none}
     * @returns {Number} - total depreciation value
     */
    depreciation() {
      // minimum value, this is the value an asset will sell for
      // after its useful years have passed
      const salvageValue = 0;
      const purchaseDate = new Date(this.asset.date);
      const currentDate = new Date();

      // Determine useful life based on asset type
      const usefulLifeYearsMap = {
        Electronics: 3,
        Car: 5,
        "Real Estate": 20,
      };

      const usefulLifeYears = usefulLifeYearsMap[this.asset.type] || 5; // Default to 5 years if type not found

      // Calculate the number of days between purchase date and current date
      const daysInUse = Math.floor((currentDate - purchaseDate) / (1000 * 60 * 60 * 24));

      // Calculate annual depreciation, basically how much it reduces in value each year
      const annualDepreciation = (this.asset.value - salvageValue) / usefulLifeYears;

      // Calculate daily depreciation, basically how much it reduces in value each day
      const dailyDepreciation = annualDepreciation / 365;

      // Calculate total depreciation
      // How much it's value has reduced over time
      let totalDepreciation = dailyDepreciation * daysInUse;

      // Ensure the depreciation does not exceed the asset's value
      totalDepreciation = Math.min(totalDepreciation, this.asset.value);

      return totalDepreciation.toFixed(2);
    },
  },
};
</script>

<style scoped>
.assets-main {
  margin-top: 2rem;
}

.card {
  width: 80%;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.asset-info {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.asset-info .image {
  flex: 1;
  margin-right: 20px;
  margin: 20px 0;
}

.asset-info .image img {
  width: 100%;
  border-radius: 10px;
}

.asset-info .details {
  flex: 2;
  margin: 20px 0;
}

.asset-info .details h2 {
  margin-bottom: 20px;
}

.asset-info .details p {
  margin-bottom: 10px;
}

.asset-info .details .field {
  font-weight: bold;
  margin-right: 10px;
}

.asset-info .value {
  font-size: 24px;
  color: #e8491d;
  margin-bottom: 20px;
}

.asset-info .status {
  background: #77aaff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

@media (max-width: 768px) {
  .asset-info {
    flex-direction: column;
  }

  .asset-info .image,
  .asset-info .details {
    flex: 1;
    margin: 0;
  }

  .asset-info .image {
    margin-bottom: 20px;
  }
}
</style>

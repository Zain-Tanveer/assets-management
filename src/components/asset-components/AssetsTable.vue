<template>
  <!-- assets table -->
  <div class="table-container">
    <!-- table -->
    <table class="table" v-if="filteredAssets.length">
      <!-- table header -->
      <thead>
        <tr>
          <!-- th for each heading -->
          <th
            class="sortable"
            v-for="(heading, index) in allHeadings"
            :key="index"
            @click="sortAssets(heading)"
          >
            <!-- if we want to enable sorting -->
            <div class="sortable-wrapper" v-if="sortableHeadings.includes(heading)">
              <!-- heading text -->
              <span class="sortable-heading">{{ heading }}</span>
              <!-- sort arrows -->
              <span class="sort-arrows">
                <i
                  class="fa fa-caret-up arrow-up"
                  :class="{ active: sortDirection === 1 && sortHeading === heading }"
                ></i>
                <i
                  class="fa fa-caret-down arrow-down"
                  :class="{ active: sortDirection === -1 && sortHeading === heading }"
                ></i>
              </span>
            </div>

            <!-- if we don't want to enable sorting -->
            <div v-else>
              {{ heading }}
            </div>
          </th>

          <!-- actions th -->
          <th class="actionsTH">Actions</th>
        </tr>
      </thead>

      <!-- table body -->
      <tbody>
        <!-- tr for each asset in filteredAssets[] -->
        <tr v-for="(asset, index) in filteredAssets" :key="asset.id">
          <!-- td for each heading in headings[] -->
          <td v-for="heading in allHeadings" :key="`${asset.id}-${heading}`">
            <!-- if heading is not image -->
            <span v-if="heading !== 'image'">
              <!-- if heading has some value -->
              <template v-if="asset[heading]">
                {{ asset[heading] }}
              </template>
              <!-- else show none -->
              <template v-else> <span class="text-light">none</span> </template>
            </span>
            <!-- if heading is image then this runs -->
            <img class="asset-image" v-else :src="`${asset[heading]}`" />
          </td>

          <!-- actions icon and dropdown -->
          <td class="actions">
            <div class="dropdown">
              <!-- dropdown icon -->
              <button class="dropdownButton"><i class="fa fa-ellipsis-v dropIcon"></i></button>
              <!-- dropdown -->
              <!-- :class binding makes it so the if there are more than 6 assets
              and the current index is of the last 3 assets then change the 
              positioning of dropdown -->
              <div
                class="dropdown-content"
                :class="{
                  'dropdown-content-bottom':
                    index > filteredAssets.length - 3 && filteredAssets.length > 6,
                }"
              >
                <!-- dropdown item for View Asset -->
                <router-link :to="{ name: 'view', params: { id: asset.id } }" class="viewAsset">
                  <span>View Asset</span><i class="fa fa-eye"> </i>
                </router-link>
                <!-- dropdown item for Edit Asset -->
                <router-link :to="{ name: 'edit', params: { id: asset.id } }" class="editAsset">
                  <span>Edit Asset</span><i class="fa fa-edit"></i>
                </router-link>
                <!-- dropdown item for Delete Asset -->
                <a @click="handleDeleteAsset(asset.id)" class="deleteAsset">
                  <span>Delete Asset</span><i class="fa fa-trash"></i>
                </a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- if no assets are found -->
    <div class="no-assets" v-else>
      <span>No Assets found.</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AssetsTable",

  props: {
    allHeadings: {
      type: Array,
    },
    keyword: {
      type: String,
    },
  },

  created() {
    this.assets = [...this.allAssets];
  },

  data() {
    return {
      assets: [],
      sortableHeadings: [
        "id",
        "name",
        "type",
        "location",
        "status",
        "description",
        "date",
        "value",
      ],
      sortDirection: 1, // default is ascending
      sortHeading: "",
    };
  },

  watch: {
    allAssets(newVal) {
      this.assets = [...newVal];
    },
  },

  computed: {
    ...mapGetters(["allAssets"]),

    /**
     * Computed property to get filtered assets based on keyword.
     *
     * @param {none}
     * @returns {Array} Filtered assets
     */
    filteredAssets() {
      if (this.keyword !== "") {
        return this.assets.filter(
          (asset) =>
            asset.name.trim().toLowerCase().includes(this.keyword.trim().toLowerCase()) ||
            asset.type.trim().toLowerCase().includes(this.keyword.trim().toLowerCase())
        );
      } else {
        return this.assets;
      }
    },
  },

  methods: {
    ...mapActions(["deleteAsset"]),

    /**
     * function that handles click of delete asset in dropdown
     * it calls the deleteAsset action of assets vuex store to remove the
     * clicked asset from assets[] array
     *
     * @param {Object} asset - contains the asset data to be deleted.
     * @returns {void}
     */
    handleDeleteAsset(id) {
      if (confirm("Are you sure you want to delete this asset?")) {
        this.deleteAsset({ id });
      }
    },

    /**
     * function that handles click of heading to sort assets
     * based on the heading clicked
     *
     * @param {String} heading - contains heading that is clicked.
     * @returns {void}
     */
    sortAssets(heading) {
      if (heading !== "image") {
        if (this.sortHeading === heading) {
          this.setSortDirection(); // reverses the sort direction
          this.handleAssetSort(heading); // sorts the assets[] array
        } else {
          this.setSortDirection(1); // if a user clicks on a new heading then reset the sort direction
          this.handleAssetSort(heading); // sorts the assets[] array
        }

        // sets the heading to the user clicked heading
        // used above for setting the direction of newly clicked headings
        this.setSortHeading(heading);
      }
    },

    /**
     * function to set the sortDirection data property
     *
     * @param {String} value - contains the sort direction.
     * @returns {void}
     */
    setSortDirection(value) {
      this.sortDirection = value ? value : -this.sortDirection;
    },

    /**
     * function to set the sortHeading data property
     * used to check if user is clicking the same heading
     *
     * @param {String} value - contains the heading value.
     * @returns {void}
     */
    setSortHeading(value) {
      this.sortHeading = value;
    },

    /**
     * function to sort the assets[] array
     *
     * @param {String} heading - contains the heading value based on which array is sorted.
     * @returns {void}
     */
    handleAssetSort(heading) {
      const sortDirection = this.sortDirection; // get the sort direction i.e., ascending or descending

      this.assets.sort((a, b) => {
        let aValue = a[heading] || "";
        let bValue = b[heading] || "";

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortDirection;
        }
        if (aValue > bValue) {
          return -sortDirection;
        }

        return 0;
      });
    },
  },
};
</script>

<style scoped>
.no-assets {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  position: relative;
  overflow: auto;
  height: 64vh;
  margin-block: 1.25rem;
  background-color: white;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
}

.text-light {
  color: #a0a0a0;
}

.asset-image {
  max-width: 44px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  position: relative;
}

thead {
  position: sticky;
  top: 0;
  z-index: 12;
}

th,
td {
  height: 3.5rem;
  border-bottom: 0.094rem solid #ddd;
  padding: 0 1rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 12.5rem;
}

th {
  background-color: white;
  font-weight: bold;
}

.actionsTH {
  text-align: center;
  position: sticky;
  right: 0;
}

.actions {
  overflow: visible;
  text-align: center;
  position: sticky;
  right: 0;
  z-index: 1;
  background-color: white;
}

tr:hover td.actions {
  z-index: 10;
  background-color: #f1f1f1;
}

.actions .dropdown {
  position: relative;
  display: inline-block;
  border-radius: 1.625em;
  border-bottom-left-radius: 0;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.dropIcon {
  font-size: 1.35rem;
}

.dropdownButton {
  border: none;
  background-color: inherit;
  cursor: pointer;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.625rem;
  border-bottom-left-radius: 0;
  color: var(--clr-primary-300);
}

.dropdown:hover {
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  z-index: 1;
  right: 0.75rem;
}

.dropdown-content-bottom {
  right: 1.125rem;
  bottom: 1.865rem;
}

.dropdownButton-bottom {
  border-bottom-left-radius: 0.625rem;
  border-top-left-radius: 0;
}

.dropdown-bottom {
  border-bottom-left-radius: 0.625rem;
  border-top-left-radius: 0;
}

.dropdown-content a {
  display: flex;
  justify-content: space-between;
  color: black;
  padding: 0.75rem 0.875rem;
  font-size: 0.96rem;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 0.0125rem solid rgb(223, 223, 223);
  transition: background-color 0.15s;
}

.dropdown-content a span {
  padding-right: 1.5rem;
}

.dropdown-content a i {
  color: #222e3c;
}

.dropdown-content a:hover {
  background-color: #f0f0f0;
}

.description {
  max-width: 21rem;
  transition: all 0.3s ease;
}

tr:hover {
  background-color: #f1f1f1;
}

tr:hover td.fixed-column {
  background-color: #f1f1f1;
}

.description:hover {
  white-space: normal;
  text-align: justify;
  padding: 1.25rem;
}

.title:hover {
  max-width: none;
}

.sortable {
  cursor: pointer;
}

.sortable-wrapper {
  display: flex;
  justify-content: space-between;
}

.sortable-heading {
  padding-right: 1rem;
}

.sort-arrows {
  position: relative;
}

.arrow-up,
.arrow-down {
  color: black;
  position: absolute;
  font-size: 1rem;
  opacity: 0.5;
  transition: opacity 0.15s ease;
}

.arrow-up.active,
.arrow-down.active {
  opacity: 1;
}

.arrow-up {
  bottom: 0.4rem;
}
.arrow-down {
  top: 0.4rem;
}

::-webkit-scrollbar {
  width: 0.375rem;
  height: 0.375rem;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 1.875rem;
}

::-webkit-scrollbar-thumb {
  background: #cecece;
  border-radius: 1.875rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

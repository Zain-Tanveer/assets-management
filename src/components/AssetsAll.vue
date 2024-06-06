<template>
  <main class="assets-main">
    <!-- assets toolbar in /assets -->
    <assets-toolbar
      :allHeadings="headings"
      :keyword="keyword"
      @set-keyword="handleSetKeyword"
      @set-heading="handleSetHeading"
    />
    <!-- assets table -->
    <assets-table :allHeadings="filteredHeadings" :keyword="keyword" />
  </main>
</template>

<script>
import Vue from "vue";

import AssetsToolbar from "./asset-components/AssetsToolbar.vue";
import AssetsTable from "./asset-components/AssetsTable.vue";

export default {
  name: "AssetsAll",

  components: {
    AssetsToolbar,
    AssetsTable,
  },

  data() {
    return {
      headings: [
        "id",
        "name",
        "image",
        "type",
        "location",
        "status",
        "description",
        "date",
        "value",
      ],
      keyword: "",
    };
  },

  computed: {
    /**
     * computed property to get filtered headings, used for filter columns.
     * these are passed as props to AssetsTable.vue
     *
     * @param {none}
     * @returns {Array} - filtered headings[] array
     */
    filteredHeadings() {
      return this.headings.filter((heading) => heading !== "");
    },
  },

  methods: {
    /**
     * function to set the heading in headings[] array at a particular index.
     * this function is triggered by 'set-heading' custom event emitted by AssetsToolbar.vue
     *
     * @param {Object} payload - contains additional information
     * @returns {none}
     */
    handleSetHeading(payload) {
      Vue.set(this.headings, payload.index, payload.heading);
    },

    /**
     * function to set the keyword data property.
     * this function is triggered by 'set-keyword' custom
     * event emitted by AssetsToolbar.vue.
     *
     * @param {String} value - contains keyword
     * @returns {none}
     */
    handleSetKeyword(value) {
      this.keyword = value;
    },

    testAscending() {
      // 1 asc , -1 desc
      const strArr = ["Laptop", "Mac", "Apple Watch", "Blackberry"];

      strArr.sort((a, b) => {
        let aVal = a.toLowerCase();
        let bVal = b.toLowerCase();

        if (aVal > bVal) {
          return 1;
        } else if (aVal < bVal) {
          return -1;
        }

        return 0;
      });

      return strArr;
    },
  },
};
</script>

<style scoped>
.assets-main {
  margin-top: 2rem;
}
</style>

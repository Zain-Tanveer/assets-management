<template>
  <!-- toolbar -->
  <div class="toolbar">
    <!-- search bar -->
    <base-input
      id="search"
      type="text"
      label="Search:"
      class="search-bar flex-row"
      placeholder="Enter name, type..."
      v-model="searchKeyword"
    />

    <!-- filter columns and create asset buttons -->
    <div class="buttons">
      <div class="filter-columns">
        <!-- filter columns button -->
        <base-button
          text="Filter Columns"
          :class="{ 'box-shadow': showFilterDropdown }"
          @click="showFilterDropdown = !showFilterDropdown"
        >
          <template #icon> <i class="bx bx-filter-alt"></i> </template>
        </base-button>
        <!-- filter columns dropdown -->
        <div class="filter-dropdown" v-show="showFilterDropdown">
          <div class="dropdown-items">
            <!-- dropdown checkboxes -->
            <base-input
              v-for="(heading, index) in headings"
              :key="heading.name"
              class="dropdown-item flex-row"
            >
              <template #label-left> </template>
              <!-- checkbox -->
              <template #input-field>
                <input
                  type="checkbox"
                  :id="heading.name"
                  :checked="heading.checked"
                  @change="handleFilterChange(heading, index)"
                />
              </template>
              <!-- right label -->
              <template #label-right>
                <label :for="heading.name">
                  {{ heading.name }}
                </label>
              </template>
            </base-input>
          </div>
        </div>
      </div>

      <!-- create asset button -->
      <router-link :to="{ name: 'create' }" tag="div">
        <base-button text="Create Asset">
          <template #icon>
            <i class="bx bx-plus-medical"></i>
          </template>
        </base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: "AssetsToolbar",

  components: {
    BaseButton,
    BaseInput,
  },

  props: {
    allHeadings: {
      type: Array,
    },
    keyword: {
      type: String,
    },
  },

  /**
   * 'created' lifecycle hook used to set the checked
   * values of each heading
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    // get all headings
    const allHeadings = [...this.allHeadings];

    this.headings.forEach((heading, index) => {
      if (allHeadings.includes(heading.name)) {
        this.headings[index].checked = true;
      } else {
        this.headings[index].checked = false;
      }
    });
  },

  data() {
    return {
      headings: [
        { name: "name", checked: null },
        { name: "image", checked: null },
        { name: "type", checked: null },
        { name: "location", checked: null },
        { name: "status", checked: null },
        { name: "description", checked: null },
        { name: "date", checked: null },
        { name: "value", checked: null },
      ],

      showFilterDropdown: false,
    };
  },

  computed: {
    /**
     * A computed property to get and set the value of keyword.
     * Used for two way data binding on an input field whose property is
     * in AssetAll.vue parent component
     *
     * @param {none}
     * @returns {void}
     */
    searchKeyword: {
      get() {
        return this.keyword;
      },
      set(value) {
        this.$emit("set-keyword", value);
      },
    },
  },

  methods: {
    /**
     * function to handle change of checkbox in filter columns dropdown
     *
     * @param {String} heading - the heading that is clicked
     * @param {Number} index - index of the heading item clicked
     * @returns {void}
     */
    handleFilterChange(heading, index) {
      // reverses the checked property
      heading.checked = !heading.checked;

      // emits 'set-heading' custom event, this event is handled in AssetsAll.vue
      // if the heading is checked then pass it the heading name to 'add' the heading
      // else passes empty string to 'remove' the heading
      // index is 'index + 1' since headings[] array in AssetsAll.vue has an 'id' heading
      // as well and we are not allowing user to filter the id column
      if (heading.checked) {
        this.$emit("set-heading", { heading: heading.name, index: index + 1 });
      } else {
        this.$emit("set-heading", { heading: "", index: index + 1 });
      }
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.search-bar {
  flex: 4;
}

.flex-row {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.buttons {
  position: relative;
  display: flex;
  white-space: nowrap;
  gap: 0.5rem;
  flex: 1;
}

input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #4c6a8e;
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.filter-dropdown {
  min-width: 220px;
  width: 100%;
  background-color: #fff;
  position: absolute;
  right: 12rem;
  padding: 0.5rem;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.dropdown-items {
  border: solid 3px #e4e4e4;
}

.dropdown-item {
  border-bottom: solid 1px #e4e4e4;
}

.dropdown-item:hover {
  background-color: #ccc9c9;
}

.dropdown-item label {
  cursor: pointer;
  width: 100%;
  padding: 0.8rem 0.4rem;
  font-weight: bold;
}
</style>

<template>
  <!-- asset form -->
  <form class="form card" @submit.prevent="handleFormSubmit">
    <!-- name input -->
    <base-input
      v-model="asset.name.value"
      :error="asset.name.error"
      label="Name"
      type="text"
      id="name"
      placeholder="Enter asset name..."
    />
    <!-- image input -->
    <base-input label="Image" id="image">
      <template #input-field>
        <div class="image-wrapper">
          <div class="file">
            <input
              ref="fileInput"
              type="file"
              id="image"
              accept="image/*"
              class="input"
              @change="handleImageChange"
            />
            <div class="error">
              {{ asset.image.error }}
            </div>
          </div>
          <!-- to show user which image they have selected -->
          <img class="image" :src="asset.image.value" alt="asset image" />
        </div>
      </template>
    </base-input>

    <!-- asset type input -->
    <base-input
      v-model="asset.type.value"
      :error="asset.type.error"
      label="Type"
      type="text"
      id="type"
      placeholder="Enter asset type..."
    />

    <!-- location input -->
    <base-input
      v-model="asset.location.value"
      :error="asset.location.error"
      label="Location"
      type="text"
      id="location"
      placeholder="Enter a location..."
    />

    <!-- description input -->
    <base-input label="Description" id="description">
      <template #input-field>
        <textarea
          v-model="asset.description.value"
          id="description"
          class="input"
          rows="6"
          placeholder="Enter asset description..."
        ></textarea>
      </template>
    </base-input>

    <div class="form-control-wrapper">
      <!-- asset value input -->
      <base-input
        v-model="asset.assetValue.value"
        :error="asset.assetValue.error"
        type="number"
        label="Value"
        id="value"
        placeholder="Enter a value..."
      />

      <!-- date input -->
      <base-input
        v-model="asset.date.value"
        type="date"
        label="Purchase Date"
        id="purchase-date"
        :max="maxDate"
      />
    </div>

    <!-- status input -->
    <base-input label="Status" id="status">
      <template #input-field>
        <select v-model="asset.status.value" id="status" class="input">
          <option value="" selected disabled>Choose...</option>
          <option value="Active">Active</option>
          <option value="InActive">InActive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </template>
    </base-input>

    <base-button type="submit" :text="buttonText" />
  </form>
</template>

<script>
import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";

export default {
  inheritAttrs: false,
  name: "AssetForm",

  props: {
    buttonText: {
      type: String,
      default: "Submit",
    },

    propAsset: {
      type: Object,
    },
  },

  components: {
    BaseInput,
    BaseButton,
  },

  /**
   * 'created' lifecycle hook used to check if propAsset has been passed as a
   * prop. This helps us determine whether this component is in AssetCreate.vue or AssetEdit.vue.
   * It sets the asset values
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    if (this.propAsset) {
      this.asset.id.value = this.propAsset.id;
      this.asset.name.value = this.propAsset.name;
      this.asset.image.value = this.propAsset.image;
      this.asset.type.value = this.propAsset.type;
      this.asset.location.value = this.propAsset.location;
      this.asset.description.value = this.propAsset.description;
      this.asset.assetValue.value = String(this.propAsset.value);
      this.asset.date.value = this.propAsset.date;
      this.asset.status.value = this.propAsset.status;
    }
  },

  data() {
    return {
      asset: {
        id: {
          value: null,
        },
        name: {
          value: null,
          error: null,
        },
        image: {
          value: null,
          file: null,
          error: null,
        },
        type: {
          value: null,
          error: null,
        },
        location: {
          value: null,
          error: null,
        },
        description: {
          value: null,
        },
        assetValue: {
          value: null,
          error: null,
        },
        date: {
          value: null,
        },
        status: {
          value: "",
        },
      },
    };
  },

  computed: {
    /**
     * computed property to get todays date.
     * used in date input field to ensure that the user
     * cannot enter purchase dates after todays date.
     *
     * @param {none}
     * @returns {String} - todays date value
     */
    maxDate() {
      const today = new Date();

      // Format the date as YYYY-MM-DD
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const maxDate = `${year}-${month}-${day}`;

      return maxDate;
    },
  },

  methods: {
    /**
     * function that handles custom event emitted from AssetForm.vue
     * it calls the updateAsset action of assets vuex store to update the
     * assets[] array
     *
     * @param {none}
     * @returns {void}
     */
    handleFormSubmit() {
      this.setErrors(); // sets the errors

      // checks if any errors exist
      if (this.checkErrors()) {
        return;
      }

      // creating a new asset object
      const asset = {
        id: this.asset.id.value,
        name: this.asset.name.value,
        image: this.asset.image.value,
        type: this.asset.type.value,
        location: this.asset.location.value,
        description: this.asset.description.value,
        value: parseInt(this.asset.assetValue.value),
        date: this.asset.date.value,
        status: this.asset.status.value,
      };

      // emitting a custom event. This is handled in
      // both AssetCreate.vue and AssetEdit.vue
      this.$emit("onAssetFormSubmit", asset);

      // if the propAsset prop is not passed then empty input fields
      // used for when the this form is in AssetEdit.vue
      if (!this.propAsset) {
        this.emptyInputFields();
      }
    },

    /**
     * function to set the errors of input fields
     * it is called in handleFormSubmit
     *
     * @param {none}
     * @returns {void}
     */
    setErrors() {
      // for name
      if (this.asset.name.value === null || this.asset.name.value === "") {
        this.asset.name.error = "Name is required";
      } else if (this.asset.name.value.length < 3) {
        this.asset.name.error = "Name should be at least 3 characters.";
      } else {
        this.asset.name.error = null;
      }

      // for type
      if (this.asset.type.value === null || this.asset.type.value === "") {
        this.asset.type.error = "Type is required";
      } else {
        this.asset.type.error = null;
      }

      // for location
      if (this.asset.location.value === null || this.asset.location.value === "") {
        this.asset.location.error = "Location is required";
      } else {
        this.asset.location.error = null;
      }

      // for assetValue
      if (this.asset.assetValue.value === null || this.asset.assetValue.value === "") {
        this.asset.assetValue.error = "Value is required";
      } else {
        this.asset.assetValue.error = null;
      }
    },

    /**
     * function to check if errors exist
     * it is called in handleFormSubmit after setErrors
     *
     * @param {none}
     * @returns {Boolean} - true if errors exist otherwise false
     */
    checkErrors() {
      let hasError = false;

      if (
        this.asset.name.error ||
        this.asset.type.error ||
        this.asset.location.error ||
        this.asset.assetValue.error
      ) {
        hasError = true;
      }

      return hasError;
    },

    /**
     * function to empty the input fields after successful form submission
     * it is called in handleFormSubmit at the end
     *
     * @param {none}
     * @returns {none}
     */
    emptyInputFields() {
      const data = this.$data.asset; // gets all data from data object

      // loops over each key in data
      // and sets its value to null
      Object.keys(data).forEach((key) => {
        this.asset[key].value = null;
      });

      // needed to set the input type file to null
      this.$refs.fileInput.value = null;
    },

    /**
     * function to handle image change
     * trigged by change event listener on image input field
     *
     * @param {InputEvent} e - event object triggered by the input element
     * @returns {none}
     */
    handleImageChange(e) {
      const files = e.target.files || e.dataTransfer.files; // gets all files
      if (!files.length) return; // if no files exist then return

      const file = files[0]; // gets the first file
      const maxSizeInBytes = 400 * 1024; // 400KB

      // checks if file size is less than 400KB
      if (file.size > maxSizeInBytes) {
        this.asset.image.error = "File size exceeds 400KB. Please select a smaller file.";
        this.asset.image.file = null;
        this.asset.image.value = null;
        this.$refs.fileInput.value = null;
      } else {
        this.asset.image.error = null;

        // creates a new FileReader instance
        const reader = new FileReader();

        // when the file is successfully read, this event is triggered
        reader.onload = (e) => {
          this.asset.image.value = e.target.result;
          this.asset.image.file = file;
        };

        // reads the contents of file
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 2rem;
}

.form-control-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.error {
  font-size: 0.875rem;
  color: #dc3545;
}

.image-wrapper {
  display: flex;
  gap: 2rem;
}

.image-wrapper input {
  height: fit-content;
}

.file {
  width: 100%;
}

.image {
  max-width: 160px;
  width: 100%;
  height: auto;
}
</style>

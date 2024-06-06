<template>
  <div class="form-control">
    <!-- label for when we want the label to be before input field -->
    <!-- defaults to this -->
    <slot name="label-left">
      <label :for="$attrs.id" class="label">{{ label }}</label>
    </slot>

    <!-- input field -->
    <slot name="input-field">
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        class="input"
      />
    </slot>

    <!-- label for when we want the label to be after input field -->
    <slot name="label-right"> </slot>

    <!-- error -->
    <slot name="error">
      <div class="error">
        {{ error }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "BaseInput",

  props: {
    label: { type: String },
    value: { type: String },
    error: { type: String },
  },
};
</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.35rem;
  background-color: hsl(0 0% 100%);
  color: #333;
}

.error {
  font-size: 0.875rem;
  color: #dc3545;
}
</style>

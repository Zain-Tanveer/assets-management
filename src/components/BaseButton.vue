<template>
  <button class="btn" v-on="$listeners" v-bind="$attrs">
    <span>{{ text }}</span>
    <slot name="icon"> </slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "BaseButton",

  props: {
    text: {
      type: String,
      default: "Submit",
    },
  },
};
</script>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: bold;
  padding: 0.625rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  background-color: #222e3c;
  color: white;
  transition: all 0.3s ease;
}

.btn:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>

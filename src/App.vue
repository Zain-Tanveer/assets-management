<template>
  <div>
    <the-header />
    <the-sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  components: {
    TheHeader,
    TheSidebar,
  },
};
</script>

<style>
.container {
  max-width: 75rem;
  width: calc(100% - 1rem);
  margin: 0 auto;
}

.card {
  margin: 0 auto;
  padding: 1rem;
  text-align: start;
  background-color: #fff;
}

.card-title {
  font-weight: bold;
}

.form {
  gap: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.main-content {
  position: relative;
  height: 100%;
  transition: all 0.5s ease;
}

dialog {
  margin: auto;
  padding: 1rem;
  border: none;
  max-width: 40rem;
  width: calc(100% - 1rem);
  color: inherit;
  scroll-behavior: smooth;
  z-index: 100;
}

dialog::backdrop {
  background-color: rgb(0 0 0 / 50%);
}

.sidebar.active ~ .main-content {
  left: 17.5rem;
  width: calc(100% - 17.5rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

[v-cloak] {
  display: none;
}
</style>

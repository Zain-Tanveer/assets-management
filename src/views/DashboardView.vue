<template>
  <div class="main-content" :class="{ 'table-height': isTableView }">
    <h1 class="heading">Dashboard {{ breadcrumbs }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$route.name ? ` > ${this.$route.name}` : "";
    },

    isTableView() {
      return this.$route.name === "assets" ? true : false;
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 1rem;
}

.table-height {
  height: calc(100vh - 60px);
}
</style>

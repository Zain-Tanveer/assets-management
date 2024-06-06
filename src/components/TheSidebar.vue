<template>
  <!-- sidebar  -->
  <div class="sidebar active">
    <div class="top">
      <!-- logo -->
      <div class="logo">
        <span>Assets Management</span>
      </div>
    </div>

    <!-- user info -->
    <div class="user">
      <i class="bx bxs-user-rectangle user-img"></i>
      <div class="user-info">
        <!-- username -->
        <p class="bold" id="sidebar-username">Zain Tanveer</p>
        <!-- user email -->
        <p id="sidebar-user-email">zaintanveer@gmail.com</p>
      </div>
    </div>
    <ul>
      <!-- all links -->
      <li v-for="link in links" :key="link.name">
        <router-link :to="{ name: link.slug }">
          <i class="bx" :class="[link.iconClass]"></i>
          <span class="nav-item">{{ link.name }}</span>
        </router-link>
      </li>

      <!-- logout link -->
      <li>
        <a>
          <i class="bx bx-log-out"></i>
          <span class="nav-item">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",

  data() {
    return {
      links: [
        { name: "Dashboard", slug: "dashboard", iconClass: "bxs-grid-alt" },
        { name: "Assets", slug: "assets", iconClass: "bxs-grid-alt" },
        { name: "Categories", slug: "categories", iconClass: "bx-list-check" },
        { name: "Orders", slug: "orders", iconClass: "bxs-food-menu" },
        { name: "Customers", slug: "customers", iconClass: "bx-body" },
        { name: "Shipping", slug: "shipping", iconClass: "bx-location-plus" },
        { name: "Settings", slug: "settings", iconClass: "bx bx-cog" },
      ],
    };
  },
};
</script>

<style scoped>
.user-img {
  width: 2.5rem;
  font-size: 2.25rem;
  border-radius: 10%;
  margin-left: 0.5rem;
}

.sidebar.active .user-img {
  margin-left: 0;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 5rem;
  background-color: #222e3c;
  color: #adb5bd;
  padding: 0.4rem 0.8rem;
  transition: all 0.5s ease;
}

.sidebar.active .user-info {
  overflow: hidden;
  white-space: nowrap;
}

.sidebar.active {
  width: 17.5rem;
}

.sidebar #sidebar-menu-btn {
  position: absolute;
  color: #fff;
  top: 0.4rem;
  left: 50%;
  font-size: 1.2rem;
  line-height: 3.125rem;
  transform: translateX(-50%);
  cursor: pointer;
}

.sidebar.sidebar.active #sidebar-menu-btn {
  left: 90%;
}

.sidebar .top .logo {
  color: #fff;
  font-weight: bold;
  display: flex;
  height: 3.125rem;
  align-items: center;
  pointer-events: none;
  opacity: 0;
}

.sidebar .top .logo span {
  font-size: 1rem;
}

.sidebar.active .top .logo {
  opacity: 1;
}

.user {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.user p {
  opacity: 1;
  margin-left: 1rem;
}

.bold {
  font-weight: bold;
  color: #e9ecef;
}

.sidebar p {
  opacity: 0;
}

.sidebar.active p {
  opacity: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar ul li {
  position: relative;
  list-style-type: none;
  height: 3.125rem;
  width: 90%;
  margin: 0.8rem auto;
  line-height: 3.125rem;
}

.sidebar ul li a {
  color: #adb5bd;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 0.8rem;
}

.sidebar ul li a:hover {
  background-color: #fff;
  color: #222e3c;
}

.sidebar ul li a i {
  min-width: 3.125rem;
  text-align: center;
  height: 3.125rem;
  border-radius: 0.75rem;
  line-height: 3.125rem;
}

.sidebar .nav-item {
  opacity: 0;
}
.sidebar.active .nav-item {
  opacity: 1;
}

.router-link-exact-active {
  background-color: #fff;
  color: #222e3c !important;
}
</style>

import Vue from "vue";
import VueRouter from "vue-router";

import DashboardView from "@/views/DashboardView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: DashboardView,
      children: [
        {
          path: "",
          name: "dashboard",
          redirect: { name: "assets" },
        },
        {
          path: "assets",
          name: "assets",
          component: () => import("@/components/AssetsAll.vue"),
        },
        {
          path: "assets/create",
          name: "create",
          component: () => import("@/components/AssetCreate.vue"),
        },
        {
          path: "assets/:id",
          name: "view",
          component: () => import("@/components/AssetView.vue"),
          props: true,
        },
        {
          path: "assets/edit/:id",
          name: "edit",
          component: () => import("@/components/AssetEdit.vue"),
          props: true,
        },
        {
          path: "/categories",
          name: "categories",
          component: () => import("@/views/ComingSoonView.vue"),
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("@/views/ComingSoonView.vue"),
        },
        {
          path: "/customers",
          name: "customers",
          component: () => import("@/views/ComingSoonView.vue"),
        },
        {
          path: "/shipping",
          name: "shipping",
          component: () => import("@/views/ComingSoonView.vue"),
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("@/views/ComingSoonView.vue"),
        },
      ],
    },
  ],
});

export default router;

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("./views/Main.vue"),
    },
    {
      path: "/:address",
      name: "DAO Page",
      component: () => import("./views/DAO.vue"),
    },
    {
      path: "/:address/:_id",
      name: "Process",
      component: () => import("./views/Process.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");

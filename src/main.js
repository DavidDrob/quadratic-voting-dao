import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import connect from "./utils/dbConnect";
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

const store = createStore({
  state: {
    count: 0,
    sampleData: [],
  },
  actions: {
    async getAllData({ commit }) {
      let sample_data = (await connect()).functions.getAllWeatherData();
      // change to this to return an array of objects not an object promise
      // let sample_data = await (await connect()).functions.getAllWeatherData();
      commit("GET_ALL_DATA", sample_data);
    },
  },
  mutations: {
    GET_ALL_DATA(state, sample_data) {
      state.sampleData = sample_data;
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

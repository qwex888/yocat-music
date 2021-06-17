import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import Meet from "../pages/Meet/Meet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "meet",
        name: "meet",
        component: Meet
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

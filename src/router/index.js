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
    redirect: "/meet",
    children: [
      {
        path: "meet",
        name: "meet",
        component: Meet
      },
      {
        path: "local",
        name: "local",
        component: () =>
          import(/* webpackChunkName: "Local" */ "@/pages/Local/Local.vue")
      },
      {
        path: "recent",
        name: "recent",
        component: () =>
          import(/* webpackChunkName: "Recent" */ "@/pages/Recent/Recent.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

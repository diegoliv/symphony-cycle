import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router
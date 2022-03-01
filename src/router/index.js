import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Home from "@/components/Home"
import ClientDetails from "@/components/ClientDetails"
import store from '@/store'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "account",
        name: "Account",
        component: ClientDetails
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to) => {
  console.log(!store.state.uid)
  if (
    // make sure the user is authenticated
    !store.state.uid &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router
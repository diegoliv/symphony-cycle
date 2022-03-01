import api from "@/modules/api";
import router from "@/router";

export default {
  loginUser({ state }, credentials) {
    return new Promise((resolve, reject) => {
      api({
        method: "post",
        url: "/customer/login",
        data: credentials,
        redirect: 'follow'
      })
        .then(response => {
          localStorage.setItem("sc_token", response.data.customer.accessToken);
          localStorage.setItem("sc_uid", response.data.customer.id);
          state.user = response.data.customer
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logoutUser({ state }) {
    localStorage.removeItem("sc_token");
    localStorage.removeItem("sc_uid");
    state.user = null;
    router.push({ name: "Login" })
  },

  getUser({ state }) {
    return new Promise((resolve, reject) => {
      const token = state.token;
      const uid = state.uid;

      if (!token) {
        reject("No token found");
      }

      api({
        method: "get",
        url: `/customer/${uid}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          state.user = response.data.customer
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getBuildings({ state }) {
    return new Promise((resolve, reject) => {
      api({
        method: "get",
        url: "/building/all",
        redirect: 'follow'
      })
        .then(response => {
          state.buildings = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
import api from "@/modules/api";
import router from "@/router";

export default {
  loginUser({ commit }, credentials) {
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
          commit('setUser', response.data.customer);
          commit('setToken', response.data.customer.accessToken);
          commit('setUid', response.data.customer.id);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  },
  logoutUser({ commit }) {
    localStorage.removeItem("sc_token");
    localStorage.removeItem("sc_uid");
    commit('setUser', null);
    commit('setToken', null);
    commit('setUid', null);
    router.push({ name: "Login" })
  },

  getUser({ state, commit }) {
    return new Promise((resolve, reject) => {
      const token = state.token;
      const uid = state.uid;

      if (!token) {
        reject("No token found");
      }

      api({
        method: 'get',
        url: `/customer/${uid}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setUser', response.data.customer);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  updateUser({ state, commit }) {
    return new Promise((resolve, reject) => {
      const token = state.token;
      const uid = state.uid;

      if (!token) {
        reject("No token found");
      }

      api({
        method: 'post',
        data: state.user,
        url: `/customer/${uid}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setUser', response.data.customer);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  getBuildings({ state, commit }) {
    return new Promise((resolve, reject) => {
      const token = state.token;

      if (!token) {
        reject("No token found");
      }

      api({
        method: "get",
        url: "/building",
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setBuildings', response.data.building);
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateBuilding({ state, commit }) {
    return new Promise((resolve, reject) => {
      const token = state.token;
      const building = state.currentBuilding;

      if (!token) {
        reject("No token found");
      }

      api({
        method: "post",
        data: building,
        url: `/building/${building.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('refreshBuilding', response.data.building);
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
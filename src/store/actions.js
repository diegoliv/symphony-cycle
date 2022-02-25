import api from "@/modules/api";

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
          state.user = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
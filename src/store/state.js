export default {
  user: null,
  token: localStorage.getItem("sc_token") || null,
  uid: localStorage.getItem("sc_uid") || null,
  buildings: [],
  currentBuilding: null
}
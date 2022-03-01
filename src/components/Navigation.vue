<template>
  <nav class="col-span-2 flex flex-col">
    <router-link to="/dashboard/">Dashboard</router-link>
    <router-link to="/dashboard/account">Client Details</router-link>
    <router-link to="/dashboard/buildings">Building Data</router-link>
    <router-link to="/dashboard/billing">Billing</router-link>
    <router-link to="/dashboard/support">Technical Support</router-link>
    <button @click="logoutUser">Logout</button>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "SideNav",
  methods: {
    ...mapActions(['logoutUser'])
  },
}
</script>
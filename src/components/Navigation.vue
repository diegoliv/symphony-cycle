<template>
  <nav class="symphony-cycle-nav col-span-2 flex flex-col">
    <router-link class="p-2 rounded text-secondary hover:text-blue flex items-center" to="/dashboard/">
      <icon icon="home" size="5" />
      <span class="nav-label ml-2">Dashboard</span>
    </router-link>
    <router-link class="p-2 rounded text-secondary hover:text-blue flex items-center" to="/dashboard/account"> 
      <icon icon="account" size="5" />
      <span class="nav-label ml-2">Client Details</span>
    </router-link>
    <router-link class="p-2 rounded text-secondary hover:text-blue flex items-center" to="/dashboard/buildings"> 
      <icon icon="building" size="5" />
      <span class="nav-label ml-2">Building Data</span>
    </router-link>
    <router-link class="p-2 rounded text-secondary hover:text-blue flex items-center" to="/dashboard/billing">
      <icon icon="billing" size="5" />
      <span class="nav-label ml-2">Billing</span>
    </router-link>
    <router-link class="p-2 rounded text-secondary hover:text-blue flex items-center" to="/dashboard/support"> 
      <icon icon="support" size="5" />
      <span class="nav-label ml-2">Technical Support</span>
    </router-link>
    <button @click="logoutUser">Logout</button>
  </nav>
</template>

<script>
import Icon from '@/components/Icon'
import { mapActions } from 'vuex'

export default {
  name: "SideNav",
  components: {
    Icon
  },
  methods: {
    ...mapActions(['logoutUser'])
  },
}
</script>

<style>
  .symphony-cycle-nav .router-link-exact-active{
    background-color: rgba(35, 42, 63, .05);
  }
</style>
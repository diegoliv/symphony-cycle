<template>
  <div class="login flex flex-col items-center justify-center h-full text-gray-900" v-if="!loading">
    <img src="@/assets/symphony-logo.svg" alt="Symphony">
    <div class="login-box w-full max-w-xs rounded-2xl bg-white shadow p-6 mt-14">
      <h1 class="text-2xl font-medium">Login</h1>
      <form @submit="login">
        <div class="form-input mt-4">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="w-full py-3 px-4 rounded-md border-2 border-gray-200">
        </div>
        <div class="form-input mt-4">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" class="w-full py-3 px-4 rounded-md border-2 border-gray-200">
        </div>
        <div class="form-input mt-8">
          <button type="submit" class="w-full rounded-md bg-green-600 py-3 px-6 text-white">Login</button>
        </div>
      </form>
    </div>
  </div>
  <loading v-if="loading">
    <h2>Loading...</h2>
  </loading>
</template>

<script>
import { mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  name: "UserLogin",
  components: {
    Loading
  },
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    ...mapActions(['loginUser']),
    login(e) {
      e.preventDefault()
      this.loading = true
      this.loginUser({
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.loading = false
        this.$router.push('/dashboard')
      })
    }
  }
}
</script>

<style>

</style>
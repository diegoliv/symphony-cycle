<template>
  <div class="login flex flex-col items-center justify-center min-h-screen text-gray-900" v-if="!loading">
    <img src="@/assets/symphony-logo.svg" alt="Symphony">
    <div class="login-box w-full max-w-xs rounded-2xl bg-white shadow p-6 mt-14">
      <h1 class="text-2xl font-medium">Login</h1>
      <form @submit="login">
        <div class="form-input mt-4">
          <input-field v-model="email" label="Email" />
        </div>
        <div class="form-input mt-4">
          <input-field v-model="password" label="Password" type="password" />
        </div>
        <div class="form-input mt-8">
          <button type="submit" class="w-full rounded-md bg-green py-3 px-6 text-white">Login</button>
        </div>
      </form>
    </div>
  </div>
  <loading v-if="loading">
    <h2>Loading...</h2>
  </loading>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import InputField from '@/components/Library/Input'

export default {
  name: "UserLogin",
  components: {
    Loading,
    InputField
  },
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  computed: {
    ...mapState(['user', 'uid'])
  },
  methods: {
    checkAuth () {
      if (this.user) {
        this.$router.push('/dashboard')
      }
    },
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
    },
    ...mapActions(['loginUser']),
  }
}
</script>
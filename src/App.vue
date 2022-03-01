<template>
  <div id="app" class="bg-light min-h-screen">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.checkAuth()
  },
  computed: {
    ...mapState(['token', 'uid'])
  },
  methods : {
    checkAuth () {
      console.log('this.checkAuth', this.token, this.uid)
      if (this.token && this.uid) {
        this.getUser()
          .then(() => {
            this.$router.push('/dashboard')
          })
      }
    },
    ...mapActions(['getUser'])
  },
}
</script>
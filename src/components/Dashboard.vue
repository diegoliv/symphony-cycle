<template>
  <main class="cycle-dashboard pt-6">
    <icon-library />
    <div class="container max-w-7xl mx-auto">      
      <div class="cycle-dashboard-grid mt-14 grid grid-cols-12 gap-6">
        <navigation></navigation>
        <section class="col-start-4 col-span-6">
          <router-view></router-view>
        </section>
        <aside class="col-span-3"></aside>
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from '@/components/Navigation'
import IconLibrary from '@/components/IconLibrary'

export default {
  name: "UserDashboard",
  components: {
    Navigation,
    IconLibrary
  }
}
</script>
<template>
  <loading v-if="loading" title="Loading user..."></loading>
  <div v-if="!loading">
    <header class="mb-6">
      <h1 class="text-4xl text-blue font-medium mb-4">Building data</h1>
      <p class="font-light text-blue">Lorem ipsum dolor sit amet lorem consectetur sit amet lorem ipsum dolor sit amet lorem consectetur sit amet.</p>
    </header>
    <div class="buildings-list grid gap-3">
      <template v-for="building in buildings" :key="building.id">
        <building-item :building="building"></building-item>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Loading from '@/components/Layout/Loading'
import BuildingItem from '@/components/Buildings/BuildingItem'

export default {
  name: "BuildingsList",
  components: {
    Loading,
    BuildingItem
  },
  data: () => ({
    loading: false
  }),
  mounted() {
    if (!this.buildings.length) {
      this.loading = true
      this.getBuildings()
        .then(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapState([
      'buildings'
    ])
  },
  methods: {
    ...mapActions([
      'getBuildings'
    ])
  }
}
</script>
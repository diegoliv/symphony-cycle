<template>
  <loading v-if="loading" title="Loading user..."></loading>
  <div v-if="!loading">
    <header class="mb-6">
      <h1 class="text-4xl text-blue font-medium mb-4">Building data</h1>
      <p class="font-light text-blue">Lorem ipsum dolor sit amet lorem consectetur sit amet lorem ipsum dolor sit amet lorem consectetur sit amet.</p>
    </header>
    <div class="buildings-list grid gap-3">
      <template v-for="building in buildings" :key="building.id">
        <building-item :building="building" @edit="editBuilding"></building-item>
      </template>
    </div>
  </div>
  <modal-wrapper title="Edit Building" v-if="editing && currentBuilding" @close="closeEditBuilding">
    <h2>Current Building: {{ currentBuilding.id }}</h2>
  </modal-wrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Loading from '@/components/Layout/Loading'
import BuildingItem from '@/components/Buildings/BuildingItem'
import ModalWrapper from '@/components/Layout/ModalWrapper'

export default {
  name: "BuildingsList",
  components: {
    Loading,
    BuildingItem,
    ModalWrapper
  },
  data: () => ({
    loading: false,
    editing: false,
    currentBuilding: null,
  }),
  mounted() {
    if (!this.buildings.length) {
      this.loading = true;
      this.getBuildings()
        .then(() => {
          this.loading = false;
        })
    }
  },
  computed: {
    ...mapState([
      'buildings'
    ])
  },
  methods: {
    editBuilding(id) {
      this.editing = true;
      this.currentBuilding = { ...this.buildings.find(building => building.id === id)};
    },
    closeEditBuilding() {
      this.editing = false;
      this.currentBuilding = null;
    },
    ...mapActions([
      'getBuildings'
    ])
  }
}
</script>
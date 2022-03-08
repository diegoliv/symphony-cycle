<template>
  <loading v-if="loading" title="Loading user..."></loading>
  <div v-if="!loading">
    <header class="mb-6">
      <h1 class="text-4xl text-blue font-medium mb-4">Building data</h1>
      <p class="font-light text-blue">Lorem ipsum dolor sit amet lorem consectetur sit amet lorem ipsum dolor sit amet lorem consectetur sit amet.</p>
    </header>
    <div class="buildings-list grid gap-3">
      <template v-for="building in sortedBuildings" :key="building.id">
        <building-item :building="building" @edit="editBuilding"></building-item>
      </template>
    </div>
  </div>
  <modal-wrapper title="Edit Building" v-if="editing && currentBuilding" @close="closeEditBuilding">
    <template #content>
      <building-edit />
    </template>
    <template #actions>
      <button 
        class="py-3 px-4 ml-2 text-sm leading-3 rounded-md shadow border border-green bg-green text-white whitespace-nowrap" 
        @click="updateCurrentBuilding"
      >
        {{ saving ? 'Saving...' : 'Update Building' }}
      </button>
    </template>
  </modal-wrapper>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import Loading from '@/components/Layout/Loading'
import BuildingItem from '@/components/Buildings/BuildingItem'
import BuildingEdit from '@/components/Buildings/BuildingEdit'
import ModalWrapper from '@/components/Layout/ModalWrapper'

export default {
  name: "BuildingsList",
  components: {
    Loading,
    BuildingItem,
    BuildingEdit,
    ModalWrapper
  },
  data: () => ({
    loading: false,
    editing: false,
    saving: false,
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
    sortedBuildings() {
      if (this.buildings.length) {
        return this.buildings.slice().sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      }

      return this.buildings;
    }, 
    ...mapState([
      'buildings',
      'currentBuilding'
    ])
  },
  methods: {
    editBuilding(id) {
      this.editing = true;
      this.setCurrentBuilding({ ...this.buildings.find(building => building.id === id)});
    },
    closeEditBuilding() {
      this.editing = false;
      this.setCurrentBuilding(null);
    },
    updateCurrentBuilding() {
      this.saving = true;
      this.updateBuilding(this.currentBuilding)
        .then(() => {
          this.saving = false;
          this.closeEditBuilding();
        })
    },
    ...mapActions([
      'getBuildings',
      'updateBuilding',
    ]),
    ...mapMutations([
      'setCurrentBuilding'
    ])
  }
}
</script>
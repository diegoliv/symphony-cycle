<template>
  <div class="flex items-center p-3 pr-5 rounded-xl bg-white shadow">
    <div class="building-icon w-14 h-14 flex items-center justify-center bg-light border border-light-grey rounded-lg">
      <icon icon="location" size="8" />
    </div>
    <div class="building-details ml-6">
      <h3 class="font-medium mb-1">
        {{ building.name }}
      </h3>
      <p class="font-light">
        {{ fullAddress }}
      </p>
      <p class="mt-2 text-sm opacity-50">License: {{ building.id }}</p>
    </div>
    <button 
      class="py-2 px-4 flex items-center ml-auto text-sm leading-3 rounded-md shadow border border-light-grey whitespace-nowrap" 
      @click="$emit('edit', building.id)"
    >
      <icon icon="edit" size="4" />
      <span>
        Edit
      </span>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'BuildingItem',
  components: {
    Icon
  },
  props: {
    building: {
      type: Object,
      required: true
    },
  },
  computed: {
    fullAddress() {
      return `${this.building.address1}, ${this.building.address2}, ${this.building.zip} - ${this.building.city}, ${this.building.country}`
    },
  },
}
</script>
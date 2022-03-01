<template>
  <svg class="icon" :class="sizes">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'IconTag',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '4'
    }
  },
  computed: {
    sizes () {
      return `w-${this.size} h-${this.size}`
    }
  }
}
</script>
<template>
  <header class="mb-6 text-blue">
    <h2 class="font-medium mb-2">{{ title }}</h2>
    <div class="flex items-center justify-between">
      <div class="mr-8">
        <p class="text-sm font-light" v-html="description"></p>
      </div>
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
  },
}
</script>
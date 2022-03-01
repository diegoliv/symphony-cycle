<template>
  <div class="flex items-center justify-center min-h-full min-w-full">
    <div class="flex flex-col items-center justify-center text-center">
      <img src="@/assets/symphony-loading.svg" :alt="title" class="w-12 h-12 mb-4">
      <p class="text-sm" v-html="title"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>

<style>

</style>
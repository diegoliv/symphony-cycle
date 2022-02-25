<template>
  <div class="loading w-full min-h-full flex align-middle justify-center flex-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LoadingState"
}
</script>
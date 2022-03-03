<template>
  <div class="syphony-cicle-modal fixed top-0 left-0 flex items-center p-6 justify-center w-screen h-screen z-20">
    <div class="modal-backdrop absolute top-0 left-0 w-screen h-screen bg-blue opacity-50"></div>
    <div class="modal-body relative z-30 w-full max-w-3xl max-h-full flex flex-col flex-shrink rounded-2xl bg-white shadow-2xl">
      <header class="flex flex-shrink-0 justify-between p-4 border-b border-light-grey">
        <h2 class="text-2xl font-medium">
          {{ title }}
        </h2>
        <button
          class="close-modal"
          @click="$emit('close')"
        >
          <icon icon="close" size="4" />
        </button>
      </header>
      <div class="modal-content flex-grow overflow-y-auto p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'ModalWrapper',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>
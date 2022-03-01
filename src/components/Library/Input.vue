<template>
  <div class="flex flex-col">
    <label :for="id" v-if="label" class="text-secondary mb-2">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full py-2 px-4 rounded-md border border-blue-light bg-white text-blue disabled:bg-light"
    />
  </div>
</template>

<script>
import { uid } from 'uid'

export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    id: function () {
      return uid()
    }
  }
}
</script>
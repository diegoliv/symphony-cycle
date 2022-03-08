<template>
  <div class="flex flex-col">
    <label :for="id" v-if="label" class="text-secondary mb-2">{{ label }}</label>
    <div class="dropdown relative" v-click-outside="closeDropdown">
      <div 
        class="dropdown-toggle flex rounded-md border border-blue-light bg-white text-blue cursor-pointer"
        :class="{ 'bg-light': disabled, 'text-secondary': selectedValue.value === '' }"
        @click="open = !open"
      >
        <input
          :id="id"
          type="text"
          :value="selectedValue.name"
          :placeholder="placeholder"
          :disabled="disabled"
          readonly
          class="w-full py-2 px-4 outline-none cursor-pointer bg-transparent"
        />
        <div
          class="dropdown-icon px-4 py-2 flex items-center justify-center text-blue transform"
          :class="{ 'rotate-180': open }"
        >
          <icon icon="chevron-down" size="4"></icon>
        </div>
      </div>
      <ul 
        class="dropdown-list absolute top-full left-0 w-full max-h-48 overflow-y-auto border rounded-b border-blue-light bg-white shadow"
        :class="{ 'hidden': !open }"
      >
        <li 
          v-for="(option, key) in options" 
          :key="key" 
          @click="select(option)"
          class="py-1 px-4 cursor-pointer text-blue hover:bg-blue-light"
          :class="{ 'bg-blue-light': option.value === selectedValue.value }"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: "DropdownField",
  components: {
    Icon
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data:() => ({
    open: false,
  }),
  computed: {
    selectedValue() {
      if (this.modelValue && this.modelValue !== '' && typeof this.modelValue === 'string') {
        return this.options.find(option => option.value === this.modelValue)
      }
      return { name: this.placeholder, value: '' }
    },
  },
  methods: {
    closeDropdown() {
      this.open = false
    },
    select(option) {
      this.open = false
      this.$emit('update:modelValue', option.value)
    },
  }
}
</script>

<style>

</style>
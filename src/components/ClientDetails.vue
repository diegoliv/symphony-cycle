<template>
  <div>
    <header class="mb-6">
      <h1 class="text-4xl text-blue font-medium mb-4">Client Details</h1>
      <p class="font-light text-blue">Lorem ipsum dolor sit amet lorem consectetur sit amet lorem ipsum dolor sit amet lorem consectetur sit amet.</p>
    </header>
    <section-wrapper>
      <header class="mb-6 text-blue">
        <h2 class="font-medium mb-2">Personal Information</h2>
        <div class="flex items-center justify-between">
          <div class="mr-8">
            <p class="text-sm font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</p>
          </div>
          <button class="py-3 px-4 text-sm rounded-md shadow border border-light whitespace-nowrap" @click="personalDetailsDisabled = !personalDetailsDisabled">Update Details</button>
        </div>
      </header>
      <div class="grid grid-cols-2 gap-8">
        <input-field :disabled="personalDetailsDisabled" v-model="firstName" label="First Name"></input-field>
        <input-field :disabled="personalDetailsDisabled" v-model="lastName" label="Last Name"></input-field>
        <input-field :disabled="personalDetailsDisabled" v-model="email" label="Email" type="email"></input-field>
      </div>
    </section-wrapper>
    <section-wrapper>
      <header class="mb-6 text-blue">
        <h2 class="font-medium mb-2">Company Information</h2>
        <div class="flex items-center justify-between">
          <div class="mr-8">
            <p class="text-sm font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</p>
          </div>
          <button class="py-3 px-4 text-sm rounded-md shadow border border-light whitespace-nowrap" @click="companyDetailsDisabled = !companyDetailsDisabled">Update Details</button>
        </div>
      </header>
      <div class="grid grid-cols-2 gap-8">
        <input-field :disabled="companyDetailsDisabled" label="Company Name"></input-field>
        <input-field :disabled="companyDetailsDisabled" label="Registered Address"></input-field>
      </div>
    </section-wrapper>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SectionWrapper from '@/components/SectionWrapper'
import InputField from '@/components/Library/Input'

export default {
  name: "ClientDetails",
  components: {
    SectionWrapper,
    InputField
  },
  data: () => ({
    personalDetailsDisabled: true,
    companyDetailsDisabled: true
  }),
  computed: {
    firstName: {
      get() {
        return this.user.representative_name.split(' ')[0]
      },
      set(value) {
        this.setFirstName(value)
      }
    },
    lastName: {
      get() {
        return this.user.representative_name.split(' ')[1]
      },
      set(value) {
        this.setLastName(value)
      }
    },
    email: {
      get() {
        return this.user.representative_email
      },
      set(value) {
        this.setEmail(value)
      }
    },
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setFirstName', 'setLastName', 'setEmail']),
  }
}
</script>
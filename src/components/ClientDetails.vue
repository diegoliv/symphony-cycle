<template>
  <loading v-if="loading" title="Loading user..."></loading>
  <div v-if="!loading">
    <header class="mb-6">
      <h1 class="text-4xl text-blue font-medium mb-4">Client Details</h1>
      <p class="font-light text-blue">Lorem ipsum dolor sit amet lorem consectetur sit amet lorem ipsum dolor sit amet lorem consectetur sit amet.</p>
    </header>
    <section-wrapper>
      <section-header
        title="Personal Information"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
      >
        <button 
          class="py-3 px-4 text-sm rounded-md shadow border whitespace-nowrap" 
          :class="personalInfoEditButton.classes" 
          @click="updatePersonalDetails"
        >
          {{ personalInfoEditButton.text }}
        </button>
      </section-header>
      <div class="grid grid-cols-2 gap-8">
        <input-field :disabled="personalDetailsDisabled" v-model="firstName" label="First Name"></input-field>
        <input-field :disabled="personalDetailsDisabled" v-model="lastName" label="Last Name"></input-field>
        <input-field :disabled="personalDetailsDisabled" v-model="email" label="Email" type="email"></input-field>
      </div>
    </section-wrapper>
    <section-wrapper>
      <section-header
        title="Company Information"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
      >
        <button 
          class="py-3 px-4 text-sm rounded-md shadow border whitespace-nowrap" 
          :class="companyInfoEditButton.classes" 
          @click="updateCompanyDetails"
        >
          {{ companyInfoEditButton.text }}
        </button>
      </section-header>
      <div class="grid grid-cols-2 gap-8">
        <div class="col-span-2">
          <input-field :disabled="companyDetailsDisabled" v-model="companyName" label="Company Name"></input-field>
        </div>
        <input-field :disabled="companyDetailsDisabled" v-model="companyAddress1" label="Address 1"></input-field>
        <input-field :disabled="companyDetailsDisabled" v-model="companyAddress2" label="Address 2"></input-field>
      </div>
    </section-wrapper>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import SectionWrapper from '@/components/Layout/SectionWrapper'
import SectionHeader from '@/components/Layout/SectionHeader'
import Loading from '@/components/Layout/Loading'
import InputField from '@/components/Library/Input'

export default {
  name: "ClientDetails",
  components: {
    SectionWrapper,
    SectionHeader,
    Loading,
    InputField
  },
  data: () => ({
    personalDetailsDisabled: true,
    companyDetailsDisabled: true,
    loading: true,
  }),
  mounted () {
    if (!this.user) {
      this.getUser()
        .then(() => {
          this.loading = false
        })
    } else {
      this.loading = false
    }
  },
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
        let surnames = this.user.representative_name.split(' ')
        return surnames.slice(1).join(' ')
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
    companyName: {
      get() {
        return this.user.company
      },
      set(value) {
        this.setCompanyName(value)
      }
    },
    companyAddress1: {
      get() {
        return this.user.address1
      },
      set(value) {
        this.setCompanyAddress1(value)
      }
    },
    companyAddress2: {
      get() {
        return this.user.address2
      },
      set(value) {
        this.setCompanyAddress2(value)
      }
    },
    personalInfoEditButton () {
      if (!this.personalDetailsDisabled) {
        return {
          classes: 'border-light-grey bg-green text-white',
          text: 'Save Details'
        }
      }
      return {
        classes: 'border-light-grey',
        text: 'Update Details'
      }
    },
    companyInfoEditButton () {
      if (!this.companyDetailsDisabled) {
        return {
          classes: 'border-light-grey bg-green text-white',
          text: 'Save Details'
        }
      }
      return {
        classes: 'border-light-grey',
        text: 'Update Details'
      }
    },
    ...mapState(['user'])
  },
  methods: {
    updatePersonalDetails () {
      if (!this.personalDetailsDisabled) {
        this.personalDetailsDisabled = true
        this.updateUser()
      } else {
        this.personalDetailsDisabled = false
      }
    },
    updateCompanyDetails () {
      if (!this.companyDetailsDisabled) {
        this.companyDetailsDisabled = true
        this.updateUser()
      } else {
        this.companyDetailsDisabled = false
      }
    },
    ...mapMutations([
      'setFirstName', 
      'setLastName', 
      'setEmail',
      'setCompanyName',
      'setCompanyAddress1',
      'setCompanyAddress2'
    ]),
    ...mapActions(['getUser', 'updateUser'])
  }
}
</script>
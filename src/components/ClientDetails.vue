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
        <template v-if="personalDetailsDisabled">
          <button 
            class="py-3 px-4 text-sm leading-3 rounded-md shadow border border-light-grey whitespace-nowrap" 
            @click="personalDetailsDisabled = false"
          >
            Update Details
          </button>
        </template>
        <template v-else>
          <button 
            class="py-3 px-4 text-sm leading-3 rounded-md shadow border border-light-grey whitespace-nowrap" 
            @click="personalDetailsDisabled = true"
          >
            Cancel
          </button>
          <button 
            class="py-3 px-4 ml-2 text-sm leading-3 rounded-md shadow border border-green bg-green text-white whitespace-nowrap" 
            @click="updatePersonalDetails"
          >
            {{ savingPersonal ? 'Saving...' : 'Save' }}
          </button>
        </template>
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
        <template v-if="companyDetailsDisabled">
          <button 
            class="py-3 px-4 text-sm leading-3 rounded-md shadow border border-light-grey whitespace-nowrap" 
            @click="companyDetailsDisabled = false"
          >
            Update Details
          </button>
        </template>
        <template v-else>
          <button 
            class="py-3 px-4 text-sm leading-3 rounded-md shadow border border-light-grey whitespace-nowrap" 
            @click="companyDetailsDisabled = true"
          >
            Cancel
          </button>
          <button 
            class="py-3 px-4 ml-2 text-sm leading-3 rounded-md shadow border border-green bg-green text-white whitespace-nowrap" 
            @click="updateCompanyDetails"
          >
            {{ savingCompany ? 'Saving...' : 'Save' }}
          </button>
        </template>
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
    savingPersonal: false,
    savingCompany: false
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
    ...mapState(['user'])
  },
  methods: {
    updatePersonalDetails () {
      this.savingPersonal = true
      this.updateUser()
        .then(() => {
          this.personalDetailsDisabled = true
          this.savingPersonal = false
        })
    },
    updateCompanyDetails () {
      this.savingCompany = true
      this.updateUser()
        .then(() => {
          this.companyDetailsDisabled = true
          this.savingCompany = false
        })
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
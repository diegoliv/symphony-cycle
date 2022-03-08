<template>
  <div>
    <div>
      <header class="mb-4">
        <h3 class="mb-2 font-medium text-blue">Address</h3>
      </header>
      <div class="grid grid-cols-1 gap-8">
        <input-field label="Building Name" v-model="name" />
        <input-field label="Office Address Line 1" v-model="address1" />
        <input-field label="Office Address Line 2" v-model="address2" />
        <div class="w-full grid gap-4 grid-cols-6">
          <div class="col-span-2">
            <input-field label="Postal / Zip Code" v-model="zip" />
          </div>
          <div class="col-span-4">
            <dropdown label="Country" placeholder="Choose a country" v-model="country" :options="countryOptions" />
          </div>
        </div>
        <div class="w-full grid gap-4 grid-cols-6">
          <div class="col-span-2">
            <input-field label="Google Maps Link" v-model="google_maps_link" />
          </div>
          <div class="col-span-4">
            <dropdown label="Currency" placeholder="Choose a currency" v-model="currency" :options="currencyOptions" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <header class="mb-4">
        <h3 class="mb-2 font-medium text-blue">Building Details</h3>
        <p class="text-sm text-secondary font-light">Sed ut per unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
      </header>
      <div class="grid gap-8">
        <input-field label="Building Type" v-model="type" />
        <input-field label="Days of operation per week" v-model="normal_days_operation" />
        <input-field label="Average hours of operation per day" v-model="hours_operation_per_day" />
        <input-field label="Average hours of operation per day" v-model="hours_operation_per_day" />
        <div class="grid gap-4 grid-cols-6">
          <div class="col-span-4">
            <input-field label="Gross Building Area" v-model="gross_building_area" />
          </div>
          <div class="col-span-2">
            <input-field label="Gross building area" v-model="gross_building_area_unit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import InputField from '@/components/Library/Input'
import Dropdown from '@/components/Library/Dropdown'

export default {
  name: "BuildingEdit",
  components: {
    InputField,
    Dropdown
  },
  data: () => ({
    countries: {
      'IE': 'Ireland',
      'UK': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'US': 'USA',
      'AU': 'Australia',
      'KR': 'South Korea',
      'AL': 'Albania',
      'AT': 'Austria',
      'BE': 'Belgium',
      'BG': 'Bulgaria',
      'CH': 'Switzerland',
      'CY': 'Cyprus',
      'CZ': 'Czech Republic',
      'DK': 'Denmark',
      'EE': 'Estonia',
      'ES': 'Spain',
      'FI': 'Finland',
      'GR': 'Greece',
      'HR': 'Croatia',
      'HU': 'Hungary',
      'IT': 'Italy',
      'LI': 'Liechtenstein',
      'LT': 'Lithuania',
      'LU': 'Luxembourg',
      'LV': 'Latvia',
      'MC': 'Monaco',
      'MK': 'North Macedonia',
      'MT': 'Malta',
      'NL': 'Netherlands',
      'NO': 'Norway',
      'PL': 'Poland',
      'PT': 'Portugal',
      'RO': 'Romania',
      'RS': 'Serbia',
      'SE': 'Sweden',
      'SI': 'Slovenia',
      'SK': 'Slovakia',
      'TR': 'Turkey',
    },
    currencies: [
      'EUR',
      'GBP',
      'AUSD',
      'USD'
    ]
  }),
  computed: {
    countryOptions() {
      let options = [];
      for (let key in this.countries) {
        options.push({
          value: key,
          name: this.countries[key]
        })
      }
      return options;
    },
    currencyOptions() {
      return this.currencies.map(currency => {
        return {
          value: currency,
          name: currency
        }
      })
    },
    name: {
      get() {
        return this.currentBuilding.name
      },
      set(val) {
        this.setBuildingProp({prop: 'name', value: val})
      }
    },
    address1: {
      get() {
        return this.currentBuilding.address1
      },
      set(val) {
        this.setBuildingProp({prop: 'address1', value: val})
      }
    },
    address2: {
      get() {
        return this.currentBuilding.address2
      },
      set(val) {
        this.setBuildingProp({prop: 'address2', value: val})
      }
    },
    zip: {
      get() {
        return this.currentBuilding.zip
      },
      set(val) {
        this.setBuildingProp({prop: 'zip', value: val})
      }
    },
    country: {
      get() {
        return this.currentBuilding.country
      },
      set(val) {
        this.setBuildingProp({prop: 'country', value: val})
      }
    },
    google_maps_link: {
      get() {
        return this.currentBuilding.google_maps_link
      },
      set(val) {
        this.setBuildingProp({prop: 'google_maps_link', value: val})
      }
    },
    currency: {
      get() {
        return this.currentBuilding.currency
      },
      set(val) {
        this.setBuildingProp({prop: 'currency', value: val})
      }
    },
    type: {
      get() {
        return this.currentBuilding.type
      },
      set(val) {
        this.setBuildingProp({prop: 'type', value: val})
      }
    },
    normal_days_operation: {
      get() {
        return this.currentBuilding.normal_days_operation
      },
      set(val) {
        this.setBuildingProp({prop: 'normal_days_operation', value: val})
      }
    },
    hours_operation_per_day: {
      get() {
        return this.currentBuilding.hours_operation_per_day
      },
      set(val) {
        this.setBuildingProp({prop: 'hours_operation_per_day', value: val})
      }
    },
    gross_building_area: {
      get() {
        return this.currentBuilding.gross_building_area
      },
      set(val) {
        this.setBuildingProp({prop: 'gross_building_area', value: val})
      }
    },
    gross_building_area_unit: {
      get() {
        return this.currentBuilding.gross_building_area_unit
      },
      set(val) {
        this.setBuildingProp({prop: 'gross_building_area_unit', value: val})
      }
    },
    ...mapState(['currentBuilding'])
  },
  methods: {
    ...mapMutations(['setBuildingProp'])
  }
}
</script>

<style>

</style>
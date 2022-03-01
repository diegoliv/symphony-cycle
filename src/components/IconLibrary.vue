<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <icon-account />
    <icon-billing />
    <icon-building />
    <icon-energy />
    <icon-home />
    <icon-notifications />
    <icon-support />
  </svg>
</template>

<script>
import IconAccount from '@/components/Icons/IconAccount'
import IconBilling from '@/components/Icons/IconBilling'
import IconBuilding from '@/components/Icons/IconBuilding'
import IconEnergy from '@/components/Icons/IconEnergy'
import IconHome from '@/components/Icons/IconHome'
import IconNotifications from '@/components/Icons/IconNotifications'
import IconSupport from '@/components/Icons/IconSupport'

export default {
  name: 'IconLibrary',
  components: {
    IconAccount,
    IconBilling,
    IconBuilding,
    IconEnergy,
    IconHome,
    IconNotifications,
    IconSupport
  },
}
</script>
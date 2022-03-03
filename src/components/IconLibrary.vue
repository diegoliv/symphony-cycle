<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <icon-account />
    <icon-billing />
    <icon-building />
    <icon-close />
    <icon-energy />
    <icon-edit />
    <icon-home />
    <icon-location />
    <icon-notifications />
    <icon-support />
  </svg>
</template>

<script>
import IconAccount from '@/components/Icons/IconAccount'
import IconBilling from '@/components/Icons/IconBilling'
import IconBuilding from '@/components/Icons/IconBuilding'
import IconClose from '@/components/Icons/IconClose'
import IconEnergy from '@/components/Icons/IconEnergy'
import IconEdit from '@/components/Icons/IconEdit'
import IconHome from '@/components/Icons/IconHome'
import IconLocation from '@/components/Icons/IconLocation'
import IconNotifications from '@/components/Icons/IconNotifications'
import IconSupport from '@/components/Icons/IconSupport'

export default {
  name: 'IconLibrary',
  components: {
    IconAccount,
    IconBilling,
    IconBuilding,
    IconClose,
    IconEnergy,
    IconEdit,
    IconHome,
    IconLocation,
    IconNotifications,
    IconSupport
  },
}
</script>
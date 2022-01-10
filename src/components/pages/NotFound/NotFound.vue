<template>
  <BaseCard>
    <h2 class="p-10 text-green-500 text-3xl font-semi-bold">Page not found (</h2>
    <router-link to="/coaches">
      <BaseButton>
        &#10510; Go back
      </BaseButton>
    </router-link>
  </BaseCard>
</template>
<script>
import BaseCard from '@/components/UI/BaseCard'
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton, BaseCard},
}
</script>

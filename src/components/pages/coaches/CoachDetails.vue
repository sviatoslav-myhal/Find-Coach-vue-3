<template>
  <section class="mx-5 sm:mx-14">
    <BaseCard class="text-center gap-8 items-center p-5">
      <div class="text-green-700 font-semibold text-xl">
        <h2>Name: {{ fullName }}</h2>
        <h3>Price: ${{ rate }}/hour</h3>
      </div>
      <router-view></router-view>
      <div class="flex gap-1 sm:gap-5 sm:gap-10 w-2/4 justify-center">
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :text="area"
          class="text-green-500 w-full"
        >
        </BaseBadge>
      </div>
      <p class="font-medium p-5 text-green-700">
        {{ description }}
      </p>
      <BaseButton link :to="contactLink">
        Contact
      </BaseButton>
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard'
import BaseBadge from '@/components/UI/BaseBadge'
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton, BaseBadge, BaseCard},
  props: {
    id: {
      type: String,
      reqiured: true,
    }
  },
  data() {
    return {
      selectedCoach: null,
    }
  },
  created() {
    this.selectedCoach
      = this.$store.getters['coaches/coaches'].find(coach => (
      coach.id === this.id
    ));
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.id + '/contact';
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    }
  },
}
</script>

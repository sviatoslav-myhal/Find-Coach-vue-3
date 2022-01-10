<template>
  <li>
    <div class="flex justify-center items-center mb-5 mx-10">
      <div class=" transition-colors w-full sm:w-screen max-w-xl bg-gray-800 border-0 p-6 rounded-md tracking-wide shadow-lg hover:bg-gray-700">
        <div id="header" class="flex items-center mb-4">
          <div class="leading-6 ml-6">
            <h2 class="text-xl font-semibold text-white">
              {{ fullName }}
            </h2>
            <h3 class="font-semibold text-green-400">
              ${{ coach.hourlyRate }}/hour
            </h3>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-10">
          <BaseBadge
            v-for="area in coach.areas"
            :key="area"
            :text="area"
          >
          </BaseBadge>
        </div>
        <div class="flex flex-col sm:flex-row items-center sm:justify-end gap-1 sm:gap-10 mt-4">
          <BaseButton
            link
            :to="coachContactLink"
          >
            Contact
          </BaseButton >
          <BaseButton
            link
            :to="coachDetailsLink"
          >
            Details
          </BaseButton >
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import BaseBadge from '@/components/UI/BaseBadge'
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton, BaseBadge},
  props: {
    coach: {
      type: Object,
      required: false,
      default() {
        return null;
      }
    }
  },
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.coach.id + '/contact';
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.coach.id;
    }
  }
}
</script>

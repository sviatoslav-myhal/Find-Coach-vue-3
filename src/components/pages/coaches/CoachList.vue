<template>
  <section class="mx-5 sm:mx-14">
    <BaseCard>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
      <div class="flex flex-col sm:flex-row items-center justify-around my-4 gap-5 w-2/3 m-auto">
        <BaseButton @click="loadCoaches">
          Refresh
        </BaseButton>
        <base-button link to="/register" v-if="isVisibleButton">
          Register
        </base-button>
      </div>
      <div class="m-5" v-if="isLoading">
        <ElLoading>
        </ElLoading>
      </div>
      <ul v-else-if="hasCoaches">
        <Coach
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :coach="coach"
        ></Coach>
      </ul>
      <h3 v-else class="text-purple-500 font-semi-bold text-xl">No coaches found</h3>
    </BaseCard>
  </section>
</template>

<script>
import {ElLoading} from 'element-plus'
import Coach from '@/components/coaches/Coach'
import CoachFilter from '@/components/coaches/CoachFilter'
import BaseCard from '@/components/UI/BaseCard'
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {
    ElLoading,
    BaseButton,
    BaseCard,
    Coach,
    CoachFilter,
  },
  data() {
    return {
      filterValue: '',
      isLoading: false,
    }
  },
  computed: {
    filteredCoaches() {
      return !this.filterValue ? this.$store.getters['coaches/coaches'] : this.$store.getters['coaches/coaches'].filter(coach => coach.areas.includes(this.filterValue));
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isAuthorized() {
      return this.$store.getters.isAuthorized;
    },
    isVisibleButton() {
      return this.isAuthorized && !this.isCoach && !this.isLoading;
    },
  },
  methods: {
    setFilters(filterValue) {
      this.filterValue = filterValue;
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');

      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  }
}
</script>

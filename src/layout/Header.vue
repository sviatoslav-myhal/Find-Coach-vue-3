<template>
  <header>
    <nav class="bg-gray-900">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center">
            <div class="flex-shrink-0 font-extrabold text-2xl text-blue-50">
              <router-link to="/coaches">&#8981; Coach Finder</router-link>
            </div>
            <div class="ml-3 sm:ml-10 flex items-baseline space-x-2 sm:space-x-8" >
              <router-link
                to="/coaches"
                class="text-white hover:bg-green-700 px-3 py-3 rounded-md text-sm font-medium"
              >
                Coaches
              </router-link>
              <router-link
                to="/requests"
                class="text-white hover:bg-green-700 px-3 py-3 rounded-md text-sm font-medium"
                v-if="isAuthorized"
              >
                Requests
              </router-link>
              <router-link
                to="/auth"
                class="text-white hover:bg-green-700 px-3 py-3 rounded-md text-sm font-medium"
                v-if="!isAuthorized"
              >
                Login &#10511;
              </router-link>
              <BaseButton
                v-if="isAuthorized"
                @click="logout"
                class="w-1/3"
              >
                Logout &#10510;
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton},
  computed: {
    isAuthorized() {
      return this.$store.getters.isAuthorized;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    }
  }
}
</script>

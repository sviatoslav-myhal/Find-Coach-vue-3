<template>
  <section>
    <BaseCard class="text-center">
      <header>
        <h2 class="p-5 text-green-600 text-lg font-semi-bold">
          Requests received
        </h2>
      </header>
      <div class="m-5" v-if="isLoading">
        <ElLoading>
        </ElLoading>
      </div>
      <ul v-else-if="hasRequests" class="flex flex-col items-center gap-5 w-full">
        <RequestItem
          v-for="request in requests"
          :key="request.id"
          :text="request.message"
          :email="request.email"
          :id="request.id"
        >
        </RequestItem>
      </ul>
      <h3 v-else class="p-5 text-green-600 text-md font-semi-bold">No requests</h3>
    </BaseCard>
  </section>
</template>

<script>
import RequestItem from '@/components/request/RequestItem'
import BaseCard from '@/components/UI/BaseCard'
import {ElLoading} from 'element-plus'
export default {
  components: {
    ElLoading,
    BaseCard,
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests']
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      await this.$store.dispatch('requests/loadRequests');

      this.isLoading = false;
    }
  },
  created() {
    this.loadRequests();
  }
}
</script>

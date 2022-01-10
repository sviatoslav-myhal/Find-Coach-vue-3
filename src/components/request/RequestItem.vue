<template>
  <li class="flex flex-col items-center justify-center py-10 px-24 sm:px-32 m-5 w-3/4 shadow rounded-md">
    <div >
      <a :href="link" class="text-green-600 text-md hover:text-green-300">{{ email }}</a>
      <p class="text-green-400 text-lg font-medium p-2">{{ text }}</p>
      <BaseButton @click="deleteRequest">Delete</BaseButton>
    </div>
  </li>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton},
  props: {
    email: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    }
  },
  computed: {
    link() {
      return 'mailto:' + this.email;
    }
  },
  methods: {
    deleteRequest() {
      this.$store.dispatch('requests/deleteRequest', this.id);
    }
  }
}
</script>

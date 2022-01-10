<template>
  <form
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    @submit.prevent="submitForm"
  >
    <div class="mb-4">
      <label
        class="block text-green-600 text-sm font-bold mb-2"
        for="email"
      >
        Email
      </label>
      <input
        class="shadow appearance-none border-2 border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"
        type="email"
        v-model="email"
        :class="handleStylesErrorEmail"
        @blur="handleValidity('email')"
      />
      <p
        class="text-red-400"
        v-if="errors.email"
      >
        The email is reqiured
      </p>
    </div>
    <div class="mb-4">
      <label
        class="block text-green-600 text-sm font-bold mb-2"
        for="message"
      >
        Message
      </label>
      <textarea
        class="shadow appearance-none border-2 border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message"
        type="text"
        v-model="message"
        :class="handleStylesErrorMessage"
        @blur="handleValidity('message')"
      />
      <p
        class="text-red-400"
        v-if="errors.message"
      >
        The message is reqiured
      </p>
    </div>
    <BaseButton>Send</BaseButton>
  </form>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton},
  data() {
    return {
      email: '',
      message: '',
      errors: {
        email: false,
        message: false,
      }
    };
  },
  computed: {
    handleStylesErrorEmail() {
      return this.errors.email ? 'border-red-500' : '';
    },
    handleStylesErrorMessage() {
      return this.errors.message ? 'border-red-500' : '';
    }
  },
  methods: {
    handleValidity(input) {
      this.errors[input] = false;
    },
    validateForm() {
      if (!this.email || !this.email.includes('@')) {
        this.errors.email = true;
      }
      if (!this.message) {
        this.errors.message = true;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.email || !this.email.includes('@') || !this.message) {
        return;
      }
      const newRequest = {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      };
      this.$store.dispatch('requests/addRequest', newRequest);
      this.$router.push('/coaches');
    }
  }
}
</script>

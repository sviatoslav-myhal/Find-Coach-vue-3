<template>
  <BaseCard>
    <transition name="modal">
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        v-show="!!error"
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Error occurred
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ error }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="handleError"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="flex flex-col gap-3  items-center m-5" v-show="isLoading">
      <ElLoading></ElLoading>
      <p class="text-green-500 font-semibold text-lg">Authenticaticating</p>
    </div>
    <form
      class="bg-white shadow-md rounded px-20 py-12 m-10"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="shadow appearance-none border-2 border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"
          type="email"
          v-model.trim="email"
          @blur="handleValidity('email')"
        />
        <p
          v-if="errors.email"
          class="text-red-500"
        >
          Enter a valid email (email@some.com)
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border-2 border-green-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password"
          type="password"
          v-model.trim="password"
          @blur="handleValidity('password')"
        />
        <p
          v-if="errors.password"
          class="text-red-500"
        >
          Password must be at least 6 characters
        </p>
      </div>
      <div class="flex justify-around gap-10">
        <BaseButton>{{ submitButtonText }}</BaseButton>
        <BaseButton type="button" @click="switchMode">{{ switchModeButtonText }}</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import {ElLoading} from 'element-plus'
import BaseCard from '@/components/UI/BaseCard'
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {
    ElLoading,
    BaseButton,
    BaseCard,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: false,
        password: false
      },
      mode: 'login',
      isLoading: false,
      error: null,
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
      if (this.password.length < 6) {
        this.errors.password = true;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.email || !this.email.includes('@') || this.password.length < 6) {
        return;
      }
      const payloadData = {
        email: this.email,
        password: this.password,
      };
      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', payloadData);
        } else {
          await this.$store.dispatch('signup', payloadData)
        }
      } catch (error) {
        this.error = error.message || 'Failed to authorize, try again later';
      }

      this.isLoading = false;
      this.email = '';
      this.password = '';
      this.errors = {
        email: false,
        password: false,
      }
      if (!this.error) {
        await this.$router.push('/coaches');
      }
    },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },
    handleError() {
      this.error = false;
    }
  },
  computed: {
    submitButtonText() {
      return this.mode === 'login' ? 'Sign in' : 'Sign up'
    },
    switchModeButtonText() {
      return this.mode === 'login' ? 'Switch to Sign up' : 'Switch to Sign in'
    }
  }
}
</script>


<style scoped>
.modal-enter-active {
  animation: modal 0.3s ease-in;
}
.modal-enter-active {
  animation: modal 0.3s ease-out;
}
@keyframes modal {
  from {
    transform: scale(0.8)
  }
  to {
    transform: scale(1.1)
  }
}
</style>

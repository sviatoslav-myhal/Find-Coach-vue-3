<template>
  <div class="w-full max-w-xs m-auto">
    <h2 class="p-3 font-semibold text-green-500 text-xl">
      Register
    </h2>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="firstName"
        >
          First Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName"
          type="text"
          v-model.trim="firstName"
          :class="handleStylesErrorFirstName"
          @blur="handleValidity('firstName')"
        />
        <p
          v-if="errors.firstName"
          class="text-red-400"
        >
          First name is reqiured
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="lastName"
        >
          Last Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName"
          type="text"
          v-model.trim="lastName"
          :class="handleStylesErrorLastName"
          @blur="handleValidity('lastName')"
        />
        <p
          v-if="errors.lastName"
          class="text-red-400"
        >
          Last name is reqiured
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="description"
        >
          Description
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description"
          v-model.trim="description"
          :class="handleStylesErrorDescription"
          @blur="handleValidity('description')"
        />
        <p
          v-if="errors.description"
          class="text-red-400"
        >
          Description is reqiured
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-green-400 text-sm font-bold mb-2"
          for="hourlyRate"
        >
          Hourly Rate
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hourlyRate"
          type="number"
          v-model.number="hourlyRate"
          :class="handleStylesErrorRate"
          @blur="handleValidity('hourlyRate')"
        />
        <p
          v-if="errors.hourlyRate"
          class="text-red-400"
        >
          Hourly rate must be greater than 0
        </p>
      </div>
      <div class="mb-4">
        <h3 class="block text-sm font-bold mb-2 text-purple-400">
          Your Expertise
        </h3>
        <p
          v-if="errors.areas"
          class="text-red-400"
        >
          At least one expertise is reqiured
        </p>
        <div class="flex flex-row gap-3 justify-center">
          <div>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="areas"
              @blur="handleValidity('areas')"
            >
            <label
              class="text-green-400 text-sm font-semibold mb-2 p-1"
              for="frontend"
            >
              Frontend
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="areas"
              @blur="handleValidity('areas')"
            >
            <label
              class="text-green-400 text-sm font-semibold mb-2 p-1"
              for="backend"
            >
              Backend
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="career"
              value="career"
              v-model="areas"
              @blur="handleValidity('areas')"
            >
            <label
              class="text-green-400 text-sm font-semibold mb-2 p-1"
              for="career"
            >
              Career
            </label>
          </div>
        </div>
      </div>
      <h2
        v-if="!isValid"
        class="text-red-400 pb-5"
      >
        All inputs are required
      </h2>
      <div class="flex items-center justify-center">
        <BaseButton>Register</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton'
export default {
  components: {BaseButton},
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: null,
      areas: [],
      errors: {
        firstName: false,
        lastName: false,
        description: false,
        hourlyRate: false,
        areas: false,
      },
      isValid: true,
    }
  },
  computed: {
    handleStylesErrorFirstName() {
      return this.errors.firstName ? 'border-red-500' : '';
    },
    handleStylesErrorLastName() {
      return this.errors.lastName ? 'border-red-500' : '';
    },
    handleStylesErrorDescription() {
      return this.errors.description ? 'border-red-500' : '';
    },
    handleStylesErrorRate() {
      return this.errors.hourlyRate ? 'border-red-500' : '';
    },
  },
  methods: {
    handleValidity(input) {
      this.errors[input] = false;
    },
    validateForm() {
      this.isValid = true;
      if (!this.firstName) {
        this.errors.firstName = true;
        this.isValid = false;
      }
      if (!this.lastName) {
        this.errors.lastName = true;
        this.isValid = false;
      }
      if (!this.description) {
        this.errors.description = true;
        this.isValid = false;
      }
      if (!this.hourlyRate || this.hourlyRate < 0) {
        this.errors.hourlyRate = true;
        this.isValid = false;
      }
      if (!this.areas.length) {
        this.errors.areas = true;
        this.isValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      const newCoach = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        hourlyRate: this.hourlyRate,
        areas: this.areas,
      };
      if (!this.isValid) {
        return;
      }
      this.$store.dispatch('coaches/addCoach', newCoach);
      this.$router.replace('/coaches');
      this.firstName = '';
      this.lastName = '';
      this.description = '';
      this.hourlyRate = null;
      this.areas = [];
      this.errors = {
        firstName: false,
        lastName: false,
        description: false,
        hourlyRate: false,
        areas: false,
      };
    }
  }
}
</script>

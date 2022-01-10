<template>
  <div class="w-1/2 m-auto p-1">
    <label class="block text-center">
      <span class="text-green-700 font-semibold text-lg tracking-widest">Find coach</span>
      <select @change="setFilter" class="form-select block w-full mt-4 text-green-500 bg-grey-600 border-2 rounded-lg border-green-600">
        <option disabled selected>Select coach &#8981;</option>
        <option v-for="option in options" :value="option.value" :key="option.text">{{ option.text }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      value: '',
      options: [
        { text: 'Frontend', value: 'frontend'},
        { text: 'Backend', value: 'backend'},
        { text: 'Career', value: 'career'}
      ]
    }
  },
  methods: {
    setFilter(event) {
      this.value = event.target.value;
      this.$emit('change-filter', this.value)
    }
  }
}
</script>

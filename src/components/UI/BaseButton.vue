<template>
  <button
    v-if="!link"
    class="bg-transparent hover:bg-green-800 active:bg-green-700 text-green-700
    font-semibold hover:text-white py-2 px-4 border-2 hover:border-transparent rounded
    focus:outline-none focus:ring focus:ring-green-300 hover:shadow-2xl"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="to"
    class="bg-green-500 hover:shadow-2xl hover:bg-green-700 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 rounded-xl text-white font-bold py-2 px-4 rounded w-24 text-center"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    }
  }
}
</script>

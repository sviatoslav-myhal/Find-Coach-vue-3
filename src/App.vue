<template>
  <Header></Header>
  <router-view v-slot="slot">
    <transition name="pages">
      <component :is="slot.Component">
      </component>
    </transition>
  </router-view>
</template>

<script>
import Header from '@/layout/Header'
export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('checkIsLogin');
  },
  computed: {
    isAutoLogout() {
      return this.$store.getters.isAutoLogout;
    }
  },
  watch: {
    isAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/');
      }
    }
  },
}
</script>

<style>
.pages-enter-active {
  animation: pages 0.3s ease-in;
}
.pages-enter-active {
  animation: pages 0.3s ease-out;
}
@keyframes pages {
  0% {
    opacity: 0
  }
  50% {
    opacity: 0.2
  }
  75% {
    opacity: 0.7
  }
  100% {
    opacity: 1
  }
}
</style>

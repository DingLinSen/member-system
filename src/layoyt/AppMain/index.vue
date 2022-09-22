<template>
  <div>
    <AppLink v-if="controllLink"></AppLink>
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from './link'
export default {
  computed: {
    controllLink() {
      return !(this.$route.path === '/index')
    },
  },
  components: {
    AppLink,
  },
}
</script>

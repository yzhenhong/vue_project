<template>
  <div class="vuex">
    vuex
  </div>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from "vuex"
const {  mapState, mapActions } = createNamespacedHelpers("user")

export default {
  name: 'state',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'userid'
    ]),
  },
   methods: {
    ...mapActions([
      'setUserId'
    ])
  },
  created () {
    // this.$store.dispatch('user/setUserId', 1154545)
    this.setUserId(123455)
    console.log(this.$store)
  }
}
</script>

<style lang="less" scoped>
</style>

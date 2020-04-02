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
      'phone'
    ]),
  },
   methods: {
    ...mapActions([
      'setPhone'
    ])
  },
  created () {
    this.setPhone()
    console.log(this,this.$store)
  }
}
</script>

<style lang="less" scoped>
  .hello{
    font-size: 24px;
  }
</style>

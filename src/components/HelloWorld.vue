<template>
  <div class="hello">
    hello
  </div>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from "vuex"
const {  mapState, mapActions } = createNamespacedHelpers("user")

export default {
  name: 'HelloWorld',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hello{
    font-size: 24px;
  }
</style>

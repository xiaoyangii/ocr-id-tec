<template>
  <div class="concernCard" v-if="item"></div>
</template>

<script>
export default {
  name: 'concernCard',
  components: {},
  data () {
    return {}
  },
  computed: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  created () {},
}
</script>
<style scoped lang='less'>

</style>

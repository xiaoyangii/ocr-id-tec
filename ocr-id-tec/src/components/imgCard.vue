<template>
  <div class="list_item" v-if="item">
    <img :src="item.img" alt="">
    <div class="list_item_title" v-html="item.title"></div>
  </div>
</template>

<script>
export default {
  name: 'imgCard',
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
}
</script>
<style scoped lang='less'>
.list_item {
  display: inline-block;
  break-inside: avoid;
  width: 288px;
  border: 1px solid #000;
  background: #F9F9F9;
  cursor: pointer;
  text-align: center;
  &_title {
    color: #9B9595;
    font-size: 18px;
    margin: 5px 0;
  }
}
</style>

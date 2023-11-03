<template>
  <div class="list_item" v-if="item">
    <img :src="item.picture" alt="">
    <div class="list_item_title" v-html="item.pictureName"></div>
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
  .px2vw(width, 289);
  border: 0.1vw solid #000;
  background: #F9F9F9;
  cursor: pointer;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &_title {
    color: #9B9595;
    .px2font(18);
    margin: 5px 0;
    .px2vh(margin-top, 5);
    .px2vh(margin-bottom, 5);
  }
}
</style>

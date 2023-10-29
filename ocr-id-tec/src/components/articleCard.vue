<template>
  <div class="list_item" v-if="item" @click="$router.push(`/home/retrievalengine/bibliography/${item.id}`)">
    <div class="list_item_title" v-html="item.title"></div>
    <div class="list_item_info">
      <div class="list_item_info_author" v-html="item.author"></div>
      <div class="list_item_info_name" v-html="item.name"></div>
      <div class="list_item_info_date">年份： {{ item.date }}</div>
    </div>
    <div class="list_item_des" v-html="item.details"></div>
  </div>
</template>

<script>
export default {
  name: 'articleCard',
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
  .px2vh(height, 205);
  .px2vw(width, 834);
  .px2vw(border-radius, 10);
  margin: 0 auto;
  .px2vh(margin-bottom, 11);
  background-color: #FAFAFA;
  cursor: pointer;
  &_title {
    .px2vw(margin-left, 30);
    .px2vh(padding-top, 23);
    color: #000;
    .px2font(22);
  }
  &_info {
    .px2vw(padding-left, 10);
    .px2vw(margin-left, 30);  
    .px2vh(margin-top, 11);
    width: 92%;
    .px2vh(height, 28.45);
    div {
      .px2vw(margin-right, 40);
      float: left;
      color: #878686;
      .px2font(16);
    }
  }
  &_des {
    .px2vw(margin-left, 40);
    overflow: hidden;
    .px2vh(margin-top, 7);
    width: 92%;
    .px2vh(height, 75);
    color: #878686;
    .px2font(16);
  }
  ::v-deep .el-icon-document {
    color: #1559DD;
    .px2vh(height, 24);
    .px2vw(width, 22);
    .px2vw(margin-left, 12);
    .px2vw(margin-right, 10);
  }
}
</style>

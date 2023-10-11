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
  width: 830px;
  height: 180px;
  border-radius: 6px;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: #FAFAFA;
  cursor: pointer;
  &_title {
    margin-left: 30px;
    // margin-top: 20px;
    padding-top: 20px;
    color: #000;
    font-size: 22px;
  }
  &_info {
    margin-left: 30px;
    margin-top: 10px;
    padding-left: 10px;
    width: 92%;
    height: 25px;
    div {
      margin-right: 40px;
      float: left;
      color: #878686;
      font-size: 16px;
    }
  }
  &_des {
    margin-left: 40px;
    overflow: hidden;
    margin-top: 5px;
    width: 92%;
    height: 66px;
    color: #878686;
    font-size: 16px;
  }
  .el-icon-document {
    color: #1559DD;
    width: 23px;
    height: 23px;
    margin-left: 5px;
  }
}
</style>

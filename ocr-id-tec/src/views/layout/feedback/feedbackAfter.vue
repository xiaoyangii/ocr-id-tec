<template>
  <div class="left">
    <div class="text1">您的反馈已收到，感谢您的支持！</div>
    <div class="text2">祝您生活愉快！</div>
  </div>
</template>

<script>
export default {
  name: "afterFeedback",
}
</script>
<style scoped lang="less">
.left {
  float: left;
  width: 58%;
  .px2vh(height, 990);
  background: #EBF5FF;
  border-radius: 0;
  margin: 0 auto;
  text-align: center;
}
.text1 {
  .px2vh(margin-top, 360);
  .px2vh(height, 70);
  .px2vh(line-height, 61);
  width: 100%;
  font-family: 'MicrosoftYaHei';
  font-weight: 700;
  .px2font(66);
  /* identical to box height */
  color: #013480;
}
.text2 {
  width: 100%;
  .px2vh(height, 53);
  .px2vh(line-height, 53);
  .px2vh(margin-top, 100);
  font-family: 'MicrosoftYaHei';
  font-weight: 400;
  .px2font(50);
  /* identical to box height */
  color: #013480;
}
.el-form-item__content {
  .px2font(14);
}
</style>

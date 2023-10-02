<template>
  <div class="left">
    <div class="text1">您的反馈已收到，感谢您的支持！</div>
    <div class="text2">祝您生活愉快！</div>
  </div>
</template>

<script>
export default {
  name: "afterFeedback",
  data() {
    return {

    };
  },
  methods: {},
};
</script>
<style scoped>
.left {
  float: left;
  width: 58%;
  height: 878px;
  background: #EBF5FF;
  border-radius: 0px;
  margin: 0px auto;
  text-align: center;
}
.text1 {
  margin-top: 260px;
  height: 70px;
  width: 100%;
  font-family: 'MicrosoftYaHei';
  font-weight: 700;
  font-size: 66px;
  line-height: 61px;
  /* identical to box height */
  color: #013480;
}
.text2 {
  width: 100%;
  height: 53px;
  margin-top: 100px;
  font-family: 'MicrosoftYaHei';
  font-style: normal;
  font-weight: 400;
  font-size: 50px;
  line-height: 53px;
  /* identical to box height */
  color: #013480;
}
</style>

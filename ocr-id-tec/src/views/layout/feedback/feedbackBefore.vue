<template>
  <div class="left">
    <h1 class="title">联系我们</h1>
    <div class="text">
      亲爱的用户，如果你在使用产品的过程中遇到任何困难,<br>
      或者您对产品有更好的建议，请及时和我们联系!
    </div>
    <el-form 
      class="contact-container"
      :model="contactForm"
      label-position="top"
      :rules="contactRules"
      ref="contactForm"
      :hide-required-asterisk="true"
    >
      <el-form-item class="name" label="用户名" prop="userName">
        <el-col :span="24">
          <el-input
            class="name-input"
            type="text"
            v-model="contactForm.userName"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="email" label="邮箱" prop="userEmail">
        <el-col :span="24">
          <el-input
            class="email-input"
            type="text"
            v-model.number="contactForm.userEmail"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="phone" label="电话" prop="userPhone">
        <el-col :span="24">
          <el-input
            class="phone-input"
            type="text"
            v-model.number="contactForm.userPhone"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="message" label="留言" prop="message">
        <el-col :span="24">
          <el-input
            class="message-input"
            type="text"
            v-model.number="contactForm.message"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="send">
        <el-col :span="24">
          <el-button class="send-button" type="primary" @click="doSend"
            >发送
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "beforeFeedback",
  data() {
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    return {
      contactForm: {
        userPhone: "",
        userName: "",
        userEmail: "",
        message: ""
      },
      contactRules: {
        userPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        message: [
          { required: true, message: "请输入留言", trigger: "blur" },
        ],
        userEmail:[
          { required: true, trigger: "blur", validator: checkEmail }
        ]
      }
    };
  },
  //方法集合
  methods: {
    doSend() {

    }
  },
};
</script>
<style scoped lang="less">
.left {
  float: left;
  width: 58%;
  .px2vh(height, 990);
  background: #EBF5FF;
  margin: 0px auto;
  text-align: center;
  .title {
    .px2vh(margin-top, 20);
    .px2vh(margin-bottom, 50);
    text-align: center;
    color: #013480;
    font-family: "MicrosoftYaHei" !important;
    font-style: normal;
    font-weight: 700;
    .px2font(36);
    letter-spacing: 0.08em;
  }
  .text {
    .px2vh(height, 80);
    .px2vw(width, 560);
    margin: 0 auto;
    .px2vh(margin-top, 20);
    .px2vh(margin-bottom, 20);
    font-family: "MicrosoftYaHei";
    .px2font(20);
    .px2vh(line-height, 40);
    /* or 24px */
    // text-align: center;
    letter-spacing: 0.135em;
    color: #053593;
  }
}
::v-deep .el-form {
  display: inline-block
}
::v-deep .el-form-item {
  margin: 0px auto;
  .px2vh(margin-top, 10);
}
::v-deep .el-form-item__label {
  .px2vh(height, 55);
  .px2vh(line-height, 55);
  float: left;
  padding: 0;
  font-family: "MicrosoftYaHei" !important;
  .px2font(20);
  color: #013480;
}
::v-deep .el-input__inner {
  .px2vh(height, 70);
  .px2vw(width, 433);
  background-color: #EBF5FF !important;
  border: 0.1vw solid #013480;
  border-radius: 4vw;
}
::v-deep .el-button {
  .px2vh(margin-top, 30);
  .px2vh(height, 80);
  .px2vw(width, 200) !important;
  background: #013480;
  border-radius: 4vw;
  .px2font(28);
  font-weight: 600;
  letter-spacing: 0.08em;
}
::v-deep .el-form-item__error {
  .px2vw(left, 290);
}
.el-form-item__content {
  .px2font(14);
}
</style>

<template>
  <div>
    <el-form 
      class="revise-container"
      :model="registerForm"
      label-position="top"
      :rules="reviseRules"
      ref="registerForm"
      :hide-required-asterisk="true"
    >
      <h1 class="title">忘记密码</h1>
      <el-form-item class="account" label="手机号" prop="userId">
        <el-col :span="24">
          <el-input
            class="account-input"
            type="text"
            v-model.number="registerForm.userId"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="code" label="验证码" prop="userCode">
        <el-col :span="24">
          <el-input
            class="code-input"
            type="text"
            v-model="registerForm.userCode"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-button
          @click.native.prevent="bindforgetSendCode"
          class="bind_code_gain"
          :disabled="disabled"
          >{{ second === totalSecond ? '获取验证码' : second + '秒后重新发送'}}</el-button
        >
      </el-form-item>
      <el-form-item class="password" label="重置密码" prop="userPassword">
        <el-col :span="24">
          <el-input
            class="password-input"
            type="password"
            v-model.number="registerForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="revise">
        <el-button class="revise-button" type="primary" @click="doRegister" style="width: 100%;"
          >完成</el-button
        >
      </el-form-item>
      <el-row style="text-align: center;margin-top: -10px;">
        <el-link type="primary" @click="toLogin" class="goLogin"
          >已有账号？点击此处登录
        </el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "forgetPassword",
  data() {
    return {
      registerForm: {
        userId: "",
        userCode: "",
        userPassword: ""
      },
      checked: false,
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对 second--
      timer: null, // 定时器 id
      disabled: false,
      reviseRules: {
        userId: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        userCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    async doRegister() {
      // if (this.form.userPassword !== this.form.userPassword1) {
      //   this.$message({
      //     message: "两次输入的密码不一致",
      //     type: "error"
      //   });
      //   return false;
      // }
      // let params = {
      //   userId: this.form.userId,
      //   userName: this.form.userName,
      //   userPassword: this.form.userPassword1,
      //   userContactInformation: this.form.userContactInformation.toString(),
      //   userRight: this.form.userRight,
      //   email: this.form.userEmail
      // };
      // await request
      //   .post("/user/enroll", params)
      //   .then(res => {
      //     if (res.data.code == 1) {
      //       this.$message({
      //         message: res.data.msg,
      //         type: "success"
      //       });
      //       this.$router.push("/user");
      //     } else {
      //       this.$message({
      //         message: res.data.msg,
      //         type: "error"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.$message({
      //       message: "注册失败 " + err,
      //       type: "error"
      //     });
      //   });
      // 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        // 预期：希望如果响应的status非200，最好抛出一个promise错误，await只会等待成功的promise
        // await getMsgCode(this.picCode, this.picKey, this.mobile)
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--

          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器 id
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped lang="less">
.revise-container {
  padding-top: 100px;
  margin: 40px auto;
  width: 500px;
  text-align: left;
}
.title {
  margin: 0px auto 50px auto;
  text-align: center;
  color: black;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.08em;
}
.account {
  height: 100px;
}
.code {
  height: 100px;
  margin-top: 10px;
}
.bind_code_gain {
  position: absolute;
  top: calc(50% - 10px);
  right: 20px;
  font-size: 20px;
  line-height: 18px;
  cursor: pointer;
  padding: 0 !important;
  background-color: #F7F4F4 !important;
  border: none !important;
  font-weight: 400;
  font-size: 20px;

  color: #9B9595;
}
.revise {
  margin-top: 50px !important;
  height: 100px;
  &-button {
    position: relative;
    height: 80px;
    background-color: #9AC1E4;
    border-radius: 10px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.08em;
    border-color: #9AC1E4;
  }
}
.el-link {
  color: #2B68C2;
}
.el-link.is-underline:hover:after {
  border-bottom: none;
}
.saveSettings {
  float: left;
  font-size: 18px !important;
}
.goLogin {
  position: absolute;
  width: 210px;
  height: 21px;
  left: 152px;
  top: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #3E68BB !important;
}
::v-deep .el-checkbox__label {
  font-size: 18px;
}
::v-deep .el-checkbox__input{
  transform: scale(1.5);
}
::v-deep .el-form-item {
  margin-top: 25px;
}
::v-deep .el-form-item__label {
  padding-bottom: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
}
::v-deep .el-input__inner {
  width: 500px;
  height: 70px;
  background: #F6F4F4;
  border-color: #F6F4F4;
  font-size: 20px;
  border-radius: 5px;
}
</style>

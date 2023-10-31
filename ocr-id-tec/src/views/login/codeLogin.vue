<template>
  <div>
    <el-form 
      class="login-container"
      :model="loginForm"
      label-position="top"
      :rules="loginRules"
      ref="loginForm"
      :hide-required-asterisk="true"
    >
      <h1 class="title">用户登录</h1>
      <el-link type="primary" @click="toPasswordLogin" class="passwordLogin"
        >使用密码登录
      </el-link>
      <el-form-item class="account" label="手机号" prop="userId">
        <el-col :span="24">
          <el-input
            class="account-input"
            type="text"
            v-model.number="loginForm.userId"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="code" label="验证码" prop="userCode">
        <el-col :span="24">
          <el-input
            class="code-input"
            type="text"
            v-model="loginForm.userCode"
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
      <el-form-item class="login">
        <el-button class="login-button" type="primary" @click="doLogin" style="width: 100%;"
          >登录</el-button
        >
      </el-form-item>
      <el-row style="text-align: center;">
        <el-checkbox size="medium" v-model="checked" class="saveSettings">保存登陆设置</el-checkbox>
      </el-row>
      <el-row style="text-align: center;">
        <el-link type="primary" @click="toRegister" class="goRegister"
          >还没有账号？点击此处注册
        </el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import qs from "qs"
import { codeLogin, getMsgCode } from "@/api/login.js"
export default {
  name: "codeLogin",
  data() {
    return {
      loginForm: {
        userId: "",
        userCode: ""
      },
      checked: false,
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器对 second--
      timer: null, // 定时器 id
      disabled: false,
      loginRules: {
        userId: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        userCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.userId)) {
        this.$message({
          message: "请输入正确手机号",
          type: "error"
        });
        return false
      }
      return true
    },
    async bindforgetSendCode() {
      if (!this.validFn()) {
        // 如果没通过校验，没必要往下走了
        return
      }
      // 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        // 预期：希望如果响应的status非200，最好抛出一个promise错误，await只会等待成功的promise
        await getMsgCode(this.loginForm.userId).then(res => {
          this.$message({
            message: "发送短信验证码成功",
            type: "success"
          });
          // 开启倒计时
          this.timer = setInterval(() => {
            this.second--

            if (this.second <= 0) {
              clearInterval(this.timer)
              this.timer = null // 重置定时器 id
              this.second = this.totalSecond // 归位
            }
          }, 1000)
        })
      }
    },
    async doLogin() {
      if (this.loginForm.userCode == '' || this.loginForm.userId == '') {
        this.$message({
          message: "所填信息不完整",
          type: "error"
        });
        return ;
      }
      await codeLogin(this.loginForm.userId, this.loginForm.userCode)
      .then(res => {
        localStorage.setItem("satoken", res.data.tokenValue)
        localStorage.setItem("loginId", res.data.loginId)
        localStorage.setItem("isLogin", true)
        this.$store.commit('user/setUserInfo', { "satoken": res.data.tokenValue, "loginId": res.data.loginId, "isLogin": true })
        this.$router.push("/")
        this.$message({
          message: "登录成功",
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: "登陆失败 " + err,
          type: "error"
        });
      });
    },
    toRegister() {
      this.$router.push("/registered");
    },
    toPasswordLogin() {
      this.$router.push("/passwordlogin");
    },
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
};
</script>
<style scoped lang="less">
.login-container {
  .px2vw(width, 500);
  .px2vh(padding-top, 80);
  margin: 100px auto;
  .px2vh(margin-bottom, 100);
  .px2vh(margin-top, 150);
  text-align: left;
}
.passwordLogin {
  position: absolute;
  .px2vw(width, 140);
  .px2vh(height, 26);
  .px2vw(left, 592);
  .px2vh(top, 184);
  .px2vh(line-height, 26);
  .px2font(20);
  color: #D9D9D9 !important;
}
.title {
  margin: 0px auto 50px auto;
  .px2vh(margin-bottom, 50);
  text-align: center;
  color: black;
  font-weight: 700;
  .px2font(40);
  letter-spacing: 0.08em;
}
.account {
  .px2vh(height, 100);
}
.code {
  .px2vh(height, 100);
  .px2vh(margin-top, 10);
}
.bind_code_gain {
  position: absolute;
  .px2vh(top, 30);
  .px2vw(right, 20);
  .px2vh(line-height, 18);
  cursor: pointer;
  padding: 0 !important;
  background-color: #F7F4F4 !important;
  border: none !important;
  .px2font(20);
  color: #9B9595;
}
.login {
  .px2vh(margin-top, 50)!important;
  .px2vh(height, 100);
  &-button {
    position: relative;
    .px2vh(margin-top, 10);
    .px2vh(height, 80);
    background-color: #9AC1E4;
    .px2vw(border-radius, 12);
    .px2font(22);
    font-weight: 600;
    letter-spacing: 0.08em;
    border-color: #9AC1E4;
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(padding-top, 1);
    .px2vh(padding-bottom, 1);
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
  .px2font(18)!important;
}
.goRegister {
  position: absolute;
  .px2vw(width, 220);
  .px2vh(height, 21);
  .px2vw(left, 152);
  .px2vh(top, 60);
  .px2vh(line-height, 21);
  .px2font(18);
  color: #3E68BB !important;
}
::v-deep .el-checkbox__label {
  .px2font(20);
  .px2vw(margin-left, 10);
  color: #000;
}
::v-deep .el-checkbox__input{
  transform: scale(2);
}
::v-deep .el-checkbox__inner {
  .px2vw(width, 15);
  .px2vh(height, 16);
  .px2vw(border-radius, 2);
  border: 0.1vw solid #000;
}
::v-deep .el-form-item {
  .px2vh(margin-top, 50);
  .px2vh(margin-bottom, 25);
  .px2vh(height, 89);
}
::v-deep .el-form-item__label {
  .px2vh(height, 35);
  .px2vh(line-height, 35);
  .px2vh(padding-bottom, 12) !important;
  .px2font(20);
  color: #000000;
}
::v-deep .el-input__inner {
  .px2vw(width, 500);
  .px2vh(height, 80);
  background: #F6F4F4;
  border-color: #F6F4F4;
  .px2font(20);
  .px2vw(border-radius, 5);
}
.el-col {
  .px2vh(height, 62);
}
::v-deep .el-form-item__content {
  .px2font(20);
  .px2vh(line-height, 40);
}
.el-row {
  .px2vh(margin-top, 10);
}
</style>

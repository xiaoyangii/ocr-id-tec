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
      <el-link type="primary" @click="toCodeLogin" class="codeLogin"
        >使用验证码登录
      </el-link>
      <el-form-item class="account" label="手机号" prop="userId">
        <el-col :span="24">
          <el-input
            type="text"
            v-model="loginForm.userId"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="password" label="密码" prop="userPassword">
        <el-col :span="24">
          <el-input
            class="password-input"
            type="password"
            v-model.number="loginForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="login">
        <el-button class="login-button" type="primary" @click="doLogin" style="width: 100%;"
          >登录</el-button
        >
      </el-form-item>
      <el-row style="text-align: center;">
        <el-checkbox size="medium" v-model="checked" class="saveSettings">保存登陆设置</el-checkbox>
        <el-link type="primary" class="forgetPassword" @click="forgetPassword">忘记密码?</el-link>
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
import qs from "qs";
import { passwordLogin } from "@/api/login.js"
export default {
  name: "passwordLogin",
  data() {
    return {
      loginForm: {
        userId: "",
        userPassword: ""
      },
      checked: false,
      loginRules: {
        userId: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    async doLogin() {
      if (this.loginForm.userPassword == '' || this.loginForm.userId == '') {
        this.$message({
          message: "所填信息不完整",
          type: "error"
        });
        return ;
      }
      await passwordLogin(this.loginForm.userId, this.loginForm.userPassword)
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
    toCodeLogin() {
      this.$router.push("/codelogin");
    },
    forgetPassword() {
      this.$router.push("/forgetpassword");
    }
  },
};
</script>
<style scoped lang="less">
.login-container {
  .px2vh(padding-top, 80);
  .px2vw(width, 500);
  margin: 100px auto;
  .px2vh(margin-top, 150);
  .px2vh(margin-bottom, 100);
  text-align: left;
}
.codeLogin {
  position: absolute;
  .px2vh(height, 26);
  .px2vh(top, 184);
  .px2vw(width, 140);
  .px2vh(line-height, 26);
  .px2vw(left, 582);
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
.password {
  .px2vh(height, 100);
  .px2vh(margin-top, 10);
}
.login {
  .px2vh(margin-top, 50)!important;
  .px2vh(height, 100);
  &-button {
    position: relative;
    .px2vh(margin-top, 10);
    .px2vh(height, 80);
    background-color: #9AC1E4;
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(padding-top, 1);
    .px2vh(padding-bottom, 1);
    .px2vw(border-radius, 12);
    .px2font(22);
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
  .px2font(18)!important;
}
.forgetPassword {
  float: right;
  .px2font(20)!important;
  .px2vh(line-height, 26);
  color: #2B68C2 !important;
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
  &::after {
    border-right: 0.1vw solid #FFF;
    border-bottom: 0.1vw solid #FFF;
    .px2vh(height, 8.5);
    .px2vh(top, 1.5);
    .px2vw(left, 5);
    .px2vw(width, 3);
  }
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
::v-deep .el-form-item__error {
  .px2font(14);
  .px2vh(padding-top, 20);
}
</style>
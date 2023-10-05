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
      <el-row style="text-align: center;margin-top: -10px;">
        <el-checkbox size="medium" v-model="checked" class="saveSettings">保存登陆设置</el-checkbox>
        <el-link type="primary" class="forgetPassword" @click="forgetPassword">忘记密码?</el-link>
      </el-row>
      <el-row style="text-align: center;margin-top: -10px;">
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
  padding-top: 80px;
  margin: 100px auto;
  width: 500px;
  text-align: left;
}
.codeLogin {
  position: absolute;
  width: 140px;
  height: 26px;
  left: 582px;
  top: 184px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;

  color: #D9D9D9 !important;
}
.title {
  margin: 0px auto 50px auto;
  text-align: center;
  color: black;
  font-weight: 700;
  font-size: 40px;
  letter-spacing: 0.08em;
}
.account {
  height: 100px;
}
.password {
  height: 100px;
  margin-top: 10px;
}
.login {
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
.forgetPassword {
  float: right;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #2B68C2 !important;
}
.goRegister {
  position: absolute;
  width: 210px;
  height: 21px;
  left: 152px;
  top: 60px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #3E68BB !important;
}
::v-deep .el-checkbox__label {
  font-size: 20px;
  margin-left: 10px;
  color: #000;
}
::v-deep .el-checkbox__input{
  transform: scale(2);
  margin-bottom: 3px;
}
::v-deep .el-checkbox__inner {
  border-radius: 2px;
  border: 1px solid #000;
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
  color: #000000;
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

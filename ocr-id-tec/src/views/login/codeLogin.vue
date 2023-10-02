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
      <el-row style="text-align: center;margin-top: -10px;">
        <el-checkbox size="medium" v-model="checked" class="saveSettings">保存登陆设置</el-checkbox>
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
    bindforgetSendCode() {
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
    async doLogin() {
      // let userId = this.userId;
      // let userCode = this.userCode;
      // let params = {
      //   userId: userId,
      //   userCode: userCode
      // };
      // let str = qs.stringify(params);
      // await request
      //   .post("/user/login", str)
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       localStorage.setItem("tag", res.data.data.tag.toString());
      //       localStorage.setItem("satoken", res.data.data.tokenValue);
      //       localStorage.setItem("loginId", res.data.data.loginId);
      //       localStorage.setItem("isLogin", true);
      //       this.$message({
      //         message: "登陆成功",
      //         type: "success"
      //       });
      //       if (res.data.data.tag === "0") {
      //         this.$router.push({
      //           path: "/"
      //         });
      //       } else {
      //         this.$router.push("/admin");
      //       }
      //     } else {
      //       this.$message({
      //         message: res.data.msg,
      //         type: "error"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.$message({
      //       message: "登陆失败 " + err,
      //       type: "error"
      //     });
      //   });
    },
    toRegister() {
      this.$router.push("/registered");
    },
    toPasswordLogin() {
      this.$router.push("/passwordlogin");
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  padding-top: 100px;
  margin: 80px auto;
  width: 500px;
  text-align: left;
}
.passwordLogin {
  position: absolute;
  width: 140px;
  height: 26px;
  left: 592px;
  top: 204px;
  font-style: normal;
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
.code {
  height: 100px;
  margin-top: 10px;
}
.bind_code_gain {
  position: absolute;
  top: calc(50% - 10px);
  right: 20px;
  line-height: 18px;
  cursor: pointer;
  padding: 0 !important;
  background-color: #F7F4F4 !important;
  border: none !important;
  font-weight: 400;
  font-size: 20px;

  color: #9B9595;
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
.goRegister {
  position: absolute;
  width: 210px;
  height: 21px;
  left: 152px;
  top: 61px;
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

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
      <el-row style="text-align: center;">
        <el-link type="primary" @click="toLogin" class="goLogin"
          >已有账号？点击此处登录
        </el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { codeForgetPassword, getMsgCode } from "@/api/login.js"
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
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.registerForm.userId)) {
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
        await getMsgCode(this.registerForm.userId).then(res => {
          console.log(res)
          this.code = res.code
          this.$message({
            message: "发送短信验证码成功",
            type: "success"
          })
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
    async doRegister() {
      if (this.registerForm.userPassword == '' || this.registerForm.userCode == '' || this.registerForm.userId == '') {
        this.$message({
          message: "所填信息不完整",
          type: "error"
        });
        return ;
      }
      await codeForgetPassword(this.registerForm.userId, this.registerForm.userCode,this.registerForm.userPassword)
      .then(res => {
        this.$message({
          message: "修改密码成功",
          type: "success"
        })
        this.$router.push("/passwordlogin")
      })
      .catch(err => {
        this.$message({
          message: "修改失败 " + err,
          type: "error"
        });
      });
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
};
</script>
<style scoped lang="less">
.revise-container {
  .px2vh(padding-top, 80);
  .px2vw(width, 500);
  margin: 100px auto;
  .px2vh(margin-top, 100);
  .px2vh(margin-bottom, 100);
  text-align: left;
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
.revise {
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
.goLogin {
  position: absolute;
  .px2vw(width, 220);
  .px2vh(height, 21);
  .px2vw(left, 152);
  .px2vh(top, 10);
  .px2vh(line-height, 21);
  .px2font(18);
  color: #3E68BB !important;
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

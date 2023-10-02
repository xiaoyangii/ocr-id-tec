<template>
  <div class="personalcenter">
    <navbar></navbar>
    <div class="body">
      <asiderBar></asiderBar>
      <div class="right">
        <div class="personaldata">
          <div class="personaldata_avatar">
            <el-avatar :size="87" :src="avatarUrl"></el-avatar>
            <el-link type="primary" @click="editAvatar" class="personaldata_avatar_edit"
              >更换头像
            </el-link>
          </div>
          <div class="personaldata_username">
            {{ userInfo.userName }}
          </div>
          <div class="personaldata_authentication">
            已手机认证
          </div>
          <div class="personaldata_authenticationname">
            已实名认证
          </div>
        </div>
        <div class="editform">
          <el-form 
            label-position="right"
            label-width="150px"
            :model="userInfo"
            :rules="editRules"
            ref="editForm"
            :hide-required-asterisk="true"
          >
            <el-link type="primary" @click="edit" class="editForm-edit" v-if="showButton"
              >编辑信息
            </el-link>
            <el-button class="editForm-button" type="primary" @click="saveEdit" v-else
              >保存修改
            </el-button>
            <el-form-item label="用户名" prop="userName">
              <el-col :span="22">
                <el-input
                  type="text"
                  v-model="userInfo.userName"
                  :disabled="isInput"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="实名认证" prop="realAuthentication">
              <el-col :span="22">
                <el-input
                  type="text"
                  v-model="userInfo.realAuthentication"
                  :disabled="isInput"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="绑定邮箱" prop="userEmail">
              <el-col :span="22">
                <el-input
                  type="text"
                  v-model="userInfo.userEmail"
                  :disabled="isInput"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="绑定电话" prop="userPhone">
              <el-col :span="22">
                <el-input
                  type="text"
                  v-model.number="userInfo.userPhone"
                  :disabled="isInput"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/views/layout/navbar.vue';
import asiderBar from '@/views/layout/personalCenter/asiderBar.vue';
export default {
  name: 'personalCenter',
  components: {
    navbar,
    asiderBar
  },
  data () {
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    var validatePass2 = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请再次输入密码"))
      } else if (value !== this.editForm.password) {
         cb(new Error('两次输入密码不一致!'))
      } else {
        return cb();
      }
    }
    return {
      avatarUrl: '',
      userInfo: {
        userName: "吃萝卜的卷心菜",
        userEmail: "",
        userPhone: "",
        realAuthentication: "",
      },
      editRules: {
        userPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        rePassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        userEmail:[
          { required: true, trigger: "blur", validator: checkEmail }
        ],
        realAuthentication: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
      },
      showButton: true,
      btnText: "获取手机验证码",
      disabled: true,
      isInput: true,
    }
  },
  computed: {},
  watch: {},
  methods: {
    editAvatar() {

    },
    edit() {
      this.showButton = false;
      this.disabled = false;
      this.isInput = false;
      var input__inner = document.getElementsByClassName("el-input__inner");
      for(var i = 0; i < input__inner.length; i++) {
        input__inner[i].style.color = "#053593";
      }
      var button_inner = document.getElementsByClassName("bind_code_gain");
      button_inner[0].style.color = "#053593";
    },
    bindforgetSendCode() {

    },
    saveEdit() {
      this.showButton = true;
      this.disabled = true;
      this.isInput = true;
      var input__inner = document.getElementsByClassName("el-input__inner");
      console.log(input__inner);
      for(var i = 0; i < input__inner.length; i++) {
        input__inner[i].style.color = "#C1C1C1";
      }
      var button_inner = document.getElementsByClassName("bind_code_gain");
      button_inner[0].style.color = "#C1C1C1";
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.body {
  height: 877px;
  width: 100%;
  .right {
    margin-left: 317px;
    padding-left: 155px;
    height: 100%;
    background: #FFF;
  }
}
.personaldata {
  height: 190px;
  width: 50%;
  &_avatar {
    position: relative;
    left: 0;
    top: 50px;
    width: 20%;
    &_edit {
      position: absolute;
      left: -3px;
      top: 100px;
      margin-left: 10px;
    }
    ::v-deep .el-link {
      color: #2B68C2;
      font-size: 20px;
    }
    ::v-deep .is-underline:hover:after {
      border: none;
    }
  }
  &_username {
    position: relative;
    top: -35px;
    left: 120px;
    width: 50%;
    color: #053593;
    font-size: 28px;
    font-weight: 700;
  }
  &_authentication {
    position: relative;
    top: -20px;
    left: 120px;
    width: 118px;
    height: 33px;
    line-height: 33px;
    border-radius: 11.5px;
    background: #043492;
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  &_authenticationname {
    position: relative;
    top: -53px;
    left: 253px;
    width: 118px;
    height: 33px;
    line-height: 33px;
    border-radius: 11.5px;
    background: #6192F2;
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
}
.editform {
  height: calc(100% - 190px);
  width: 100%;
  background-color: pink;
}
</style>

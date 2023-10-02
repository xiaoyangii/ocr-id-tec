<template>
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
        label-position="left"
        label-width="100px"
        :model="userInfo"
        :rules="editRules"
        ref="editForm"
        :hide-required-asterisk="true"
      >
        <el-link type="primary" @click="edit" class="editForm-edit" v-if="showButton"
          >编辑信息
        </el-link>
        <el-link class="editForm-edit" type="primary" @click="saveEdit" v-else
          >保存修改
        </el-link>
        <el-form-item label="用户名" prop="name">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.name"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="实名认证" prop="realName">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.realName"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-col :span="22">
            <el-input
              type="text"
              v-model.number="userInfo.telephone"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.email"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="职业" prop="profession">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.profession"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="民族" prop="race">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.race"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="生日" prop="birthDay">
          <el-col :span="22">
            <el-date-picker
              v-model="userInfo.birthDay"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="兴趣领域" prop="areaOfInterest">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.areaOfInterest"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import avatarUrl from '@/assets/images/Intersect.png'
export default {
  name: 'personalData',
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
      avatarUrl,
      userInfo: {
        name: "吃萝卜的卷心菜",
        email: "",
        telephone: "15116165111",
        realName: "dsada",
        profession: "学生",
        race: "汉族",
        areaOfInterest: "计算机",
        birthDay: "1999-01-01",
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
        profession: [
          { required: true, message: "请输入职业", trigger: "blur" },
        ],
        race: [
          { required: true, message: "请输入民族", trigger: "blur" },
        ],
        birthDay: [
          { required: true, message: "请选择生日", trigger: "blur" },
        ],
        areaOfInterest: [
          { required: true, message: "请输入兴趣领域", trigger: "blur" },
        ],
      },
      isInput: true,
      showButton: true,
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
}
</script>
<style scoped lang='less'>
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
  float: left;
  height: calc(100% - 190px);
  width: 100%;
  ::v-deep .el-form-item {
    margin-bottom: 22px;
  }
  ::v-deep .el-form-item__label {
    width: 67px;
    height: 57px;
    line-height: 57px;
    color: #000;
    font-size: 22px;
    font-weight: 700;
  }
  ::v-deep .el-input__inner {
    padding-left: 35px;
    width: 1185px;
    height: 57px;
    border-radius: 20px;
    background: #EBF5FF;
  }
  .editForm-edit {
    position: relative;
    top: 0;
    left: 1190px;
    margin-bottom: 10px;
    width: 84px;
    height: 30px;
    color: #2B68C2;
    font-size: 20px;
  }
  .el-link.is-underline:hover:after {
    border: none;
  }
}
::v-deep .el-input__prefix {
  display: none;
}
</style>

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
        <el-form-item label="实名认证" prop="realAuthentication">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.realName"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-col :span="22">
            <el-input
              type="text"
              v-model.number="userInfo.telephone"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
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
        <el-form-item label="工作单位" prop="affiliatedInstitution">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.affiliatedInstitution"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="研究领域" prop="researchField">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.researchField"
              :disabled="isInput"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="个人陈述" prop="introduce">
          <el-col :span="22">
            <el-input
              type="text"
              v-model="userInfo.introduce"
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
import { homeDetail, getUserDetail } from '@/api/personal.js'
export default {
  name: 'homeData',
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
      },
      editRules: {
        telephone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^\d{11}$/, message: "请输入11个数字", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        email:[
          { required: true, trigger: "blur", validator: checkEmail }
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        profession: [
          { required: true, message: "请输入职业", trigger: "blur" },
        ],
        affiliatedInstitution: [
          { required: true, message: "请输入工作单位", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入个人陈述", trigger: "blur" },
        ],
        researchField: [
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
    },
    async saveEdit() {
      this.showButton = true;
      this.disabled = true;
      this.isInput = true;
      var input__inner = document.getElementsByClassName("el-input__inner");
      console.log(input__inner);
      for(var i = 0; i < input__inner.length; i++) {
        input__inner[i].style.color = "#C1C1C1";
      }
      await homeDetail(this.userInfo.name, this.userInfo.realName, this.userInfo.telephone, this.userInfo.email, this.userInfo.profession, this.userInfo.affiliatedInstitution, this.userInfo.researchField, this.userInfo.introduce)
      .then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      })
      .catch(err => {
        this.$message({
          message: "修改主页信息失败" + err,
          type: 'error'
        })
      })
    },
    async getUserDetail() {
      await getUserDetail(localStorage.getItem("loginId"))
      .then(res => {
        this.userInfo = res.User
        this.$message({
          message: "获取主页信息成功",
          type: 'success'
        })
      })
      .catch(err => {
        this.$message({
          message: "获取主页信息失败" + err,
          type: 'error'
        })
      })
    }
  },
  created() {
    this.getUserDetail();
  }
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
</style>

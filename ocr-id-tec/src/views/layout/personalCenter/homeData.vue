<template>
  <div class="right">
    <div class="personaldata">
      <div class="personaldata_avatar">
        <el-avatar :src="avatarUrl"></el-avatar>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://orcsystem.v2.idcfengye.com/User/ChangeDetail"
          :limit="1"
          :http-request="uploadFile"
          :on-change="onChange"
          :auto-upload="false"
          accept=".png,.jpg,.jpeg"
          >
          <el-link type="primary" class="personaldata_avatar_edit">更换头像</el-link>
        </el-upload>
      </div>
      <div class="personaldata_username">
        {{ userInfo.name }}
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
        label-width="6vw"
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
import { homeDetail, getUserDetail, editAva, getUserAva } from '@/api/personal.js'
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
        name: "不吃香菜"
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
      formDate: new FormData(),
      imgList: []
    }
  },
  methods: {
    async editAvatar() {
      this.$refs.upload.submit()
      this.formDate.append('telephone', localStorage.getItem('loginId'))
      await editAva(this.formDate)
      .then(res => {
        this.$message({
          message: "更换头像成功",
          type: "success"
        });
      })
      .catch(err => {
        this.$message({
          message: "更换头像失败" + err,
          type: "error"
        });
      })
    },
    onChange(file, fileList) {
      console.log("onchange")
      this.imgList.push(file)
      console.log(fileList)
      this.editAvatar()
    },
    uploadFile(file) {
      console.log("uploadfile");
      console.log(file)
      //参数file文件就是传入的文件流，添加进formDate中
      this.formDate.append("files", file.file)
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
    },
    async getUserAvatar() {
      await getUserAva(localStorage.getItem("loginId"))
      .then(res => {
        console.log(res.Picture)
      })
      .catch(err => {
        this.$message({
          message: "获取头像失败" + err,
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
  .px2vh(height, 190);
  width: 50%;
  &_avatar {
    position: relative;
    left: 0;
    .px2vh(top, 50);
    width: 20%;
    &_edit {
      position: absolute;
      .px2vw(left, -3);
      .px2vh(top, 100);
      .px2vw(margin-left, 10);
    }
    ::v-deep .el-link {
      color: #2B68C2;
      .px2font(20);
    }
    ::v-deep .is-underline:hover:after {
      border: none;
    }
  }
  &_username {
    position: relative;
    .px2vw(left, 120);
    .px2vh(top, -35);
    color: #053593;
    .px2font(28);
    font-weight: 700;
  }
  &_authentication {
    position: relative;
    .px2vw(left, 120);
    .px2vh(top, -20);
    .px2vw(width, 118);
    .px2vh(height, 33);
    .px2vh(line-height, 33);
    .px2vw(border-radius, 11.5);
    background: #043492;
    color: #FFF;
    .px2font(16);
    font-weight: 700;
    text-align: center;
  }
  &_authenticationname {
    position: relative;
    .px2vw(left, 253);
    .px2vh(top, -53);
    .px2vw(width, 118);
    .px2vh(height, 33);
    .px2vh(line-height, 33);
    .px2vw(border-radius, 11.5);
    background: #6192F2;
    color: #FFF;
    .px2font(16);
    font-weight: 700;
    text-align: center;
  }
}
.editform {
  float: left;
  .px2vh(height, 797);
  width: 100%;
  ::v-deep .el-form-item {
    .px2vh(margin-bottom, 35);
  }
  ::v-deep .el-form-item__label {
    .px2vw(width, 67);
    .px2vw(padding-left, 10);
    .px2vh(height, 57);
    .px2vh(line-height, 57);
    color: #000;
    font-weight: 700;
    .px2font(22);
    .px2vw(padding-right, 0);
  }
  ::v-deep .el-input__inner {
    .px2vw(padding-left, 35);
    .px2vw(width, 1185);
    .px2vh(height, 57);
    .px2vh(line-height, 33);
    .px2vw(border-radius, 20);
    background: #EBF5FF;
  }
  .editForm-edit {
    position: relative;
    .px2vw(left, 1190);
    .px2vw(width, 84);
    .px2vh(height, 30);
    top: 0;
    .px2vh(margin-bottom, 10);
    color: #2B68C2;
    .px2font(20);
  }
  .el-link.is-underline:hover:after {
    border: none;
  }
}
.el-avatar {
  .px2vw(width, 77);
  .px2vh(height, 87);
}
::v-deep .el-form-item__content {
  .px2vh(line-height, 40);
}
::v-deep .el-input {
  .px2font(20);
}
</style>

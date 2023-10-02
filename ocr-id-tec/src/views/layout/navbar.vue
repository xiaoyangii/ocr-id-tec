<template>
  <div class="header">
    <img src="@/assets/images/logo.png" alt="">
    <h1 class="logo">
      易通<div>文</div>
    </h1>
    <ul class="navbar">
      <router-link to="/home/homepage" exact v-slot="{ href, navigate, isActive }" custom>
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">首页</a>
        </li>
      </router-link>
      <router-link to="/home/retrievalengine" v-slot="{ href, navigate, isActive }" custom>
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">检索引擎</a>
        </li>
      </router-link>
      <router-link to="/home/onlinestore" v-slot="{ href, navigate, isActive }" custom>
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">在线商城</a>
        </li>
      </router-link>
      <router-link to="/home/smartcloud" v-slot="{ href, navigate, isActive }" custom>
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">智慧云端</a>
        </li>
      </router-link>
    </ul>
    <div class="user">
      <div class="login" v-if="!state">
        <router-link to="/login">
          <span class="login__text">登录</span>
        </router-link>
      </div>

      <div class="avatar" v-else>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar :size="56" :src="avatarUrl"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="(item) in option" :key="item.value" :command="item.value">
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import avatarurl from "@/assets/logo.png"
export default {
  name: "navbar",
  data() {
    return {
      loginId: localStorage.getItem("loginId"),
      state: true,
      avatarUrl: null,
      option: [
        {
          value: 'personalcenter',
          label: '个人中心'
        },
        {
          value: 'feedback',
          label: '我要反馈'
        },
        {
          value: 'settings',
          label: '设置'
        },
        {
          value: 'signOut',
          label: '退出登录'
        }
      ]
    };
  },
  created() {
    this.reviseState();
  },
  beforeUpdate() {
    this.reviseState();
  },
  methods: {
    reviseState() {
      if (localStorage.getItem("isLogin")) {
        this.state = true;
      }
    },
    handleLogout() {
      localStorage.removeItem("isLogin");
      // 1. 清空 token
      localStorage.removeItem("satoken");
      localStorage.removeItem("loginId");
      localStorage.removeItem("tag");
      // 2. 跳转到主页面
      this.state = false;
    },
    handleCommand(pt) {
      if (pt === 'signOut') {
        this.handleLogout();
      } else {
        console.log(pt);
        this.$router.push(`/${ pt }`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  height: 80px;
  align-items: center;
  padding: 10px 70px;
  min-width: 900px;
  background-color: #E2F0FD;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  &.main-color {
    background-color: rgba(255, 255, 255, 0);
    .navbar-item {
      &:hover {
        color: #053593;
      }
    }
    .login-text {
      color: #3370ff;
      padding: 5px;
    }
  }
  img {
    height: 100%;
  }
}
.logo {
  float: left;
  width: 300px;
  height: 100%;
  margin-left: 20px;
  line-height: 51px;
  color: #000;
  font-family: "zihun";
  font-weight: 400;
  div {
    float: left;
    color: #013480;
  }
}
.navbar {
  margin-left: 300px;
  display: flex;
  &-item {
    padding: 24px 0px;
    margin: 0 75px;
    font-size: 22px;
    width: 90px;
    height: 80px;
    text-align: center;
    &.active {
      border-bottom: 4px solid;
      color: #1559DD;
    }
  }
}
.user {
  margin-left: 40px;
  margin-right: 15px;
  position: relative;
  width: 150px;
  height: 55px;
  line-height: 50px;
  font-size: 22px;
  color: #fff;
  .login {
    margin: 2.5px auto;
    width: 85px;
    border-radius: 18px;
    background-color: #053593;
    padding: 0px 15px;
    text-align: center;
  }
}
.avatar {
  float: right;
  height: 60px;
}
.el-dropdown-menu {
  top: 70px !important;
  left: 1750px !important;
  padding: 5px 0;
  margin: 0 auto;
  border-radius: 8px;
}
/* 消除小三角 */
.el-popper {
  overflow: auto; 
}
::v-deep .el-dropdown-menu__item {
  font-size: 16px;
  color: #013480;
  text-align: center;
  padding: 5px 14px;
  &:hover {
    color: #013480 !important;
  }
}
</style>

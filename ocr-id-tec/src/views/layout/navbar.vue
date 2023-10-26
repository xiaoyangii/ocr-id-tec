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
          <el-avatar :src="avatarUrl"></el-avatar>
          <el-dropdown-menu slot="dropdown" ref="elDropdown">
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
import avatarUrl from "@/assets/images/Intersect.png"
export default {
  name: "navbar",
  data() {
    return {
      loginId: localStorage.getItem("loginId"),
      state: false,
      avatarUrl,
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
      this.$store.dispatch('user/logout')
      // 2. 跳转到主页面
      this.state = false;
    },
    handleCommand(pt) {
      if (pt === 'signOut') {
        this.handleLogout();
      } else {
        if (pt === 'feedback') {
          pt = "home/" + pt 
        }
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
  .px2vh(height, 89);
  align-items: center;
  .px2vw(padding-left, 80);
  .px2vw(padding-right, 10);
  .px2vh(padding-top, 10);
  .px2vh(padding-bottom, 10);
  .px2vw(min-width, 900);
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
      .px2vw(padding-left, 5);
      .px2vw(padding-right, 5);
      .px2vh(padding-top, 5);
      .px2vh(padding-bottom, 5);
    }
  }
  img {
    .px2vh(height, 60);
  }
}
.logo {
  float: left;
  .px2vw(width, 300);
  .px2vh(height, 53);
  .px2vh(line-height, 45);
  .px2vw(margin-left, 20);
  .px2font(32);
  color: #000;
  font-family: "zihun";
  font-weight: 400;
  div {
    float: left;
    color: #013480;
  }
}
.navbar {
  .px2vw(margin-left, 300);
  display: flex;
  &-item {
    .px2vh(padding-top, 24);
    .px2vh(padding-bottom, 24);
    .px2vw(margin-left, 75);
    .px2vw(margin-right, 75);
    .px2font(22);
    .px2vw(width, 90);
    .px2vh(height, 88);
    text-align: center;
    &.active {
      .px2vh(border-bottom, 6);
      border-bottom-style: solid;
      color: #1559DD;
    }
  }
}
.user {
  .px2vw(margin-left, 40);
  .px2vw(margin-right, 15);
  position: relative;
  .px2vw(width, 150);
  .px2vh(height, 55);
  .px2vh(line-height, 50);
  .px2font(22);
  color: #fff;
  .login {
    margin: 2.5px auto;
    .px2vw(width, 85);
    border-radius: 0.8vw;
    background-color: #053593;
    .px2vw(padding-right, 15);
    .px2vw(padding-left, 15);
    text-align: center;
  }
}
.avatar {
  float: right;
  .px2vw(width, 150);
  .px2vh(height, 60);
  .px2vw(margin-right, 15);
}

/* 消除小三角 */
.el-popper {
  overflow: auto; 
}
::v-deep .el-dropdown-menu__item {
  .px2vw(width, 92);
  .px2vh(height, 45);
  .px2vh(line-height, 45);
  .px2font(16);
  color: #013480;
  text-align: center;
  .px2vw(padding-left, 14);
  .px2vw(padding-right, 14);
  .px2vh(padding-top, 5);
  .px2vh(padding-bottom, 5);
  &:hover {
    color: #013480 !important;
  }
}
::v-deep .el-avatar {
  .px2vh(height, 56);
  .px2vw(width, 50);
}
.el-dropdown-menu {
  // position: relative !important;
  .px2vh(top, 78) !important;
  .px2vw(left, 1707) !important;
  .px2vh(padding-top, 5);
  .px2vh(padding-bottom, 5);
  margin: 0 auto;
  border-radius: 0.5vw;
}
</style>

<template>
  <div id="login">
    <div id="head">
      <img class="logo" src="../assets/logo.png" />
      <span>欢迎使用公卫监测上报系统</span>
    </div>
    <div id="body">
      <div id="form">
        <span>账号登录</span>
        <el-form ref="loginForm" :rules="loginRule" :model="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名">
              <i slot="prefix" class="icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom:15px;">
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              @keyup.enter.native="onEnter"
            >
              <i slot="prefix" class="icon-pwd"></i>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:15px;">
            <el-checkbox v-model="loginForm.remPwd">记住密码</el-checkbox>
            <el-link type="primary" :underline="false" style="float:right;display:none">忘记密码？</el-link>
          </el-form-item>
          <el-form-item style="margin-bottom:15px;line-height:20px">
            <el-alert
              v-show="loginForm.error!==''"
              :title="loginForm.error"
              type="error"
              style="line-height:20px"
              @close="loginForm.error=''"
              show-icon
            ></el-alert>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:320px;font-size:18px;"
              @click="login"
            >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" style="display:none" @click="login">logout</el-button>
      </div>
    </div>
    <div id="foot">
      <span>COPYRIGHT ©2019-2020 医顺达公司 版权所有 保留一切权利</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        remPwd: false,
        error: ""
      },
      loginRule: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度为6到20个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度为3到20个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onEnter(e) {
      const key = e.which || e.keyCode;
      if (key === 13) {
        this.login();
      }
    },
    login() {
      this.loginForm.error = "";
      const form = "loginForm";
      const el = this.$refs[form];
      el.validate(valid => {
        if (!valid) {
          return false;
        }

        const url = "/public/user/login";
        this.axios
          .post(url, {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then((res) => {
            if (res.status.code === 1) {
              this.setToken(res.data.token);
              const user = {
                id: res.data.user.id,
                realname: res.data.user.realname,
                tel: res.data.user.tel,
                username: res.data.user.username,
                orgId: res.data.user.orgId,
                orgName: res.data.user.Organization
                  ? res.data.user.Organization.name
                  : "",
                orgArea: res.data.user.Organization
                  ? res.data.user.Organization.Area
                  : "",
                hisNo: res.data.user.hisNo,
                lisNo: res.data.user.lisNo
              };
              this.setUserInfo(user);
              //缓存保存用户名密码
              if (this.loginForm.remPwd) {
                this.setRemUser({
                  username: this.loginForm.username,
                  password: this.loginForm.password,
                  remPwd: true
                });
              } else {
                this.setRemUser({
                  username: "",
                  password: "",
                  remPwd: false
                });
              }
              this.$router.push("/");
            } else {
              this.loginForm.error = res.status.msg;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  created() {
    if (this.$store.state.remUser && this.$store.state.remUser.remPwd) {
      this.loginForm.username = this.$store.state.remUser.username;
      this.loginForm.password = this.$store.state.remUser.password;
      this.loginForm.remPwd = this.$store.state.remUser.remPwd;
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: scroll;

  #head {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .logo {
      height: 42px;
      width: 55px;
      margin-left: 40px;
    }

    span {
      color: #0ca390;
      font-size: 30px;
      font-weight: bold;
      margin-left: 15px;
    }
  }

  #body {
    flex-grow: 5;
    background-color: #cccccc;
    background-image: url("../assets/images/login_bg.png");
    background-size: contain;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    #form {
      margin-right: 20%;
      padding: 20px 30px;
      height: 500px;
      width: 320px;
      border-radius: 5px;
      box-shadow: 0px 2px 8px #303133;
      background-color: #ffffff;

      span {
        font-size: 23px;
        color: #0ca390;
        line-height: 120px;
        display: block;
        text-align: center;
        font-weight: bold;
      }

      i {
        font-size: 18px;
      }
    }
  }

  #foot {
    flex-grow: 4;
    display: flex;
    justify-content: center;

    span {
      margin-top: 10px;
      font-size: 15px;
    }
  }
}
</style>
<template>
  <div class="main-box">
    <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
    <div class="login-box">
      <el-form :rules="loginFormRules"
               ref="loginForm"
               :model="loginForm"
               label-position="right"
               label-width="auto"
               show-message>
        <span class="login-title">欢迎登陆</span></br>
        <span class="login-title"
              style="font-size: 24px;">点点通业务管理系统</span>
        <div style="margin-top: 5px"></div>
        <el-form-item label="用户名"
                      prop="userName">
          <el-col :span="22">
            <el-input type="text"
                      v-model="loginForm.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-col :span="22">
            <el-input type="password"
                      v-model="loginForm.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loginSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import cookieUtil from "../common/js/utils/cookieUtil.js";
import request from "../api/request.js";
export default {
  name: "login",
  data () {
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        userName: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    loginSubmit () {
      // 为表单绑定验证功能
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var _this = this;
          var formData = new FormData();
          formData.append("userName", this.loginForm.userName);
          formData.append("password", this.loginForm.password);
          request.login(formData).then((res) => {
            debugger
            if (res.code == 200) {
              _this.$message({
                message: "登录成功",
                type: "success",
              });
              cookieUtil.setCookie("loginToken", res.data.loginToken, 14);
              cookieUtil.setCookie("userName", res.data.userName, 14);
              cookieUtil.setCookie("realName", res.data.realName, 14);
              _this.$router.push({ path: "/main" });
            } else {
              _this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    register () {
      this.$message.error("暂未实现");
    }
  },
};
</script>
<style>
html {
  overflow-y: hidden;
  background: url(../assets/bg1.jpg) no-repeat;
  background-size: 100%;
}
</style>
<style scoped>
.main-box {
  width: 100%;
  height: 100%;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 0 auto;
  margin-top: 180px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px palegreen;
  background: white;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
.el-button--primary {
  height: 30px;
  line-height: 7px;
}
</style>
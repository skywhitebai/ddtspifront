<template>
  <div class="main">
      <el-container>
    <el-header style="height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
	background-color: #323C57;
    z-index: 999;">
        <div class="header-left" style="color: white;display: flex;align-items: center;">
			<!-- <img width="40px" src="../assets/ldjc.png" /> -->
			<span>aissky系统</span>
		</div>
        <div class="header-right" style="color: white;">
          <el-button type="text" @click="showRegister()">注册</el-button>
          <el-button type="text" @click="login()">登录</el-button>
        </div>
      </el-header>
      </el-container>
          <el-dialog title="注册" :visible.sync="dialogRegisterFormVisible" width="500px">
      <el-form :model="registerInfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input type="userName" v-model="registerInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerInfo.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input type="text" v-model="registerInfo.mobile" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input type="realName" v-model="registerInfo.realName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegisterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register()">注 册</el-button>
      </div>
    </el-dialog>
    <div>
 
    </div>
  </div>  
</template>
<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  vertical-align: top;
}

body > .el-container {
  margin-bottom: 40px;
}


.header-left {
  float: left;
}
.header-right {
  float: right;
}
</style>
<script>

import cookieUtil from "../common/js/utils/cookieUtil.js";
import request from "../api/request.js";
import "../common/css/common.css";
export default {
  data () {
    return {
      dialogRegisterFormVisible: false,
      registerInfo: {
      },
      formLabelWidth: "70px",
    };
  },
  methods: {
     login() {
      this.$router.push("/login");
    },
    showRegister(){
      this.registerInfo = {};
      this.dialogRegisterFormVisible = true;
    },
    register(){
      var _this = this;
      var formData = new FormData();
      formData.append("userName", this.registerInfo.userName);
      formData.append("password", this.registerInfo.oldPassword);
      formData.append("confirmPassword", this.registerInfo.confirmPassword);
      formData.append("mobile", this.registerInfo.mobile);
      formData.append("realName", this.registerInfo.realName);
      request.registerAccount(formData).then((res) => {
        debugger
        if (res.code == 200) {
          _this.$message({
            message: "注册成功，等待审核",
            type: "success",
          });
          this.dialogRegisterFormVisible = false;
        } else {
          _this.$message.error(res.message);
        }
      });
    }
  },
  mounted () {

  },
  created () {

  },
};
</script>
<template>
  <div>
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
			<span>业务办理平台</span>
		</div>
        <div class="header-right" style="color: white;">
          {{realName}}
          <el-button type="text" @click="showChangePassword()">修改密码</el-button>
          <el-button type="text" @click="logout()">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 60px;height: calc(100% - 60px);
    background-color: #274A7D;">
          <Slider></Slider>
        </el-aside>
        <el-main style="padding-left: 220px;padding-top: 80px;">
          <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove"
          >
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in options"
              :label="item.name"
              :name="item.route"
            >
              <router-view />
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogChangePasswordFormVisible">
      <el-form :model="changePasswordInfo">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="changePasswordInfo.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="changePasswordInfo.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="changePasswordInfo.confirmNewPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePasswordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
	.el-menu{
		border: none;
		background-color: #274A7D !important;
	}
	.el-menu-item{
		color: white !important;
	}
	.el-menu-item i{
		color: white !important;
	}
	.el-menu-item:focus, .el-menu-item:hover{
		background-color: #1F2D3D !important;
		outline: 0;
	}
</style>
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

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.header-left {
  float: left;
}
.header-right {
  float: right;
}
.menu {
  vertical-align: top;
}
</style>
<script>
import cookieUtil from "../common/js/utils/cookieUtil.js";
import Slider from "./Slider.vue";
import request from "../api/request.js";

export default {
  data: function () {
    return {
      realName: "",
      loginToken: "",
      dialogChangePasswordFormVisible: false,
      changePasswordInfo: {},
      formLabelWidth: "70px",
    };
  },
  components: {
    Slider,
  },
  methods: {
    checkLogin() {
      //获取当前登录用户信息
      this.loginToken = cookieUtil.getCookie("loginToken");
      if (this.loginToken == null || this.loginToken === "") {
        logout();
      }
      this.realName = cookieUtil.getCookie("realName");
    },
    logout() {
      cookieUtil.clearCookie("loginToken");
      cookieUtil.clearCookie("userName");
      cookieUtil.clearCookie("realName");
      this.$router.push("/login");
      location.reload();
    },
    // tab切换时，动态的切换路由
    tabClick(tab) {
      let path = this.activeIndex;
      this.$router.push({ path: path });
    },
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/" || targetName == "/main") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/main" });
        }
      }
    },
    showChangePassword() {
      this.changePasswordInfo = {};
      this.dialogChangePasswordFormVisible = true;
    },
    changePassword() {
      var _this = this;
      var formData = new FormData();
      formData.append("oldPassword", this.changePasswordInfo.oldPassword);
      formData.append("newPassword", this.changePasswordInfo.newPassword);
      formData.append(
        "confirmNewPassword",
        this.changePasswordInfo.confirmNewPassword
      );
      request.changePassword(formData).then((res) => {
        if (res.data.code == 200) {
          _this.$message({
            message: "修改密码成功",
            type: "success",
          });
          this.dialogChangePasswordFormVisible = false;
        } else {
          _this.$message.error(res.data.message);
        }
      });
    },
  },
  computed: {
    options() {
      return this.$store.state.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      },
    },
  },
  watch: {
    $route(to) {
      let flag = false;
      for (let option of this.options) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
          break;
        }
      }
      if (!flag) {
        this.$store.commit("add_tabs", {
          route: "/" + to.path.split("/")[1],
          name: to.name,
        });
        this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
      }
    },
  },
  //这个属性就可以，在里面声明初始化时要调用的方法即可
  mounted() {
    this.checkLogin();
  },
};
</script>

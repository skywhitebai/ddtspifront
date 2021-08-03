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
			<span>点点通销售管理系统</span>
		</div>
        <div class="header-right" style="color: white;">
          <el-button type="text" @click="register()">注册</el-button>
          <el-button type="text" @click="login()">登录</el-button>
        </div>
      </el-header>
      </el-container>
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
import md5 from "js-md5";
import cookieUtil from "../common/js/utils/cookieUtil.js";
import request from "../api/request.js";
import "../common/css/common.css";
export default {
  data () {
    return {
      
    };
  },
  methods: {
    
  },
  mounted () {

  },
  created () {

  },
};
</script>
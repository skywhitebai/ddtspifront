<template>
  <div class="main">
    <h1>亚马逊授权</h1>
    <div>
      <div>
        <span>商户id</span><input type="text"
               readonly="readonly"
               style="width: 500px"
               v-model="sellingPartnerId" />
      </div>
      <br />
      <div>
        <span>token</span><input type="text"
               readonly="readonly"
               style="width: 500px"
               v-model="spapiOauthCode" />
      </div>
    </div>
    <div>
      <el-button type="primary"
                 @click="saveAmazonAuth">保 存</el-button>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import cookieUtil from "../common/js/utils/cookieUtil.js";
import request from "../api/request.js";
import "../common/css/common.css";
export default {
  data () {
    return {
      sellingPartnerId: "",
      spapiOauthCode: ""
    };
  },
  methods: {
    initAuthInfo () {
      this.sellingPartnerId = this.$route.query.selling_partner_id;
      this.spapiOauthCode = this.$route.query.spapi_oauth_code;
    },
    saveAmazonAuth () {
      var _this = this;
      var formData = new FormData();
      formData.append("sellingPartnerId", this.sellingPartnerId);
      formData.append("spapiOauthCode", this.spapiOauthCode);
      request.saveAmazonAuth(formData).then((res) => {
        if (res.code == 200) {
          _this.$message({
            message: "授权成功",
            type: "success",
          });
          _this.$router.push({ path: "/amazonAuth" });
        } else {
          _this.$message.error(res.message);
        }
      });
    },
  },
  mounted () {
    this.initAuthInfo();
    this.saveAmazonAuth();
  },
  created () {
    var autotableheight = window.innerHeight - 350;
    this.autotableheight = autotableheight;
  },
};
</script>
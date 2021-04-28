<template>
  <div>
    <div class="search">
      <div class="inputrowbox">
        <span>商户id</span><input type="text"
               v-model="search.merchantId" />
      </div>
      <div class="inputrowbox">
        <span>商户名称</span><input type="text"
               v-model="search.shopName" />
      </div>
      <div class="inputrowbox">
        <span>投诉状态</span>
        <select v-model="search.status">
          <option value="">全部</option>
          <option value="1">启用</option>
          <option value="0">停用</option>
        </select>
      </div>
      <div class="inputrowbox">
        <el-button type="primary"
                   @click="bindAmazonAuthList(true)">查询</el-button>
        <el-button type="primary"
                   @click="amazonAuth()">授权</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :height="autotableheight"
              :data="amazonAuthList"
              tooltip-effect="dark"
              style="width: 100%">
      <el-table-column prop="merchantId"
                       sortable
                       label="买家id"
                       width="120"></el-table-column>
      <el-table-column prop="shopName"
                       sortable
                       label="店铺名称"
                       width="120"></el-table-column>
      <el-table-column prop="customerId"
                       sortable
                       label="客户id"
                       width="120"></el-table-column>
      <el-table-column prop="endPointArea"
                       sortable
                       label="站点区域"
                       width="120"></el-table-column>
      <el-table-column prop="remark"
                       label="备注"
                       width="200"></el-table-column>
      <el-table-column label="状态"
                       width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0"
                style="color: red;">停用</span>
          <span v-if="scope.row.status == 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="50"
                       prop>
        <template scope="scope">
          <el-button type="text"
                     @click="showInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageConf.pageNum"
                     :page-sizes="pageConf.pageOption"
                     :page-size="pageConf.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageConf.totalCount"></el-pagination>
    </div>
  </div>
</template>
<script>
import request from "../api/request.js";
import cookieUtil from "../common/js/utils/cookieUtil.js";
import store from "@/store/index"; //引入store
import { Message } from 'element-ui'
import "../common/css/common.css";
export default {
  data () {
    return {
      search: {
        merchantId: "",
        shopName: "",
        status: ""
      },
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageNum: 1, //当前页
        pageSize: 10, //每页显示的记录数
        totalCount: 0, //总记录数
        pageOption: [10, 20, 40], //分页选项
      },
      amazonAuthList: [],
      autotableheight: "",
    }
  },
  methods: {
    //pageSize改变时触发的函数
    handleSizeChange (val) {
      this.pageConf.pageSize = val;
      //加载数据
      this.bindAmazonAuthList();
    },
    //当前页改变时触发的函数
    handleCurrentChange (val) {
      this.pageConf.pageNum = val;
      this.bindAmazonAuthList();
    },
    bindAmazonAuthList (reSearch) {
      var _this = this;
      var formData = new FormData();
      if (reSearch == true) {
        formData.append("pageNum", 1);
        formData.append("pageSize", 10);
      } else {
        formData.append("pageNum", this.pageConf.pageNum);
        formData.append("pageSize", this.pageConf.pageSize);
      }
      formData.append("merchantId", this.search.merchantId);
      formData.append("shopName", this.search.shopName);
      formData.append("status", this.search.status);
      request.listAmazonAuth(formData).then((res) => {
        if (res.code == 200) {
          _this.amazonAuthList = res.data.list;
          _this.pageConf.totalCount = parseInt(res.data.total);
        } else {
          _this.$message.error(res.message);
        }
      });
    },
    amazonAuth () {
      var authUrl = "https://sellercentral.amazon.com/apps/authorize/consent?application_id=appidexample&state=stateexample&version=beta";
      window.open(authUrl, '_blank')
    },
  },
  mounted () {
    this.bindAmazonAuthList();
  },
  created () {
    var autotableheight = window.innerHeight - 350;
    this.autotableheight = autotableheight;
  }
}
</script>
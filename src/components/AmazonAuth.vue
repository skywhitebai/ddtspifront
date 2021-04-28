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
    </div>
  </div>
</template>
<script>
import request from "../api/request.js";
export default {

}
</script>
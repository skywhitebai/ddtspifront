<!-- 左侧菜单导航栏组件 -->

<template>
  <div class="app-nav-wrap">
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             router>
      <el-menu-item v-for="menu in menus"
                    :index="menu.route"
                    :key="menu.route">
        <i :class="menu.icon"></i>
        {{ menu.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.app-nav-wrap {
  text-align: left;
}
</style>
<script>
import cookieUtil from "../common/js/utils/cookieUtil.js";
export default {
  data () {
    return {
      menus: [],
      loginToken: "",
    };
  },
  methods: {
    checkLoginInfo () {
      var loginTokenNow = cookieUtil.getCookie("loginToken");
      if (loginTokenNow == null || loginTokenNow === "") {
        this.$router.push("/login");
        location.reload();
      }
      if (this.loginToken != loginTokenNow) {
        this.initMenus();
      }
      setTimeout(this.checkLoginInfo, 2000);
    },
    initMenus () {
      this.$store.state.options = [];
      this.$router.push({ path: "/" });
      //this.$router.push({ path: "/complaint" });
      // 刷新时以当前路由做为tab加入tabs
      this.$store.commit("add_tabs", { route: "/main", name: "首页" });
      if (this.$route.path !== "/") {
        this.$store.commit("add_tabs", {
          route: this.$route.path,
          name: this.$route.name,
        });
        this.$store.commit("set_active_index", this.$route.path);
      } else {
        this.$store.commit("set_active_index", "/main");
        this.$router.push("/main");
      }
      var isMainUser = cookieUtil.getCookie("isMainUser");
      var departmentName = cookieUtil.getCookie("departmentName");
      var isCountyDepartment = cookieUtil.getCookie("isCountyDepartment");
      var cityName = cookieUtil.getCookie("cityName");
      this.loginToken = cookieUtil.getCookie("loginToken");
      this.menus = [
        { route: "/main", name: "首页", icon: "el-icon-s-home" },
        { route: "/account", name: "账号管理", icon: "el-icon-user" },
        {
          route: "/authManage",
          name: "授权管理",
          icon: "el-icon-s-order",
        },
      ];
    },
  },
  mounted () {
    this.initMenus();
    this.checkLoginInfo();
  },
  computed: {
    options () {
      return this.$store.state.options;
    },
  },
};
</script>

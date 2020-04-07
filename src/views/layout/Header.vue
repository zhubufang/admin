<template>
  <div class="header d-flex align-items-center justify-content-between px-2 shadow-sm">
    <div class="bread d-flex align-items-center pointer">
      <div @click="isOpen">
        <i class="iconfont icon-icon_huabanfuben-copy" style="font-size:26px;" v-if="isCollapse"></i>
        <i class="iconfont icon-icon_huabanfuben" style="font-size:26px;" v-else></i>
      </div>
      <breadcrumb class="ml-3"></breadcrumb>
    </div>
    <el-dropdown trigger="click" class="d-flex align-items-center mr-2">
      <div class="d-flex align-items-end">
        <img src="@/assets/boy.png" class="user-avatar pointer" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>基本资料</el-dropdown-item>
        <el-dropdown-item @click.native.prevent="$router.push('/resetPassword')">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native.prevent="logOut">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import Breadcrumb from "./comonpents/breadcrumb";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      userImg: "static/images/user.jpg",
      routs: []
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations("app", ["isOpen"]),
    ...mapActions("user", ["loginOut"]),
    //登出
    logOut() {
      this.loginOut()
        .then(data => {
          if (data) {
            this.$router.push("/login");
          }
        })
        .catch(error => {});
    }
  },
  watch: {}
};
</script>
<style  lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>



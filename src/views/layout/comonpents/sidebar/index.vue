<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;overflow-x:hidden">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      router
      unique-opened
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#1890FF"
    >
      <sidebar-item v-for="route in menu" :key="route.name" :item="route"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";
import menu from "../../menu.js";
export default {
  components: {
    sidebarItem
  },

  data() {
    return {
      routes: [],
      //menu: menu.navBar
    };
  },
  computed: {
    ...mapGetters(["isCollapse","menu"])
  },
  mounted() {
    //console.log(this.menu, "菜单");
  },
  methods: {}
};
</script>

<style lang="scss">
.el-menu {
  border-right: none;
}
.el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>

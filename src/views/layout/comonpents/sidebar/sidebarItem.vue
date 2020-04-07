<template>
  <div>
    <!-- 判断是否为一级菜单 -->
    <template v-if="hasOneChild(item.submenu,item)">
      <el-menu-item :index="formmatPathname(item.pathname)">
        <i :class="['iconfont',item.icon]" style="margin-right:12px;color:#fff;font-size:18px;" v-if="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.name" popper-append-to-body>
      <template slot="title" v-if="item.name">
         <i :class="['iconfont',item.icon]" style="margin-right:12px;color:#fff;font-size:18px;" v-if="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <!-- 递归 -->
      <sidebar-item v-for="child in item.submenu" :key="child.name" :item="child"></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      routes: "",
      onlyOneChild: null,
      oneTitle: null
    };
  },
  computed: {},
  mounted() {},
  methods: {
    //判断是否是一级菜单
    hasOneChild(children = [], item) {
      if (children.length === 0) {
        return true;
      }
      return false;
    },
    //格式化
    formmatPathname(path) {
      path = path.replace(/_/g, "/");
      path = "/" + path;
      return path;
    }
  }
};
</script>

<style lang="scss">
.el-menu-item {
  min-width: 210px !important;
}
.el-menu-item .el-tooltip {
  width: auto!important;
}
</style>

<template>
  <div class="app-wrapper">
    <v-sidebar class="sidebar-container" :class="[{'hiden-sidebar':isCollapse}]"></v-sidebar>
    <div class="main-container" :class="[{'hiden-main':isCollapse}]">
      <v-head></v-head>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import vSidebar from "./comonpents/sidebar";
import breadcrumb from "./comonpents/breadcrumb";
import vHead from "./Header.vue";

import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    vHead,
    vSidebar,
    breadcrumb
  },

  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  mounted() {},
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "~@/common/css/scss/mixin.scss";
// @import "~@/common/css/scss/variables.scss";
.app-warpper {
  position: relative;
  height: 100%;
  width: 100%;
}

.sidebar-container {
  transition: width 0.28s;
  width: 210px !important;
  background: #304156;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.hiden-sidebar {
  width: 64px !important;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
}
.hiden-main {
  margin-left: 64px !important;
}
</style>

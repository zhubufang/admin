<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in  routs"
        :key="item.path"
        :to="{ path: item.path }"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
        routs:null
    };
  },
  created() {},
  computed: {
    ...mapGetters(["role"])
  },
  watch: {
    $route(route) {
      this.getRoutes();
    }
  },
  mounted() {
     this.getRoutes();
  },

  methods: {
    ...mapActions("user", ["setToken", "login"]),
    //面包屑
    getRoutes() {
      this.routs = this.$route.matched.map(item => {
        return item;
      });
      this.routs = this.routs.filter(item => {
        if (item.meta.title) {
          return item;
        }
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/stylus">


</style>

<template>
  <div id="app"  style="height:100%;">
    <router-view></router-view>

    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
  </div>
</template>

<script>
import imageDialog from "@/components/image/image-dialog.vue";
export default {
  components: {
    imageDialog
  },
  name: "app",
  // 依赖注入
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      maxChooseImage: 9
    };
  },
  methods: {
    chooseImage(callback, max = 9) {
      this.maxChooseImage = max;
      this.$refs.imageDialog.chooseImage(callback);
    }
  }
};
</script>

<style>
@import "./common/css/free.css";
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}

.filter-box {
  width: 100%;
  height: 50px;
}
/* 修改elementui样式 */
.el-dialog__header {
  background: #524D61;
}
.el-dialog__title {
  color: #ffffff!important;
}
</style>

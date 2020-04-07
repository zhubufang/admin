<template>
  <div class="wscn-http404-container">
      <div class="pic-404" style="width:50vw;height:50vh;">
        <img src="@/assets/404.png" alt="" style="width:100%;height:100%;">
        <p class="text-center mt-3">该页面不存在</p>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
.pic-404 {
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
}
</style>

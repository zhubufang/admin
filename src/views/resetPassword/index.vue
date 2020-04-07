<template>
  <div class="p-3 m-2" style="background-color:#F2F2F2;">
    <el-form ref="form" :data="form" label-width="100px">
      <el-form-item label="当前密码">
        <el-input v-model="form.password" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newP" type="password" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.newP1" type="password" style="width:200px;"></el-input>
      </el-form-item>
    </el-form>

    <div class="d-flex align-items-center justify-content-end">
      <el-button type="primary" @click.native="comfirm">保存</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        password: "",
        newP: "",
        newP1: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  methods: {
    ...mapActions("user", ["loginOut"]),
    //修改密码
    comfirm() {
      if (this.form.newP !== this.form.newP1) {
        this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
        return;
      }
      this.$service({
        method: "post",
        url: "/user/changePassword",
        data: {
          oldPassword: this.$md5(this.oldP),
          newPassword: this.$md5(this.newP),
          userId: this.user_id
        }
      })
        .then(res => {
          const { code } = res;
          if (code == 0) {
            this.logOut();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        })
        .catch(error => {});
    },
    logOut() {
      this.loginOut()
        .then(data => {
          if (data) {
            this.$router.push("/login");
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" ></style>

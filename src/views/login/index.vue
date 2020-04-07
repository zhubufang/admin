<template>
  <div class="loginPage-bg">
    <div class="form px-4 rounded">
      <p class="text-center font-weight-blod pt-2" style="font-size:20px;">登入后台</p>
      <el-form
        class="login-form"
        status-icon
        ref="loginForm"
        :rules="loginRules"
        :model="loginForm"
        label-width="0"
      >
        <!--model 表单数据对象 -->
        <el-form-item prop="username">
          <!--prop用于验证表单 -->
          <el-input size="small" prefix-icon v-model="loginForm.username" auto-complete="off">
            <!--auto-complete 自动补全 -->
            <!-- <i slot="prefix" class="icon-yonghu"></i> -->
          </el-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <el-input
              size="small"
              auto-complete="off"
              :type="passwordType"
              v-model="loginForm.password"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            >
              <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
            </el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item>
          <el-button
            style="width:100%;background:#15A397"
            type="primary"
            size="small"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "userlogin",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      checked: false,
      // 表单验证
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      redirect: null,
      otherQuery: {}
    };
  },
  created() {},
  computed: {
    ...mapGetters([])
  },
  watch: {
    $route(route) {
      const query = route.query;
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  },
  mounted() {},

  methods: {
    ...mapActions("user", ["setToken", "login"]),
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    // 获取路由的参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((arr, cur) => {
        if (cur !== "redirect") {
          arr[cur] = query[cur];
        }
        return arr;
      }, {});
    },

    //登入
    handleLogin() {
      this.loading = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login(this.loginForm)
            .then(res => {
              if (res) {
                this.loading = false;
                this.$router.push({ path: this.redirect || "/adminIndex" });
              }
            })
            .catch(error => {
              this.loading = false;
              this.$message({
                message: error,
                type: "error"
              });
            });
        } else {
          this.loading = false;
          this.$message({
            message: "用户名或密码不能为空",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped >
.loginPage-bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/login.jpg") center no-repeat;
  background-size: 100% 100%;
}

.form {
  position: fixed;
  right: 10vw;
  top: 30vh;
  margin: auto;
  width: 350px;
  min-height: 260px;
  height: auto;
  background: #fff;
}
</style>

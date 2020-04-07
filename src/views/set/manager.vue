<template>
  <div class="px-1">
    <div class="filter-box d-flex align-items-center my-2">
      <el-input type="text" v-model="loginName" placeholder="请输入用户名" style="width:180px;"></el-input>
      <el-button type="primary" class="mx-2" icon="el-icon-search" @click="filterData">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="openDialog('新增')">新增</el-button>
    </div>

    <div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="data"
        border
        stripe
        v-loading="loading"
        element-loading-text="数据加载中..."
        style="width: 100%;"
      >
        <el-table-column prop="loginName" width="210" label="用户名" align="center"></el-table-column>
        <el-table-column prop="roleName" width="200" label="所属角色" align="center"></el-table-column>
        <el-table-column prop="userStatus" width="200" align="center" label="状态">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.userStatus ? 'success' : 'danger'"
              size="mini"
              plain
            >{{scope.row.userStatus ? '启用' : '禁用'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column min-width="210" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openDialog('编辑',scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remove('/SysUser/delete','post',{id:scope.row.id})"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 -->
      <el-pagination
        v-if="pageShow"
        class="d-flex justify-content-end"
        background
        layout="prev, pager, next"
        :page-count="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.loginName" :disabled="form.id" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="form.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.userStatus" :label="1" size="mini" border>启用</el-radio>
          <el-radio v-model="form.userStatus" :label="0" size="mini" border>禁用</el-radio>
        </el-form-item>
      </el-form>
      <div class="d-flex align-items-center justify-content-end">
        <el-button @click.native.prevent="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit(form.id ? type='编辑' : type='新增')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
export default {
  mixins: [common],
  data() {
    return {
      roleOptions: [],
      loginName: "",
      data: [],
      form: {
        loginName: "",
        password: "",
        roleId: "",
        userStatus: 1
      }
    };
  },
  filters: {},
  created() {},
  mounted() {},
  methods: {
    //获取list请求参数
    getParams() {
      return {
        url: "/SysUser/list",
        method: "get",
        params: {
          name: this.loginName,
          ...this.page
        }
      };
    },
    //处理列表结果
    getListResult(e) {
      this.data = e.list;
      this.total = e.totalPage;
    },
    //处理id结果
    getDataByIdResult(e) {
      this.form = e;
      //console.log(e,'单个id结果');
    },
    //打开dialog
    openDialog(type, id = null) {
      if (type === "新增") {
        this.resetData();
      } else {
        this.getDataById("/SysUser/getById", "get", { id: id });
      }
      this.getRoleList();
      this.dialogTitle = type;
      this.dialogVisible = true;
    },
    //提交表单
    submit() {
      if (this.type === "新增") {
        this.form.password = this.$md5(this.form.password); //加密
        this.add("/SysUser/add", "post", this.form);
      } else {
        this.update("/SysUser/update", "post", this.form);
      }
    },

    //筛选
    filterData() {
      this.pageShow = false; //让分页隐藏
      this.$nextTick(() => {
        //重新渲染分页
        this.getList();
        this.pageShow = true;
      });
    },
    //重置参数
    resetData() {
      this.form = {
        loginName: "",
        password: "",
        roleId: "",
        userStatus: 1
      };
    },
    //获取角色列表
    getRoleList() {
      this.$service({
        url: "/SysRole/list",
        method: "get",
        params: {
          page: 1,
          pageSize: 100
        }
      }).then(res => {
        if (res.code === 200) {
          let data = res.data;
          this.roleOptions = data.list;
        }
      });
    }
  }
};
</script>

<style>
.el-tree-node__content {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
.el-tree-node__label {
  margin-left: 20px !important;
}
</style>

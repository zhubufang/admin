<template>
  <div class="px-1">
    <div class="filter-box d-flex align-items-center my-2">
      <el-input v-model="roleName" type="text" placeholder="请输入用户名" style="width:180px;"></el-input>
      <el-button type="primary" class="mx-2" icon="el-icon-search" @click="filterData">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="openDialog('新增')">新增</el-button>
    </div>

    <div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="data"
        v-loading="loading"
        border
        stripe
        element-loading-text="数据加载中..."
        style="width: 100%;"
      >
        <el-table-column prop="roleName" width="210" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="remark" width="200" label="角色描述" align="center"></el-table-column>
        <el-table-column prop="status" width="200" align="center" label="状态">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.status ? 'success' : 'danger'"
              size="mini"
              plain
            >{{scope.row.status ? '启用' : '禁用'}}</el-button>
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
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openDrawer(scope.row.id,scope.row.rules)"
            >配置权限</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remove('/SysRole/delete','post',{id:scope.row.id})"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 -->
      <el-pagination
        v-if="pageShow && data.length"
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
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.remark" type="textarea" :rows="4" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.status" :label="1" size="mini" border>启用</el-radio>
          <el-radio v-model="form.status" :label="0" size="mini" border>禁用</el-radio>
        </el-form-item>
      </el-form>
      <div class="d-flex align-items-center justify-content-end">
        <el-button @click.native.prevent="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit(form.id ? type='编辑' : type='新增')">确定</el-button>
      </div>
    </el-dialog>

    <el-drawer title="权限配置" :visible.sync="drawer" :before-close="handleCloseDrawer">
      <div style="position: absolute;top:52px;left: 0;right: 0;bottom: 0;">
        <el-tree
          :data="drawerData"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :check-strictly="true"
          :default-checked-keys="checkedKeys"
          @check="check"
        ></el-tree>
        <div
          style="height: 60px;position: absolute;bottom: 0;right: 0;left: 0;"
          class="border d-flex align-items-center px-3 bg-white"
        >
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="configRules">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
import { toTree } from "@/common/util.js";
export default {
  mixins: [common],
  data() {
    return {
      drawer: false,
      data: [],
      roleId: "",
      roleName: "", //筛选条件
      menuIds: [],
      form: {
        roleName: "",
        remark: "",
        status: 1,
        rules: []
      },
      checkedKeys: [], //默认选中
      defaultProps: {
        label: "menuName",
        children: "children"
      },
      drawerData: []
    };
  },
  filters: {},
  created() {},
  mounted() {},
  methods: {
    //获取list请求参数
    getParams() {
      return {
        url: "/SysRole/list",
        method: "get",
        params: {
          name: this.roleName,
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
        this.getDataById("/SysRole/getById", "get", { id: id });
      }
      this.dialogTitle = type;
      this.dialogVisible = true;
    },
    //提交表单
    submit() {
      if (this.type === "新增") {
        this.add("/SysRole/add", "post", this.form);
      } else {
        this.update("/SysRole/update", "post", this.form);
      }
    },
    //打开drawer
    openDrawer(id, rules) {
      this.roleId = id;
      let checkedKeys = rules.map(item => item.id);
      this.menuIds = checkedKeys;
      this.getRuleList(checkedKeys);
      this.drawer = true;
    },
    //关闭drawer
    handleCloseDrawer() {
      this.$confirm("还有未保存的工作哦确定关闭吗？")
        .then(_ => {
          this.drawer = false;
        })
        .catch(_ => {
          this.drawer = false;
        });
    },
    //配置权限
    configRules() {
      this.$service({
        url: "/SysRole/updateRoleMenu",
        method: "post",
        data: {
          roleId: this.roleId,
          menuIds: this.menuIds
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.getList();
          this.drawer = false;
        }
      });
    },
    //当复选框被点击的时候触发
    check(...e) {
      //this.form.rules=e
      this.menuIds = e[1].checkedKeys;
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
        roleName: "",
        remark: "",
        status: 1
      };
    },
    //获取rule list
    getRuleList(checkedKeys) {
      console.log(checkedKeys);
      this.$service({
        url: "/SysMenu/list",
        method: "get"
      }).then(res => {
        if (res.code === 200) {
          let data = res.data;
          this.drawerData = [];
          let response = toTree(data, 0);
          this.drawerData = response;
          this.checkedKeys = checkedKeys;
        }
      });
    }
  }
};
</script>

<style>
</style>

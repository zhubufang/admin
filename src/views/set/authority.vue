<template>
  <div class="px-3 mt-2">
    <div class="filter-box d-flex align-items-center my-2">
      <el-button type="primary" icon="el-icon-plus" @click="openDialog('新增')" size="mini" v-auth="'添加权限'">添加权限</el-button>
    </div>

    <el-tree
      :data="data"
      v-loading="loading"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div>
          <span :class="['iconfont',data.icon ? data.icon : '']" class="mr-2 text-muted"></span>
          <span :class="[data.level===0 ? 'font-weight-bold':'']">{{ data.menuName }}</span>
          <span v-if="data.menuType" class="badge ml-2">{{data.path}}</span>
          <span v-else class="badge badge-secondary ml-2">{{data.rule}}</span>
        </div>
        <span>
          <el-button type="text" size="mini" @click="openDialog('新增',data.id)">增加</el-button>
          <el-button type="text" size="mini" @click="openDialog('编辑',data.id)">修改</el-button>
          <el-button
            type="text"
            size="mini"
            @click="remove('/SysMenu/delete','post',{id:data.id})"
            style="color:red"
          >删除</el-button>
        </span>
      </span>
    </el-tree>

    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" label-width="140px">
        <el-form-item label="上级规则">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option
              v-for="item in ruleOptions"
              :key="item.id"
              :label="item | tree"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面/规则">
          <el-radio v-model="form.menuType" :label="1" border size="mini">页面</el-radio>
          <el-radio v-model="form.menuType" :label="0" border size="mini">规则</el-radio>
        </el-form-item>
        <el-form-item label="是否在菜单栏显示" v-if="form.menuType">
          <el-radio v-model="form.isShow" :label="1" border size="mini">是</el-radio>
          <el-radio v-model="form.isShow" :label="0" border size="mini">否</el-radio>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.menuName" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="form.menuType">
          <el-input v-model="form.icon" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="前端路由路径" v-if="form.menuType">
          <el-input v-model="form.path" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="后台规则" v-if="!form.menuType">
          <el-input v-model="form.rule" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" v-if="!form.menuType">
          <el-select v-model="form.method" placeholder="请选择">
            <el-option
              v-for="item in methodOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前端路由别名" v-if="form.menuType">
          <el-input v-model="form.alias" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.menuStatus" :label="1" border size="mini">启用</el-radio>
          <el-radio v-model="form.menuStatus" :label="0" border size="mini">禁用</el-radio>
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
import { toTree, toList } from "@/common/util.js";
export default {
  mixins: [common],
  data() {
    return {
      ruleOptions: [
        {
          menuName: "顶级规则",
          id: 0
        }
      ],
      methodOptions: [
        {
          label: "GET",
          id: "1"
        },
        {
          label: "POST",
          id: "2"
        }
      ],
      defaultProps: {
        label: "menuName",
        children: "children"
      },
      data: [],
      form: {
        menuName: "",
        pid: 0,
        path: "",
        alias: "", //路由别名
        icon: "",
        rule: "", //后端规则
        method: 1, //请求方式
        menuType: 1,
        isShow: 1,
        menuStatus: 1
      }
    };
  },
  filters: {
    tree(item) {
      if (item.level === 0) {
        return item.menuName;
      }
      let str = "";
      for (let i = 0; i < item.level; i++) {
        str += i == 0 ? "|--" : "--";
      }
      return str + " " + item.menuName;
    }
  },
  // dom渲染完毕
  mounted() {},
  methods: {
    //获取list请求参数
    getParams() {
      return {
        url: "/SysMenu/list",
        method: "get"
      };
    },
    //处理列表结果
    getListResult(e) {
      let res = toTree(e, 0);
      this.data = res;
    },
    //处理id 结果
    getDataByIdResult(e) {
      this.form = e;
    },
    //打开dialog
    openDialog(type, id) {
      if (type === "新增") {
        this.resetData();
        if (id) {
          this.form.pid = id;
        }
      } else {
        this.getDataById("/SysMenu/getById", "get", { id: id });
      }
      this.getRuleList();
      this.dialogTitle = type;
      this.dialogVisible = true;
    },
    // //点击树节点
    handleNodeClick() {},
    // //新增根节点
    // addNode(node, data) {
    //   console.log(data);
    //   data.children.push({
    //     id: 3,
    //     label: "二级",
    //     children: []
    //   });
    // },
    //提交表单
    submit() {
      if (this.type === "新增") {
        this.add("/SysMenu/add", "post", this.form);
      } else {
        this.update("/SysMenu/update", "post", this.form);
      }
    },
    // //删除节点
    // removeNode(node, data) {
    //   let parent = node.parent;
    //   let children = parent.data.children || parent.data;
    //   let index = children.findIndex(v => {
    //     return v.id === data.id;
    //   });
    //   children.splice(index, 1);
    // },
    resetData() {
      this.form = {
        menuName: "",
        pid: 0,
        path: "",
        alias: "", //路由别名
        icon: "",
        rule: "", //后端规则
        method: 1, //请求方式
        menuType: 1,
        isShow: 1,
        menuStatus: 1
      };
    },
    //获取rule list
    getRuleList() {
      this.$service({
        url: "/SysMenu/list",
        method: "get"
      }).then(res => {
        if (res.code === 200) {
          this.ruleOptions = [
            {
              menuName: "顶级规则",
              id: 0,
              level: 0
            }
          ];
          let data = res.data;
          data = toTree(data, 0);
          data = toList(data);
          this.ruleOptions = [...this.ruleOptions, ...data];
        }
      });
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__content {
  padding-top: 18px !important;
  padding-bottom: 18px !important;
}
</style>

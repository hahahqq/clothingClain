<template>
  <div>
    <div class="content-eighty">
      <div class="content-center">
        <el-row>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="showAddStore = true">
              新增
            </el-button>

            <el-dropdown
              size="small"
              style="margin-left: 10px"
              @command="handleDropDown"
            >
              <el-button size="small" type="">
                导入
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">导入</el-dropdown-item>
                <el-dropdown-item command="2">导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="16" style="text-align: right">
            状态：
            <el-select
              v-model="status"
              clearable
              size="small"
              style="width: 120px; float: left"
              placeholder="请选择状态"
            >
              <el-option value="0" label="启用"></el-option>
              <el-option value="1" label="停用"></el-option>
            </el-select>

            <el-input
              size="small"
              v-model="searchText"
              placeholder="输入店仓名称或编码"
              style="width: 200px; margin-left: 10px"
            ></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--列表-->

    <div class="content-table-center">
      <div
        :style="`
          width: 15%;
          float: left;
          border-right: 1px solid #ddd;

          height: ${tableHeight}px
        `"
      >
        <span
          class="content-title"
          style="
            width: 100%;
            float: left;
            line-height: 40px;
            height: 40px;
            padding: 0 10px;

            border-bottom: 1px solid #ddd;
          "
        >
          组织架构
          <i
            class="el-icon-edit-outline pull-right font-18"
            style="color: #409eff; line-height: 40px; height: 40px"
            @click="addSupplierType"
          ></i>
        </span>

        <span style="width: 100%; float: left; padding: 10px 0">
          <Tree
            expand="true"
            :data="treeData"
            @on-select-change="handleNodeClick"
            empty-text="暂无供应商类别"
          ></Tree>
        </span>
      </div>

      <div style="width: 85%; float: left" :style="`height: ${tableHeight}px`">
        <span
          class="content-title"
          style="
            width: 100%;
            float: left;
            line-height: 40px;
            height: 40px;
            padding: 0 10px;

            border-bottom: 1px solid #ddd;
          "
        >
          所属分类 ： 全部分类
        </span>

        <span style="width: 100%; padding: 10px; float: left">
          <el-table
            :data="tableData"
            size="small"
            :height="tableHeight - 50"
            header-row-class-name="bg-theme2 text-f3"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              fixed="left"
            ></el-table-column>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="ownMoney" label="性质"></el-table-column>
            <el-table-column prop="ownMoney" label="组织架构"></el-table-column>
            <el-table-column prop="linker" label="联系人"></el-table-column>
            <el-table-column
              prop="mobile"
              label="联系电话"
              width="110"
            ></el-table-column>
            <el-table-column prop="ownMoney" label="地区"></el-table-column>
            <el-table-column prop="ownMoney" label="地址"></el-table-column>
            <el-table-column prop="ownMoney" label="营业状态"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">
                <span> {{ scope.row.state == 0 ? "停用" : "启用" }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button size="small" type="text">编辑</el-button>
                <el-button size="small" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </span>
      </div>
    </div>

    <Drawer v-model="addSupplierTypeDialog" placement="left" width="400">
      <template> 5555 </template>
    </Drawer>

    <!-- 新增 / 编辑店仓 -->
    <add-store-modal
      v-if="showAddStore"
      @closeModal="showAddStore = false"
    ></add-store-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import addStoreModal from "./add.vue";
export default {
  data() {
    return {
      wrapperWidth: 0,
      wrapperLeft: 0,
      searchText: "",
      status: "",

      tableHeight: document.body.clientHeight - 200,

      tableData: [
        {
          name: "总仓",
          id: "001",
          ownMoney: "100",
          mobile: "18888866666",
          linker: "李四",
          state: 0,
          TYPEID: 1,
          TYPENAME: "分类1",
          REMARK: "供应商一",
        },
        {
          name: "分仓",
          id: "002",
          ownMoney: "200",
          mobile: "18888866666",
          linker: "张三",
          state: 0,
          TYPEID: 2,
          TYPENAME: "分类2",
          REMARK: "供应商二",
        },
      ],

      treeData: [
        {
          TYPEID: "-1",
          title: "全部架构",
          expand: true,
          children: [
            {
              TYPEID: 1,
              title: "注册商家名称",
            },
            {
              TYPEID: 2,
              title: "归属客户名称",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },

      addSupplierTypeDialog: false,
      showAddStore: false,
    };
  },
  computed: {
    ...mapGetters({}),
    outerClasses() {
      const classesArray = [
        `${this.prefix}-wrapper`,
        this.canMove ? "no-select pointer-events-none" : "",
      ];
      return classesArray.join(" ");
    },
    placement() {
      return this.$attrs.placement;
    },
    innerWidth() {
      const width = this.width;
      return width <= 100 ? (this.wrapperWidth * width) / 100 : width;
    },
    triggerStyle() {
      return {
        [this.placement]: `${this.innerWidth}px`,
        position: this.$attrs.inner ? "absolute" : "fixed",
      };
    },
  },
  watch: {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleNodeClick(data, node) {
      console.log(data, node);
    },
    addSupplierType() {
      this.addSupplierTypeDialog = true;
    },
    handleDropDown(type) {
      if (type == 1) {
        console.log("导入");
      } else {
        console.log("导出");
      }
    },
  },
  mounted() {},
  beforeCreate() {},
  components: {
    addStoreModal
  },
};
</script>
<style scoped>
.member-header {
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}
.center-cont {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header {
  padding: 0 !important;
}
.shop {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name {
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
  /* background: rebeccapurple; */
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.member-main-top {
  width: 99%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 150px;
  background: #fff;
}

.member-main-top-buttom {
  height: 70px;
  width: 100%;
  line-height: 70px;
}
.member-main-top-type {
  height: 70px;
  width: 100%;
  line-height: 70px;
}
</style>



<template>
  <div>
    <div class="content-eighty">
      <div class="content-center">
        <el-row>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="showAddSupplier = true"> 新增 </el-button>

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

            <el-dropdown
              size="small"
              style="margin-left: 10px"
              @command="handleDropDown1"
            >
              <el-button size="small" type="">
                批量编辑
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">批量删除</el-dropdown-item>
                <el-dropdown-item command="2">批量启用</el-dropdown-item>
                <el-dropdown-item command="3">批量停用</el-dropdown-item>
                <el-dropdown-item command="4">批量修改分类</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="16" style="text-align: right">
            状态：
            <el-select
              v-model="status"
              size="small"
              clearable
              placeholder="请选择状态"
            >
              <el-option value="0">启用</el-option>
              <el-option value="1">停用</el-option>
            </el-select>
            <el-input
              size="small"
              v-model="searchText"
              placeholder="输入编号、名称、联系人等"
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
          供应商类别
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
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column type="selection" width="50"> </el-table-column>

            <el-table-column
              type="index"
              label="序号"
              width="60"
              fixed="left"
            ></el-table-column>
            <el-table-column prop="id" label="供应商编号"></el-table-column>
            <el-table-column
              prop="name"
              label="供应商名称"
              width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="text">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="ownMoney" label="应付余额"></el-table-column>
            <el-table-column
              prop="TYPENAME"
              label="供应商类别"
            ></el-table-column>
            <el-table-column prop="linker" label="联系人"></el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号"
              width="100"
            ></el-table-column>
            <el-table-column label="座机"></el-table-column>
            <el-table-column
              label="QQ / 微信 / 邮箱"
              width="130"
            ></el-table-column>
            <el-table-column label="地址"></el-table-column>
            <el-table-column
              prop="REMARK"
              label="备注"
              show-overflow-tooltip
            ></el-table-column>

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
      <template>
        5555
      </template>
    </Drawer>

    <!-- 新增 / 编辑供应商 -->
    <add-supplier-modal
      v-if="showAddSupplier"
      @closeModal="showAddSupplier = false"
    ></add-supplier-modal>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import addSupplierModal from "./add.vue";
export default {
  data() {
    return {
      wrapperWidth: 0,
      wrapperLeft: 0,
      searchText: "",
      status: "",
      showAddSupplier: false,

      tableHeight: document.body.clientHeight - 200,

      tableData: [
        {
          name: "广州锦绣服饰有限公司",
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
          name: "广州白马服饰市场",
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
          title: "全部类别",
          expand: true,
          children: [
            {
              TYPEID: 1,
              title: "分类1",
            },
            {
              TYPEID: 2,
              title: "分类2",
            },
            {
              TYPEID: 3,
              title: "分类3",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },

      addSupplierTypeDialog: false,
      multipleSelection: []
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
    handleDropDown1(type) {
      if(this.multipleSelection.length == 0){
        this.$message.warning('请勾选要批量操作的数据 !')
        return
      }

      if (type == 1 || type == 2 || type == 3) {
        let title = type == 1 ? '删除' : type  == 2 ? '启用' : '停用'
        this.$confirm('确定要' + title +'选中的 '+ this.multipleSelection.length +' 个供应商吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // function
        }).catch(() => { });

      }else {

        // 批量修改分类

      }
    },
  },
  mounted() {},
  beforeCreate() {},
  components: {
    addSupplierModal
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



<template>
  <div class="main">
    <aside
      v-if="routesList.length>0"
      :class="{'isFix innerbox':isFix}"
      :style="{'width':width+'px','color':textColor,'background-color':bgColor,'border-right': 'solid 1px #EBEDF0'}"
    >
      <ul class="block">
        <li class="block-top">
         <span>收银中心</span>
        </li>
        <li
          v-for="(item,i) in routesList"
          :key="i"
          class="titele"
          v-if="!item.hidden"
          v-show="deskmode==item.meta.deskmode? false:true"
          :class="{'bg-themes':activePath == item.path,'text-whites':activePath == item.path}"
        >
            <a
              class="block el-menu-item"
              :class="{'is-active':activePath == item.path}"
              @click="toFollowLink(item)"
            >
              <div slot="title" style="font-size:12px;">
                <span style="position: relative;" :style="{'colors':activePath == item.path?ActiveTextColor:textColor}">
                  {{item.name}}
                  <el-badge  v-if="item.name=='挂单取单'?true:false"  :value="$store.state.guadanc.guadancxlistBillCount" class="item title-cont">
                  </el-badge>
                  </span>
              </div>
            </a>
          <div
            v-if="item.meta.title"
            class="paddingLR-sm p-top-sm font-14 relative bg-white text-a9"
            :class="{'border-top1':item.meta.line}"
          >
           <!-- <div class="name"></div> -->
          </div>
        </li>
      </ul>
    </aside>
    <div>
            <el-dialog
                v-if="showAddNew"
                title="新增会员"
                :visible.sync="showAddNew"
                width="800px"
                style="max-width:100%;"
            >
                <add-new-member
                    @closeModal="showAddNew=false"
                    @resetList="showAddNew=false;"
                ></add-new-member>
            </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUserInfo} from '@/api/index'
export default {
  props: {
    routesList: {
      type: Array,
      default: []
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    textColor: {
      type: String,
      default: "#757575"
    },
    ActiveTextColor: {
      type: String,
      default: "#fff"
    },
    width: {
      type: [String, Number],
      default: "130"
    }
  },
  data() {
    return {
      activePath: "",
      isFix: false,
      deskmode:'',
      showAddNew:false,
    };
  },
  methods: {
    toFollowLink(item) {
      console.log("点击收银",item)
      if(item.name=="增加会员"){
        this.showAddNew=true;
      }else{
        this.$store.dispatch("selectingMember", {});
        let agentPermission = getUserInfo().List
        let arr = agentPermission.filter(element => element.MODULECODE == item.modulecode);
        if (arr.length > 0 && !this.isPurViewFun(arr[0].MODULECODE)) {
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        } else {
          this.activePath = item.path;
          this.$router.push({ path: item.path });
        }

      }
    },
  },
  created() {
    this.activePath = this.$route.path;
    let getUser = getUserInfo();
    console.log("getUser")
    console.log(getUser.TradeType)
    console.log("getUser")
    this.deskmode=getUser.TradeType
  },
  mounted() {
    var _this = this;
    var scrollDiv = document.getElementById("content");
    scrollDiv.addEventListener(
      "scroll",
      function() {
        _this.scrollTop = scrollDiv.scrollTop;
        _this.isFix = _this.scrollTop >= 20 ? true : false;
      },
      true
    );
    this.$store.dispatch("getmemberQRcodeurlstate", {}).then(() => {});
  },
  beforeCreate() {
    this.$store.dispatch("getguadancxlistState", {}).then(() => {});
    this.$store.dispatch('selectingMember',{isArr:false,data:new Object()})
  },
  components: {
      addNewMember: () => import("@/components/member/add"),
  },
  activated() {},
};
</script>
<style scoped>
.block-top{
  height:50px;
  line-height: 50px;
  text-align: center;
  width:100%;
  background-color:#fff;
  border-bottom: solid 1px #EBEDF0;
  font-weight: bold;
  margin-bottom: 10px;
}
.el-menu-item,
.menuitem {
  height: 30px;
  line-height: 30px;
  padding: 0!important;
}
.el-menu-item.is-active {
  /* background-color: #D9DADB !important; */
  color: #444444!important;
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  background-color: #EBEDF0;
}
.el-menu-item:not(.is-active):hover {
  /* background: rgba(204, 204, 204); */
      width: 80%!important;
      margin-left: 10%!important;
      margin-right:10%!important;
}
.isFix {
  position: fixed;
  top: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
}
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.05);
}
  .main {
    display: flex;
    position: absolute;
    top: 0px;
    bottom: 0px;
    overflow: hidden;
    height: 100%;
    /* border-right:  solid 1px #EBEDF0; */
  }
    .main aside {
      /* margin-top: 45px; */
      flex: 0 0 100px;
      width: 100px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .titele{
      position: relative;
      margin-bottom: 10px;
      /* margin: 2px 0; */
    }
    .title-cont{
      display: inline-block;
      text-align: center;
      position: absolute;
      top: -23px;
      right: -12px;
    }
    .title-cont >>>.el-badge__content{
      height: 15px !important;
      line-height: 15px !important;
      padding: 0 3px!important;
      background-color: #FF3B30!important;
    }
    .bg-themes{
      /* background: #EBEDF0; */
      width: 80%;
      margin-left: 10%;
      margin-right: 10%;
    }
    .bg-themes:hover{
      width: 80%!important;
      margin-left: 10%!important;
      margin-right: 10%!important;
    }
    .text-whites{
      color: #444444 !important;
    }
    .border-top1{
      border-bottom: solid 1px #DDDDDD;
      width: 60%!important;
      margin-left: 20%!important;
      margin-right: 20%!important;
      background: #fff!important;
      /* height: 10px; */
    }
    .border-top1 .name{
      position: absolute;
      top: 13px;
      left: 28px;
      width:40px;
      height:1px;
      font-size:0;
      background:#DDDDDD;
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

</style>


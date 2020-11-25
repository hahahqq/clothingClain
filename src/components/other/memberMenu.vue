<template>
  <div class="main">
    <aside
      v-if="routesList.length>0"
      :class="{'isFix innerbox':isFix}"
      :style="{'width':width+'px','color':textColor,'background-color':bgColor}"
    >
      <ul class="block" style="margin-top:10px;">
        <!-- <li style="height:20px;width:100%;">
          <i class="el-icon-s-fold"></i>
        </li> -->
        <li
          v-for="(item,i) in routesList"
          :key="i"
          class="titele"
          v-if="!item.hidden"
          v-show="deskmode==item.meta.deskmode? false:true"
          :class="{'bg-themes':activePath == item.path,'text-whites':activePath == item.path}"
        >
          <div class="title-cont" v-if="item.name=='挂单取单'?true:false">{{$store.state.guadanc.guadancxlistBillCount}}</div>

            <a
              class="block el-menu-item"
              :class="{'is-active':activePath == item.path}"
              @click="toFollowLink(item)"
            >
              <div slot="title" style="font-size:12px;">
                <span :style="{'colors':activePath == item.path?ActiveTextColor:textColor}">{{item.name}}</span>
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
    };
  },
  
  methods: {
    toFollowLink(item) {
      console.log(item)
      this.$store.dispatch("selectingMember", {});
      let agentPermission = getUserInfo().List
      let arr = agentPermission.filter(element => element.MODULENAME == item.name);

      if(item.meta.title == '支出中心' && !this.isPurViewFun(91040113)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else if(arr.length > 0 && !this.isPurViewFun(arr[0].MODULECODE)) {
        if(item.name == '会员分析'){
          this.activePath = item.path;
          this.$router.push({ path: item.path });
        }else{
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }
      }else if(item.path == '/setup/shop' && !this.isPurViewFun(91040301)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else if(item.name == '库存报表' && !this.isPurViewFun(91040111)) {
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else if(item.name == '员工分析' && !this.isPurViewFun(91040416)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else{
        this.activePath = item.path;
        this.$router.push({ path: item.path });
      }
    },
  },
  created() {
    this.activePath = this.$route.path;
    let getUser = getUserInfo();
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
    // this.$store.dispatch("getmemberQRcodeurlstate", {}).then(() => {});
  },
  beforeCreate() {
    // this.$store.dispatch("getguadancxlistState", {}).then(() => {
    //     console.log('123456')
    // });
    this.$store.dispatch('selectingMember',{isArr:false,data:new Object()})
  },
  activated() {},
};
</script>
<style scoped>
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
    border-right:  solid 1px #EBEDF0;
  }
    .main aside {
      margin-top: 50px;
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
      position: absolute;
      right: 20px;
      top: 5px;
      height: 15px;
      width: 15px;
      border-radius: 100%;
      background: red;
      font-size: 8px;
      color: #fff;
      text-align: center;
      line-height: 15px;
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
</style>


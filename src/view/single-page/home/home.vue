<template>
  <div class="home">
      <el-row style="">
        <el-col :span="19">
          <div class="bgwhitecolor home-border-r">
            <div class="Management_sock">
              <div class="fontsizeclass">
                <span class="pull-left text-666">今日数据</span>
              </div>
              <div class="Management_sock_con">
                <div class="triggerAreport"></div>
                <el-row>
                  <el-col :span="6">
                    <p>收支结余</p>
                    <p class="monthReport1" @click="routeLink">
                      {{ headerDateGainInfo.MONEY1 ? headerDateGainInfo.MONEY1 : "--" }}
                    </p>
                    <p>
                      昨日：
                      <i class="Report1">
                        {{ headerDateGainInfo.MONEY2 ? headerDateGainInfo.MONEY2 : "--" }}
                      </i>
                    </p>
                  </el-col>
                  <el-col :span="6">
                    <p>消费金额</p>
                    <p class="monthReport2">
                      {{ headerDateSaleInfo.SUMMONEY1 ? headerDateSaleInfo.SUMMONEY1 : "--" }}
                    </p>
                    <p>
                      昨日：
                      <i class="Report2">
                        {{ headerDateSaleInfo.SUMMONEY2 ? headerDateSaleInfo.SUMMONEY2 : "--" }}
                      </i>
                    </p>
                  </el-col>
                  <el-col :span="6">
                    <p>充值金额</p>
                    <p class="monthReport4">
                      {{ headerDateAddInfo.SUMMONEY1 ? headerDateAddInfo.SUMMONEY1 : "--" }}
                    </p>
                    <p>
                      昨日：
                      <i class="Report4">
                        {{ headerDateAddInfo.SUMMONEY2 ? headerDateAddInfo.SUMMONEY2 : "--" }}
                      </i>
                    </p>
                  </el-col>
                  <el-col :span="6">
                    <p>新增会员</p>
                    <p class="systemRemind2">
                      {{
                        homedaycombackobj.ToDayRegVipCount
                          ? homedaycombackobj.ToDayRegVipCount
                          : "--"
                      }}
                    </p>
                    <p>
                      昨日：
                      <i class="systemRemind3">
                        {{
                          homedaycombackobj.ToDayRegVipCount2
                            ? homedaycombackobj.ToDayRegVipCount2
                            : "--"
                        }}
                      </i>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="5" class="pull-right">
          <div class="bgwhitecolor home-border-r" style="padding: 0; height: 170px">
            <img
              src="@/static/images/banner.png"
              style="width: 100%; height: 170px; border-radius: 2px"
            />
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 8px">
        <el-col :span="19">
          <!-- 最近七天销售情况 -->
          <el-row>
            <el-col :span="24">
              <div class="bgwhitecolor home-border-r">
                <div class="Management_sock fontsizeclass" style="padding-bottom: 0px">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      {{ curDateType == 0 ? "近七天" : "本月" }}销售情况
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="0">七天</el-dropdown-item>
                      <el-dropdown-item command="1">本月</el-dropdown-item>
                      <el-dropdown-item command="2" style="color: #137deb">
                        查看详细分析
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div
                  id="main"
                  style="height: 280px; position: relative"
                  :loading="mainloading"
                  element-loading-text="图表数据加载中..."
                  v-loading="mainloading"
                ></div>
              </div>
            </el-col>
          </el-row>

          <!-- 提醒事项 -->
          <el-row style="margin-top: 8px">
            <el-col :span="24">
              <div class="bgwhitecolor home-border-r">
                <div class="Management_sock">
                  <div class="fontsizeclass">
                    <span class="pull-left text-666">提醒事项</span>
                  </div>
                  <div class="Management_sock_con">
                    <div class="triggerAreport"></div>
                    <el-row>
                      <el-col :span="6">
                        <p>剩余库存</p>
                        <p class="monthReport1" @click="stockChange()">
                          {{ stockQty != "" ? stockQty : "--" }}
                        </p>
                      </el-col>
                      <el-col :span="6">
                        <p>本月生日</p>
                        <p class="monthReport2" @click="brithdayChange()">
                          {{ noticeInfo.BirthVip != "" ? noticeInfo.BirthVip : "--" }}
                        </p>
                      </el-col>
                      <el-col :span="6">
                        <p>会员过期提醒</p>
                        <p class="monthReport4" @click="brithdayChange()">
                          {{ noticeInfo.InvallVip ? noticeInfo.InvallVip : "--" }}
                        </p>
                      </el-col>
                      <el-col :span="6">
                        <p>本月新增会员</p>
                        <p class="monthReport4" @click="addMember()">
                          {{ noticeInfo.AddVip ? noticeInfo.AddVip : "--" }}
                        </p>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 排行榜 -->
          <el-row style="margin-top: 8px">
            <el-col :span="24">
              <div class="bgwhitecolor home-border-r">
                <el-row :gutter="10">
                  <el-col :span="24" class="p-top-md">
                    <i class="font-600" style="margin-left: 20px">排行榜 &nbsp;</i>
                    <el-select
                      size="mini"
                      v-model="curSortId"
                      @change="changePaiHang(curSortId)"
                      style="width: 72px"
                    >
                      <el-option
                        v-for="(item, index) in listPaiHang"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>

                <el-row element-loading-text="排行榜 数据加载中..." v-loading="loading3">
                  <el-col :span="8" style="padding: 5px 0px">
                    <span style="margin-left: 20px">商品销量（个）</span>
                    <div class="groupStyle">
                      <div class="group_title">
                        <span class="pull-left">商品</span>
                        <span class="pull-right">{{ curSortName }}</span>
                      </div>
                      <div class="group_cont" v-if="tableData1.length != 0">
                        <div v-for="(item, index) in tableData1" :key="index">
                          <span class="pull-left">{{ item.GOODSNAME }}</span>
                          <span class="pull-right">{{ item.QTY }}</span>
                        </div>
                      </div>
                      <div class="emptyData" v-else>
                        <img src="static/images/emptyData.png" alt="" width="100%" height="100px" />
                        <span style="color: #868686">暂无数据</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding: 5px 10px">
                    <span>会员消费额（元）</span>
                    <div class="groupStyle">
                      <div class="group_title">
                        <span class="pull-left">昵称</span>
                        <span class="pull-right">{{ curSortName }}</span>
                      </div>
                      <div class="group_cont" v-if="tableData2.length != 0">
                        <div v-for="(item, index) in tableData2" :key="index">
                          <span class="pull-left">{{ item.VIPNAME }}</span>
                          <span class="pull-right">{{ item.MONEY }}</span>
                        </div>
                      </div>
                      <div class="emptyData" v-else>
                        <img src="static/images/emptyData.png" alt="" width="100%" height="100px" />
                        <span style="color: #868686">暂无数据</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding: 5px 10px">
                    <span>支出金额（元）</span>
                    <div class="groupStyle">
                      <div class="group_title">
                        <span class="pull-left">支出项目</span>
                        <span class="pull-right">{{ curSortName }}</span>
                      </div>
                      <div class="group_cont" v-if="tableData3.length != 0">
                        <div v-for="(item, index) in tableData3" :key="index">
                          <span class="pull-left">{{ item.PAYTYPENAME }}</span>
                          <span class="pull-right">{{ item.EXPENDMONEY }}</span>
                        </div>
                      </div>
                      <div class="emptyData" v-else>
                        <img src="static/images/emptyData.png" alt="" width="100%" height="100px" />
                        <span style="color: #868686">暂无数据</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="5">
          <el-row
            class="rightSmallTitle"
            v-for="(item, index) in rigthList"
            :key="index"
            style="margin-bottom: 8px"
          >
            <div
              v-if="index == 0 || index == 1"
              class="bgwhitecolor home-border-r toolItem"
              style="height: 90px; padding: 12px 12px"
            >
              <span>
                <el-col :span="5" style="float: left">
                  <img :src="item.img" alt="" class="vertical-middle" width="44px" height="44px" />
                </el-col>

                <el-col :span="19" style="float: left">
                  <span style="margin-top: 0" class="text-666">{{ item.title }}</span>
                  <span class="h6" style="color: #868686">{{ item.des }}</span>
                </el-col>
              </span>
            </div>

            <div
              v-if="index == 2"
              class="bgwhitecolor home-border-r toolItem"
              style="height: 90px; padding: 12px 12px"
            >
              <el-popover placement="left" width="250" trigger="click">
                <div slot="reference">
                  <el-col :span="5" style="float: left">
                    <img
                      :src="item.img"
                      alt=""
                      class="vertical-middle"
                      width="44px"
                      height="44px"
                    />
                  </el-col>
                  <el-col :span="19" style="float: left">
                    <span style="margin-top: 0" class="text-666">{{ item.title }}</span>
                    <span class="h6" style="color: #868686">{{ item.des }}</span>
                  </el-col>
                </div>
                <div style="margin: 0 auto; width: 100%; text-align: center; border-radius: 10px">
                  <img src="static/images/qrcode.png" alt="" width="160px" height="160px" />
                  <span class="full-width text-center pull-left">扫码下载</span>
                </div>
              </el-popover>
            </div>

            <div
              v-if="index == 3"
              class="bgwhitecolor home-border-r toolItem"
              style="height: 90px; padding: 12px 12px"
            >
              <el-popover
                placement="left"
                width="300"
                title="意见反馈"
                @hide="hidePopover()"
                trigger="click"
              >
                <div slot="reference">
                  <el-col :span="5" style="float: left">
                    <img
                      :src="item.img"
                      alt=""
                      class="vertical-middle"
                      width="44px"
                      height="44px"
                    />
                  </el-col>
                  <el-col :span="19" style="float: left">
                    <span style="margin-top: 0" class="text-666">{{ item.title }}</span>
                    <span class="m-top-sm h6" style="color: #868686">{{ item.des }}</span>
                  </el-col>
                </div>

                <el-form
                  :model="ruleForm2"
                  status-icon
                  :rules="rules2"
                  ref="ruleForm2"
                  label-width="0"
                >
                  <el-form-item label prop="PhoneNo">
                    <el-input
                      type="number"
                      v-model.number="ruleForm2.PhoneNo"
                      placeholder="请留下您的手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label prop="Remark">
                    <el-input
                      type="textarea"
                      v-model="ruleForm2.Remark"
                      placeholder="请留下您的宝贵意见"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="no-m-bottom">
                    <el-button-group class="full-width">
                      <el-button
                        type="primary"
                        @click="submitForm2('ruleForm2')"
                        :loading="loading2"
                        style="width: 100%"
                      >
                        提 交
                      </el-button>
                    </el-button-group>
                  </el-form-item>
                </el-form>
              </el-popover>
            </div>

            <div
              v-if="index == 4"
              class="bgwhitecolor home-border-r toolItem"
              style="height: 90px; padding: 12px 12px"
            >
              <el-popover placement="left" width="250" trigger="click">
                <div slot="reference">
                  <el-col :span="5" style="float: left">
                    <img
                      :src="item.img"
                      alt=""
                      class="vertical-middle"
                      width="44px"
                      height="44px"
                    />
                  </el-col>
                  <el-col :span="19" style="float: left">
                    <span style="margin-top: 0" class="text-666">{{ item.title }}</span>
                    <span class="h6" style="color: #868686">{{ item.des }}</span>
                  </el-col>
                </div>
                <div style="margin: 0 auto; width: 100%; text-align: center; border-radius: 10px">
                  <img src="static/images/weiXinGZH.jpg" alt="" width="160px" height="160px" />
                  <span class="full-width text-center pull-left">扫码关注</span>
                </div>
              </el-popover>
            </div>
          </el-row>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapState, mapGetters } from "vuex";
import { ROOT_STATE, SYSTEM_INFO } from "@/util/define.js";
import { getHomeData } from "@/api/index";
import img7 from "@/assets/icon_home5.png";
import img8 from "@/assets/icon_home1.png";
import img9 from "@/assets/icon_home2.png";
import img10 from "@/assets/icon_home3.png";
import img11 from "@/assets/icon_home4.png";
import dayjs from "dayjs";
export default {
  data() {
    let checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 800);
    };
    return {
      curSortId: 0,
      curSortName: "今天",
      curDateType: 0,
      loading2: false,
      loading3: false,
      mainloading: false,
      dialogVisible: false,
      myChart: null,
      user: {
        name: "index"
      },
      ruleForm2: {
        Remark: "",
        PhoneNo: ""
      },
      rules2: {
        Remark: [
          {
            required: true,
            message: "请输内容",
            trigger: "blur"
          }
        ],
        PhoneNo: [
          {
            required: true,
            validator: checkTel,
            trigger: "blur"
          }
        ]
      },
      invaliddateshow: 0,
      shostatus: 1,
      flag: 1,
      sysName: SYSTEM_INFO.NAME,
      rigthList: [
        { title: "客服经理", img: img8, des: "手机/微信：18665065028" },
        { title: "公司热线", img: img7, des: "4008-326-327" },
        { title: "多种终端高效管理", img: img9, des: "手机端、平板下载" },
        { title: "意见反馈", img: img10, des: "请留下您的宝贵意见" },
        { title: "店来客软件公众号", img: img11, des: "优秀案例、产品更新、营销方案" }
      ],
      curIdx: -1,
      showErWeiMaDialog: false,
      showAdviseDialog: false,
      noticeInfo: {
        AddVip: "",
        BirthVip: "",
        InvallVip: "",
        ServiceVip: ""
      },
      stockQty: "",
      listPaiHang: [
        { id: 0, name: "今天" },
        { id: 1, name: "昨天" },
        { id: 2, name: "本周" },
        { id: 3, name: "本月" }
      ],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      headerDateGainInfo: {
        MONEY1: "",
        MONEY2: ""
      },
      headerDateSaleInfo: {},
      headerDateAddInfo: {}
    };
  },
  computed: {
    ...mapGetters({
      homedaycombackobj: "homedaycombackobj",
      dealState: "dealUserState",
      homeoperatingdata: "homeoperatingdata",
      noticeInfoState: "noticeInfoState",
      getSaleTableState: "getSaleTableState",
      getPaiHangGroupState: "getPaiHangGroupState"
    })
  },
  watch: {
    homedaycombackobj(data) {
      console.log(data);
      this.stockQty = data.StockQty;
      this.headerDateGainInfo = data.GainInfo;
      this.headerDateSaleInfo = data.SaleInfo;
      this.headerDateAddInfo = data.AddInfo;
    },
    getPaiHangGroupState(data) {
      this.loading3 = false;

      if (data.success) {
        this.tableData1 = data.data.QtyList;
        this.tableData2 = data.data.MoneyList;
        this.tableData3 = data.data.List;
      }
    },
    dealState(data) {
      this.loading = false;
      if (this.loading2) {
        this.$message({
          message: data.message,
          type: data.success ? "success" : "error"
        });
      }
      this.loading2 = false;
    },
    noticeInfoState(data) {
      if (data.success) {
        this.noticeInfo = data.data;
      }
    },
    getSaleTableState(data) {
      this.mainloading = false;
      if (data.success) {
        let saletime = data.data.List.map((item) => item.DATESTR);
        let saledate = data.data.List.map((item) => item.MONEY);
        this.getweeksaleDate(saledate, saletime);
      }
    }
  },
  methods: {
    changeShop(data) {
      this.$store.dispatch("getweeksdayssaleList", {});
      let getHomeDataval = getHomeData();
      this.invaliddateshow = getHomeDataval.shop.INVALIDDATE; //显示店铺有效期
      this.$store.dispatch("getNoticeInfo", {});
      this.handleCommand(0);
      let BeginDate = this.getTimeStamp(1);
      let EndDate = this.getTimeStamp(1) + 86400000 - 1;
      this.getNewData(BeginDate, EndDate);
    },
    hidePopover() {
      // this.ruleForm2 = {
      //   Remark: "",
      //   PhoneNo: ''
      // }
    },
    changePaiHang(i) {
      // 排行榜时间选择
      this.curSortId = i;
      switch (i) {
        case 0:
          let BeginDate = this.getTimeStamp();
          let EndDate = new Date().getTime();
          this.curSortName = "今天";
          this.getNewData(BeginDate, EndDate);
          break;
        case 1:
          let BeginDate1 = this.getTimeStamp(1);
          let EndDate1 = this.getTimeStamp(1) + 86400000 - 1;
          this.curSortName = "昨天";
          this.getNewData(BeginDate1, EndDate1);
          break;
        case 2:
          let Nowdate = new Date();
          let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
          let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
          let BeginDate2 = new Date(WeekFirstDay).getTime();
          let EndDate2 = new Date(WeekLastDay).getTime();
          this.curSortName = "本周";
          this.getNewData(BeginDate2, EndDate2);
          break;
        case 3:
          let arr2 = this.getAroundMonth();
          let BeginDate3 = new Date(arr2[0]).getTime();
          let EndDate3 = this.getTimeStampstatuesOutput(arr2[1]) + 86400000 - 1;
          this.curSortName = "本月";
          this.getNewData(BeginDate3, EndDate3);
          break;
      }
    },
    getNewData(BeginDate, EndDate) {
      this.$store
        .dispatch("GetPaiHangGroup", { BeginDate: BeginDate, EndDate: EndDate })
        .then(() => {
          this.loading3 = true;
        });
    },
    handleCommand(val) {
      // 销售情况时间选择
      this.mainloading = true;
      if (val == 0) {
        this.curDateType = 0;
        this.$store.dispatch("getsaleTableData", {
          BeginDate: new Date(this.getCustomDay(-6)).getTime(),
          EndDate: new Date().getTime()
        });
      } else if (val == 1) {
        this.curDateType = 1;
        this.$store.dispatch("getsaleTableData", {
          BeginDate: dayjs().startOf("month").valueOf(),
          EndDate: dayjs().endOf("month").valueOf()
        });
      } else {
        this.$router.push({ path: "/reports/analysis/sale" });
      }
    },
    routeLink() {
      if (!this.isPurViewFun(91040403)) {
        this.$message.warning("没有此功能权限，请联系管理员授权 ！");
      } else {
        this.$router.push({ path: "/reports/management/business", query: { current: 1 } });
      }
    },
    stockChange() {
      if (!this.isPurViewFun(91040111)) {
        this.$message.warning("没有此功能权限，请联系管理员授权 ！");
      } else {
        this.$router.push({ path: "/stock/query" });
      }
    },
    brithdayChange() {
      if (!this.isPurViewFun(91040107)) {
        this.$message.warning("没有此功能权限，请联系管理员授权 ！");
      } else {
        this.$router.push({ path: "/member/reminder" });
      }
    },
    addMember() {
      if (!this.isPurViewFun(91040407)) {
        this.$message.warning("没有此功能权限，请联系管理员授权 ！");
      } else {
        this.$router.push({ path: "/reports/reportsTable/membertable" });
      }
    },
    submitForm2(formName) {
      if (this.ruleForm2.PhoneNo == "" || this.ruleForm2.Remark == "") {
        this.$message.error("手机号和留言意见不能为空");
      } else {
        this.$store.dispatch("sendUserMessage", this.ruleForm2).then(() => {
          this.loading2 = true;
        });
      }
    },
    choseCurIdx(index) {
      this.curIdx = index;
      if (index == 2) {
        this.showAdviseDialog = true;
      }
    },
    myopenshow() {
      this.dialogVisible = true;
    },
    getweeksaleDate(saledate, saletime) {
      this.myChart = echarts.init(document.getElementById("main"));
      this.myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true
        },
        calculable: true,
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            saveAsImage: {
              show: false
            }
          },
          top: "top",
          left: "right",
          showTitle: false
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: saletime
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "消费情况",
            type: "bar",
            barCategoryGap: "90%",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            },
            data: saledate,
            itemStyle: { normal: { color: "#2589ff", lineStyle: { color: "#ddd" } } }
          }
        ]
      });
    }
  },
  created: function () {
    this.$store.dispatch("getweeksdayssaleList", {});
  },
  mounted: function () {
    let getHomeDataval = getHomeData();
    this.invaliddateshow = getHomeDataval.shop.INVALIDDATE; //显示店铺有效期
    this.$store.dispatch("getNoticeInfo", {});
    this.handleCommand(0);

    let BeginDate = this.getTimeStamp();
    let EndDate = new Date().getTime();
    this.getNewData(BeginDate, EndDate);
  },
};
</script>
<style scoped>
.fontsizeclass {
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
}

.home-border-r {
  border-radius: 2px;
}
.indexsock {
  padding: 0 0 15px 0;
}

.el-col-16 {
  width: 65.666667%;
}

.bgwhitecolor {
  background: #fff;
  box-shadow: 0px 0px 50px 4px rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  margin: 0 4px 0 4px;
}

.Management_sock {
  overflow: hidden;
  padding: 21px 0;
  /* cursor: pointer; */
}

.triggerAreport {
  margin-bottom: 13px;
  height: 16px;
}

.Management_sock_con {
  text-align: center;
}

.Management_sock_con p:nth-child(1) {
  font-weight: bold;
  font-size: 14px;
  color: #7d7d7d;
}

.Management_sock_con p:nth-child(2) {
  font-weight: bold;
  font-size: 16px;
  color: #3976f1;
  height: 38px;
  cursor: pointer;
}

.Management_sock_con p:nth-child(3) {
  font-weight: bold;
  font-size: 12px;
  color: #6a6a6a;
}

.Management_sock_con p {
  line-height: 2.4;
  margin: 0;
}

.huise {
  height: 10px;
  background: gainsboro;
  margin: 0 -15px;
}
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
.shop {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name {
  position: absolute;
  right: 20px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
}
.toolItem span {
  width: 100%;
  float: left;
  margin-top: 10px;
}
.groupStyle {
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  float: left;
  border-radius: 5px;
  height: 170px;
}
.groupStyle .group_title {
  width: 100%;
  float: left;
  border-bottom: 1px solid #ddd;
  height: 24px;
  line-height: 24px;
}
.groupStyle .group_cont {
  width: 100%;
  float: left;
  padding-top: 10px;
}
.groupStyle .group_cont div {
  width: 100%;
  float: left;
  height: 24px;
  color: #868686;
}
.emptyData {
  width: 100%;
  float: left;
  margin-top: 10px;
  text-align: center;
}
.home {
  /* background-color: #f4f5fa !important; */
  /* height: 729px; */
  height: 100%;
  /* border-top: solid 1px #ebedf0; */
}
</style>

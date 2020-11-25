
<style lang="less">
    @import "./login.less";
</style>

<template>
  <div class="login-container_sock login">
    <transition name="fade" mode="out-in">
      <div v-if="isRegister" class="login-container" style="width: 500px">
        <components
          :is="componentName"
          @closeModal="isRegister = false"
        ></components>
      </div>
      <div v-else class="login-container">
        <div class="warp_left">
          <div>
            <img src="../../static/images/chahua.png" width="300px" alt="" />
          </div>
        </div>

        <div class="warp_right">
          <div class="warp_right_title">服装连锁后台管理</div>
          <el-form
            :model="ruleForm2"
            ref="ruleForm2"
            label-position="left"
            class="ruleFormStyle"
            style="width: 80%; margin: 0 auto"
          >
            <el-form-item prop="AuthCode">
              <el-input
                v-model="ruleForm2.AuthCode"
                placeholder="请输入注册手机号码"
              >
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-mobile-phone"
                ></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="UserCode">
              <el-input
                v-model="ruleForm2.UserCode"
                placeholder="请输入用户账号"
              >
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="Password" style="margin-bottom: 10px">
              <el-input
                v-model="ruleForm2.Password"
                placeholder="请输入密码"
                show-password
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>

            <el-form-item style="width: 100%">
              <el-row>
                <el-col :span="12" style="color: #9a9a9a; cursor: pointer">
                  <span
                    @click="
                      componentName = 'forgetPwdPage';
                      isRegister = true;
                    "
                  >
                    忘记密码？
                  </span>
                </el-col>
                <el-col
                  :span="12"
                  style="text-align: right; color: #2589ff; cursor: pointer"
                >
                  <span
                    @click="
                      componentName = 'registerPage';
                      isRegister = true;
                    "
                  >
                    商家注册
                  </span>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              style="width: 100%; margin-top: 40px; margin-bottom: 0"
            >
              <el-button
                type="primary"
                style="width: 100%; font-family: 'SourceHanSansCN-Regular'"
                @click.native.prevent="onSubmit"
                :loading="loading"
              >
                <span>立 即 登 录</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <div style="position: absolute; left: -24px; top: 50px">
          <img src="static/images/left_Circle.png" alt="" />
        </div>

        <div style="position: absolute; right: -21px; bottom: 50px">
          <img src="static/images/right_Circle.png" alt="" />
        </div>
      </div>
    </transition>

    <el-dialog
      title="请选择门店"
      :visible.sync="dialogVisible"
      width="330px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div class="shopListClass">
        <ul>
          <li v-for="(item, i) in shopList" :key="i" @click="setShop(item)">
            <span v-if="item.DAY >= 0">{{ item.NAME }}</span>
            <span v-else>
              {{ item.NAME }}
              <i style="color: #f00">( 已过期 )</i>
            </span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CRYPTO from "crypto-js";
import { mapActions, mapState, mapGetters } from "vuex";
import { nscreenexCodeFun } from "@/util/objectivity";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm2: {
        AuthCode: "",
        UserCode: "",
        Password: "", // 888 boss
      },
      isRemember: true,
      isRegister: false,
      loading: false,
      loading2: false,
      componentName: ""
    };
  },
  components: {
    registerPage: () => import("@/components/other/register"),
    forgetPwdPage: () => import("@/components/other/forgetPwd")
  },
  computed: {
    ...mapGetters({
      STimeState: "STimeState",
      loginState: "loginState",
      shopListState: "shopListState",
      shopList: "shopList",
      experienceState: "experienceState",
      changePwdState: "changePwdState",
      AgentPermission: "AgentPermission",
      severIpData: "severIpData"
    })
  },
  watch:{
    severIpData(data) {
      if (data.success) {
        let ip = data.data.OutIP != "" ? data.data.OutIP : "http://dlaico88.cn:8080";
        this.$store.dispatch("addServerIP", String(ip)).then(() => {
          let sendData = {
            AuthCode: this.ruleForm2.AuthCode,
            UserCode: this.ruleForm2.UserCode,
            Password: CRYPTO.MD5(this.ruleForm2.Password).toString()
          };
          this.toLogin(sendData);
        });
      } else {
        this.loading = false;
        this.$message.error(data.message);
      }
    },
    loginState(data) {
      if (data.success) {
        this.$store.dispatch("getPermissionInfo").then(() => {
          this.$store.dispatch("getShopList");
        });
      } else {
        this.loading = false;
        this.$message.error(data.message);
      }
    },
    shopListState(data) {
      this.loading = false;
      this.loading2 = false;
      if (data.success) {
        if (this.shopList.length > 0) {
          this.dialogVisible = true;
        } else {
          this.$router.push({ name: "home" });
        }
      }
    },
    experienceState(data) {
      if (data.success) {
        let sendData = {
          AuthCode: data.data.authCode,
          UserCode: data.data.userCode,
          Password: data.data.password
        };
        this.toLogin(sendData);
      }
    },
    changePwdState(data) {
      if (data.success) {
        this.ruleForm2 = {
          AuthCode: "",
          UserCode: "",
          Password: ""
        };
      }
    },
    AgentPermission(data) {
      // console.log(data)
    }
  },
  methods: {
    // ...mapActions(["handleLogin", "getUserInfo"]),
    onSubmit() {
      this.loading = true;
      var jsondatakexian = {
        usercode: this.ruleForm2.UserCode,
        authcode: this.ruleForm2.AuthCode,
        userpass: this.ruleForm2.Password
      };
      // if (this.isRemember) {
      localStorage.setItem("isRemember", JSON.stringify(this.ruleForm2));
      localStorage.setItem("isExperience", "false");
      nscreenexCodeFun(2, jsondatakexian);
      // }else{
      //   localStorage.setItem("isRemember", JSON.stringify({}));
      //   nscreenexCodeFun(3,jsondatakexian);
      // }
      this.$store.dispatch("chooseSeverIp", this.ruleForm2.AuthCode);
    },
    toLogin(data) {
      let sendData = {};
      if (data) {
        sendData = Object.assign({}, data);
      } else {
        sendData = {
          AuthCode: this.ruleForm2.AuthCode,
          UserCode: this.ruleForm2.UserCode,
          Password: CRYPTO.MD5(this.ruleForm2.Password).toString()
        };
      }
      this.$store.dispatch("toLogin", sendData).then(() => {});
    },
    handleClose(done) {
      let ip = "http://dlaico88.cn:8080";
      this.$store.dispatch("addServerIP", String(ip));
      this.dialogVisible = false;
    },
    setShop(item) {
      if (item.DAY < 0) {
        this.$message.warning(`【${item.NAME}】 已过期， 请及时续费 ！`);
        return;
      }
      console.log(this.AgentPermission);
      if (!this.AgentPermission.success) {
        this.$message({
          message: "用户账号权限存在问题，请重新登录",
          type: "error"
        });
        this.dialogVisible = false;
        return;
      }

      this.$store.dispatch("choosingShop", item).then(() => {
        console.log( this.$config.homeName)
        this.$router.push({
          name: this.$config.homeName
        });
      });
    },
    onExperience() {
      this.$store.dispatch("toExperience").then(() => {
        this.loading2 = true;
        localStorage.setItem("isExperience", "true");
      });
    }
  },
  activated() {
    this.dialogVisible = false;
  },
  mounted() {
    let dd = localStorage.getItem("isRemember") || "{}";
    this.isRemember = dd == "{}" ? false : true;
    this.ruleForm2 = Object.assign({}, this.ruleForm2, JSON.parse(dd));
    this.$store.dispatch("getServerTime");
    this.dialogVisible = false;
  },
};
</script>

<style scoped>
.ruleFormStyle >>> .el-input__icon {
	line-height: 35px;
}
</style>

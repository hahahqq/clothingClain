<template>
  <div class="register" style="padding:20px">
    <div class="text-center font-20 padding-sm m-bottom-md relative registerStyle">商家注册
       <i class="el-icon-arrow-right el-icon-close absolute pointer text-999" @click="closeModal" style="right: 0; top: -4px; font-size:18pt;"></i>
    </div>

    <div v-if="isLogin" style="height:418px;padding-top:60px">
      <div class="text-center"><img :src="img" class="inline-block" style="width:200px;" /></div>
      <div class="margin-sm">恭喜！您已成功注册，请牢记您的登录信息：</div>
      <ul class="margin-md">
        <li class="paddingTB-xs">商家代码：{{ruleForm2.AuthCode}}</li>
        <li class="paddingTB-xs">登录用户：{{ruleForm2.UserCode}}</li>
        <li class="paddingTB-xs">登录密码：*****</li>
      </ul>
      <div class="margin-sm">更多功能静候您的体验，感谢您的支持！</div>
      <div class="margin-sm p-top-md">
        <el-button type="primary" @click="toLogin" :loading="loading" class="full-width">
          <b>立即登录</b>
        </el-button>
      </div>
    </div>
    <div v-else>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="手机号码" prop="mobileno">
          <el-input v-model.number="ruleForm.mobileno" type="number" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifycode">
          <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码">
            <template slot="append">
              <a @click="getVerifyCode" class="block pointer">
                <span v-text="timeDown.isClick?'获取验证码':'( '+timeDown.seconds+' )'"></span>
              </a>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="ruleForm.companyname" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="ruleForm.linker" placeholder="请输入联系人"></el-input>
        </el-form-item>
      </el-form>

      <div class="text-center">
        <el-button type="primary" @click="submitForm()" :loading="loading" style="width: 150px">
          提 交
        </el-button>

        <span style="margin-left: 20px">已有账号请直接</span>
        <a @click="closeModal" class="inline-block pointer" style="color: #409eff">登录</a>
      </div>


    </div>
  </div>
</template>
<script>
import CRYPTO from "crypto-js";
import { mapState, mapGetters } from "vuex";
import regsuccess from "@/assets/regsuccess.png";
export default {
  name: "register",
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 800);
    };
    return {
      ruleForm: {
        mobileno: "",
        companyname: "",
        linker: "",
        verifycode: "",
        password: ""
      },
      rules: {
        mobileno: [
          {
            required: true,
            validator: checkTel,
            trigger: "blur"
          }
        ],
        verifycode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      timeDown: {
        isClick: true,
        seconds: 60
      },
      img: regsuccess,
      ruleForm2: {
        AuthCode: "",
        UserCode: "",
        Password: ""
      },
      isLogin: false
    };
  },
  computed: {
    ...mapGetters({
      verCodeState: "verCodeState",
      registerState: "registerState",
      loginState: "loginState"
    })
  },
  watch: {
    verCodeState(data) {
      this.$message({
        showClose: true,
        message: data.message,
        type: data.success ? "success" : "error"
      });
    },
    registerState(data) {
      this.loading = false;
      this.ruleForm2 = Object.assign({}, data.regdata);
      if (data.success) {
        this.isLogin = true;
      }
    },
    loginState(data) {
      this.loading = false;
      if (data.success) {
        this.$router.push({
          path: "/home"
        });
      }
    }
  },
  methods: {
    closeModal() {
      Object.assign(this.$data, this.$options.data());
      this.$emit("closeModal");
    },
    getVerifyCode() {
      var _this = this;
      this.$refs.ruleForm.$children[0].onFieldBlur();
      if (this.timeDown.isClick && this.ruleForm.mobileno) {
        this.timeDown.isClick = false;
        this.timeDown.seconds = 60;
        this.$store.dispatch("getVerCode", this.ruleForm.mobileno);
        let time = setInterval(() => {
          if (_this.timeDown.seconds == 0) {
            _this.timeDown.isClick = true;
            clearInterval(time);
          }
          _this.timeDown.seconds--;
        }, 1000);
      }
    },
    submitForm() {
      var _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("toRegister", _this.ruleForm).then(() => {
            _this.loading = true;
          });
          // console.log(_this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      if (!this.ruleForm2.AuthCode) {
        console.log(this.ruleForm2);
        return;
      }
      let sendData = {
        AuthCode: this.ruleForm2.AuthCode,
        UserCode: this.ruleForm2.UserCode,
        Password: CRYPTO.MD5(this.ruleForm2.Password).toString()
      };
      this.$store.dispatch("toLogin", sendData).then(() => {
        this.loading = true;
      });
    }
  }
};
</script>
<style scoped>
</style>

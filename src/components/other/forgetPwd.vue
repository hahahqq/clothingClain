<template>
  <div class="forgetPwd" style="padding: 20px">
    <div class="text-center font-20 padding-sm m-bottom-md">找回密码</div>
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" placeholder="请确认登录密码"></el-input>
      </el-form-item>
      <el-form-item class="p-top-sm">
        <el-button type="primary" @click="submitForm()" :loading="loading" class="pull-left-">
          <span>确 定</span>
        </el-button>
        <el-button @click="closeModal" class="pull-right-">
          <span>取 消</span>
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import CRYPTO from "crypto-js";
import { mapState, mapGetters } from "vuex";
import regsuccess from "@/assets/regsuccess.png";
export default {
  name: "forgetPwd",
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        mobileno: "",
        verifycode: "",
        password: "",
        checkPass: ""
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
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      loading: false,
      timeDown: {
        isClick: true,
        seconds: 60
      }
    };
  },
  computed: {
    ...mapGetters({
      changePwdState: "changePwdState"
    })
  },
  watch: {
    changePwdState(data) {
      if (data.success) {
        this.closeModal();
      }
      this.$message({
        showClose: true,
        message: data.message,
        type: data.success ? "success" : "error",
        duration: 3000
      });
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
          this.$store
            .dispatch("changePwd", {
              'mobileno': _this.ruleForm.mobileno,
              'verifycode': _this.ruleForm.verifycode,
              'newpassword': CRYPTO.MD5(_this.ruleForm.password).toString()
            })
            .then(() => {
              _this.loading = true;
            });
          // console.log(_this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

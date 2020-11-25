<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>

<template>
  <Modal
    v-model="modal1"
    title="新增供应商"
    :mask-closable="false"
    width='800px'
    class-name="vertical-center-modal"
  >
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="90"
    >
      <Row :gutter="10">
        <i-col :span="12">
          <FormItem label="供应商名称" prop="supplierName">
            <Input
              v-model.trim="formValidate.supplierName"
              clearable
              placeholder="请输入供应商名称"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="供应商编号" prop="code">
            <Input
              v-model.trim="formValidate.code"
              clearable
              placeholder="请输入供应商编号"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="供应商类别" prop="type">
            <Input
              v-model="formValidate.type"
              clearable
              placeholder="请选择供应商类别"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="期初应付款">
            <Input
              v-model.number="formValidate.FirstMoney"
              type="number"
              clearable
              placeholder="请输入期初应付款"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="联系人">
            <Input
              v-model="formValidate.linker"
              clearable
              placeholder="请输入联系人"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="手机号">
            <Input
              v-model.number="formValidate.phone"
              type="number"
              clearable
              placeholder="请输入手机号"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="座机号">
            <Input
              v-model.number="formValidate.tel"
              clearable
              placeholder="请输入座机号"
            />
          </FormItem>
        </i-col>

        <i-col :span="12">
          <FormItem label="QQ/微信/邮箱">
            <Input
              v-model.number="formValidate.wechat"
              clearable
              placeholder="请输入QQ/微信/邮箱"
            />
          </FormItem>
        </i-col>

        <i-col :span="24">
          <FormItem label="备注">
            <Input
              v-model="formValidate.remark"
              type="textarea"
              clearable
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入店铺备注..."
            />
          </FormItem>
        </i-col>

        <i-col :span="24">
          <FormItem label="供应商状态">
              <RadioGroup v-model="formValidate.state">
                <Radio label="1">启用</Radio>
                <Radio label="0">停用</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
      </Row>
    </Form>

    <div slot="footer">
      <el-button size="small" type="" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" plain>保存并新增</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </div>
  </Modal>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      modal1: true,
      formValidate: {
        supplierName: "",
        code: "",
        FirstMoney: "",
        type: "",
        linker: "",
        phone: "",
        tel: "",
        wechat: "",
        remark: '',
        state: '1'
      },
      ruleValidate: {
        supplierName: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入供应商编号",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择供应商类别",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  watch: {},
  methods: {
    cancel() {
      console.log('5555')
      this.$refs.formValidate.resetFields();
      // this.modal1 = false;
      this.$emit("closeModal");
    },
  },
  mounted() {},
  beforeCreate() {},
  components: {},
};
</script>

<style scoped>
</style>

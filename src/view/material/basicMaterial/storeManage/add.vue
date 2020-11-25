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
  <div>
    <Modal
      v-model="modal1"
      title="新增店仓"
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="名称" prop="name">
          <Input
            v-model.trim="formValidate.name"
            clearable
            placeholder="请输入店仓名称"
          />
        </FormItem>
        <FormItem label="编号" prop="code">
          <Input
            v-model.trim="formValidate.code"
            clearable
            placeholder="请输入编号"
          />
        </FormItem>
        <FormItem label="性质" prop="nature">
          <Select
            v-model="formValidate.nature"
            clearable
            placeholder="请选择店仓性质"
          >
            <Option value="0">仓库</Option>
            <Option value="1">直营店</Option>
            <Option value="2">加盟店</Option>
          </Select>
        </FormItem>
        <FormItem label="组织架构" prop="frame">
          <Select
            v-model="formValidate.frame"
            clearable
            placeholder="请选择组织架构"
          >
            <Option value="0">归属商家</Option>
            <Option value="1">组织架构</Option>
          </Select>
        </FormItem>

        <FormItem label="联系人">
          <Input
            v-model="formValidate.linker"
            clearable
            placeholder="请输入联系人"
          />
        </FormItem>

        <FormItem label="联系电话">
          <Input
            v-model.number="formValidate.phone"
            clearable
            type="number"
            placeholder="请输入联系电话"
          />
        </FormItem>

        <FormItem label="地区信息">
          <Cascader
            placeholder="请选择 省 / 市 / 区"
            :data="areaOptions"
            v-model="selectedAreaOptions"
            clearable
          ></Cascader>
        </FormItem>

        <FormItem label="详细地址">
          <Input
            search
            v-model="formValidate.address"
            clearable
            enter-button="搜索地图"
            @on-search="showBaiDuMapFun"
            placeholder="请输入店铺详细地址"
          />
        </FormItem>

        <FormItem label="营业状态">
          <i-switch v-model="formValidate.state"></i-switch>
        </FormItem>

        <FormItem label="备注">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            clearable
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入店铺备注..."
          />
        </FormItem>
      </Form>

      <div slot="footer">
        <el-button size="small" type="" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" plain>保存并新增</el-button>
        <el-button size="small" type="primary">保存</el-button>
      </div>
    </Modal>

    <!-- 搜索地图 -->
    <Modal
      v-model="showBaiDuMap"
      title="请选择地点"
      :mask-closable="false"
      class-name="vertical-center-modal"
      width="80%"
    >
      <el-input
        v-model="addressKeyword"
        placeholder="请输入地址来直接查找相关位置"
      ></el-input>
      <baidu-map
        class="bmView"
        :scroll-wheel-zoom="true"
        :center="location"
        :zoom="zoom"
        @click="getLocationPoint"
      >
        <bm-view
          style="width: 100%; height: 500px; margin-top: 10px; flex: 1"
        ></bm-view>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="showAddressBar"
          :autoLocation="autoLocation"
        ></bm-geolocation>

        <bm-local-search
          :keyword="addressKeyword"
          :auto-viewport="true"
          style="display: none"
        ></bm-local-search>
      </baidu-map>

      <div slot="footer">
        <el-button size="small" type="" @click="showBaiDuMap = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitAddress"
          >确定</el-button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { CityInfo } from "@/assets/js/area.js";
export default {
  data() {
    return {
      modal1: true,
      formValidate: {
        name: "",
        code: "",
        nature: "",
        frame: "",
        linker: "",
        phone: "",
        state: true,
        remark: "",
        address: "",
        ProvinceID: "",
        CityID: "",
        DistrictID: "",
        Longitude: "",
        Latitude: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入店仓名称",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入店仓编号",
            trigger: "blur",
          },
        ],
        nature: [
          {
            required: true,
            message: "请选择店仓性质",
            trigger: "change",
          },
        ],
        frame: [
          {
            required: true,
            message: "请选择组织架构",
            trigger: "change",
          },
        ],
      },
      selectedAreaOptions: [],
      areaOptions: CityInfo,
      getLocationInfo: {},
      showBaiDuMap: false,
      location: {
        lng: 116.404,
        lat: 39.915,
      },
      zoom: 12.8,
      addressKeyword: "",
      autoLocation: true,
      showAddressBar: true,
    };
  },
  methods: {
    cancel() {
      this.$refs.formValidate.resetFields();
      this.modal1 = false;
      this.$emit("closeModal");
    },
    submitAddress() {
      console.log(this.getLocationInfo);
      if (this.getLocationInfo.address != undefined) {
        let addressComponents = this.getLocationInfo.addressComponents;
        let provinceStr = addressComponents.province;
        let province = provinceStr.substr(provinceStr.length - 1, 1);
        if (province == "省" || province == "市") {
          province = provinceStr.substr(0, provinceStr.length - 1);
        }
        let addressGroup =
          province +
          " " +
          addressComponents.city +
          " " +
          addressComponents.district;
        console.log(addressGroup);
        this.setAddress(addressGroup);
        this.formValidate.address = this.getLocationInfo.address;
        this.formValidate.Latitude = this.getLocationInfo.point.lat;
        this.formValidate.Longitude = this.getLocationInfo.point.lng;

        this.showBaiDuMap = false;
      } else {
        this.formValidate.Latitude = 0;
        this.formValidate.Longitude = 0;
      }
    },
    showBaiDuMapFun() {
      let selectAddressTxt = this.getAreaLabel();
      let address = selectAddressTxt + this.formValidate.address;
      console.log(address);
      this.addressKeyword = address;
      this.showBaiDuMap = true;
    },
    getAreaLabel() {
      let seled = [...this.selectedAreaOptions];
      let areaStr = "";
      if (seled.length == 0) return areaStr;
      for (let i = 0; i < this.areaOptions.length; i++) {
        if (this.areaOptions[i].value == seled[0]) {
          areaStr += this.areaOptions[i].label + " ";
          for (let j = 0; j < this.areaOptions[i].children.length; j++) {
            if (this.areaOptions[i].children[j].value == seled[1]) {
              areaStr += this.areaOptions[i].children[j].label + " ";
              if (this.areaOptions[i].children[j].children != undefined) {
                let karr = [...this.areaOptions[i].children[j].children];
                for (let k = 0; k < karr.length; k++) {
                  if (karr[k].value == seled[2] && seled.length > 2) {
                    areaStr += karr[k].label + "";
                    break;
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
      return areaStr;
    },
    setAddress(address) {
      let seled = address.split(" ");
      let areaStr = [];
      let defauleArr = [...this.areaOptions];
      for (let i = 0; i < defauleArr.length; i++) {
        if (defauleArr[i].label == seled[0]) {
          areaStr.push(defauleArr[i].value);
          for (let j = 0; j < defauleArr[i].children.length; j++) {
            if (defauleArr[i].children[j].label == seled[1]) {
              areaStr.push(defauleArr[i].children[j].value);
              if (defauleArr[i].children[j].children != undefined) {
                let karr = [...defauleArr[i].children[j].children];
                for (let k = 0; k < karr.length; k++) {
                  if (karr[k].label == seled[2]) {
                    areaStr.push(karr[k].value);
                    break;
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
      this.selectedAreaOptions = [...areaStr];
      this.formValidate.ProvinceID = [...areaStr][0];
      this.formValidate.CityID = [...areaStr][1];
      this.formValidate.DistrictID = [...areaStr][2];
    },
    getLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, (point) => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, (res) => {
        console.log(res);
        this.getLocationInfo = res;
        this.addressKeyword = res.address;
      });
    },
  },
  mounted() {},
};
</script>

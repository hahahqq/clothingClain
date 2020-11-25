<template>
  <div class="uploadIMg">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action
      :show-file-list="true"
      :auto-upload="false"
      :multiple="true"
      :limit='6'
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed='exceedHandle'
      :on-change="changeFile"
      list-type="picture"
    >
      <div v-if="!imageUrl" slot="trigger" class="el-upload el-upload--picture-card">
        <img v-if="imgName" :src="imgOld" :onerror="imgError" class="avatar">
        <i v-else class="el-icon-plus"></i>
      </div>
    </el-upload>

    <div
      v-if="imageUrl"
      class="el-upload el-upload--picture-card uploadActions"
      style="margin-top:-40px;"
    >
      <img :src="imageUrl" class="avatar">
      <span class="el-upload-list__item-delete">
        <a class="el-icon-delete pointer" @click="clearfun"></a>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import img from "@/assets/newimg.jpg";
export default {
  props: ["imgName", "dataType", "isUpload"],
  data() {
    return {
      imageUrl: "",
      imgOld: img,
      imgError: 'this.src="' + img + '"'
    };
  },
  computed: {
    ...mapGetters({
      uploadState: "goodsImgUploadState"
    })
  },
  watch: {
    isUpload(v) {
      if (v && this.imgName && this.imageUrl) {
        this.uploadFun();
      }
    },
    dataType(data) {
      this.defaultData();
    },
    uploadState() {
      this.clearfun();
    }
  },
  methods: {
    handlePreview(file){
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    exceedHandle(){
      this.$message.warning('最多只能选择6个')
    },
    changeFile(file, fileList) {
      var This = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        this.result; // 这个就是base64编码了
        This.imageUrl = this.result;
        This.uploadFun(this.result)
      };
    },
    clearfun() {
      this.$refs.upload.clearFiles();
      this.imageUrl = "";
      this.imgOld = "";
    },
    uploadFun(imgFile) {
      let sendData = {
        name: this.imgName + ".png",
        filePath: "goodsimage",
        file: imgFile
      };
      this.$store.dispatch("uploadGoodsImg", sendData).then(() => {
        this.imgOld = img;
      });
    },
    defaultData(){
      this.clearfun();
      this.imgOld = this.imgName ? GOODS_IMGURL + this.imgName + ".png?"+Math.random() : img;
    },
  },
  mounted() {
    this.defaultData();
  }
};
</script>
<style scoped>
.uploadActions {
  position: relative;
}
.uploadActions:hover .el-upload-list__item-delete {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
}
</style>

import { getUserInfo } from "@/api/index";
const getparametersetup = function(parameterstatus) {
   let userInfo = getUserInfo();
   let CompanyConfig = userInfo.CompanyConfig;
   if (parameterstatus == 2) {
      return CompanyConfig.ISNEEDSALER;
   }
};

const isPurViewFun = function(v) {
   let userInfo = getUserInfo();
   if (userInfo.CODE2 == "boss") {
      return true;
   }
   let data = userInfo.List.find(item => item.MODULECODE == v);
   return data && data.ISPURVIEW == 1 ? true : false;
};

const textColor = [
   {
      id: 1,
      label: "白色",
      value: "#ffffff",
      border: "#DCDFE6"
   },
   {
      id: 2,
      label: "绿色",
      value: "#6bac94",
      border: "#DCDFE6"
   },
   {
      id: 3,
      label: "浅绿",
      value: "#29b1c9",
      border: "#DCDFE6"
   },
   {
      id: 4,
      label: "红色",
      value: "#ee798c",
      border: "#DCDFE6"
   },
   {
      id: 5,
      label: "黄色",
      value: "#f3b700",
      border: "#DCDFE6"
   },
   {
      id: 5,
      label: "浅蓝",
      value: "#7db3e0",
      border: "#DCDFE6"
   }
];
export { getparametersetup, isPurViewFun, textColor };

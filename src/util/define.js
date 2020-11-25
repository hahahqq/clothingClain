//  const ROOT_URL = 'http://bwangame.cn:8080'; // 智讯 121
const ROOT_URL = 'http://dlaico88.cn:8080'; // 店来客 120

let APIURL = ROOT_URL + "/system/systemService";

const GOODS_IMGURL = ROOT_URL + "/resources/goodsimage/";
const VIPIMAGESIMG = ROOT_URL + "/resources/vipimages/";
const COMPANY_IMGURL = ROOT_URL + "/resources/headimage/"

const ROOT_URLQRCODE = ROOT_URL + '/WeChatQrcodeCallBackApi'; // 121
const ROOT_STATE = ROOT_URL == 'http://bwangame.cn:8080' ? 1 : 2;
const SYSTEM_INFO = {
  NAME: "服装连锁",
  VERSION:'5.3.9',
  PREFIX:'FZLS',
};

export {
  ROOT_URL,
  APIURL,
  GOODS_IMGURL,
  VIPIMAGESIMG,
  ROOT_URLQRCODE,
  ROOT_STATE,
  SYSTEM_INFO,
  COMPANY_IMGURL
}

import Vue from "vue";

let DStyle = "-";
let DStyle2 = ":";
let dealDateFun = function(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;

  let hh = date.getHours();
  hh = hh < 10 ? "0" + hh : hh;
  let mm = date.getMinutes();
  mm = mm < 10 ? "0" + mm : mm;
  let ss = date.getSeconds();
  ss = ss < 10 ? "0" + ss : ss;
  return y + DStyle + m + DStyle + d + " " + hh + DStyle2 + mm + DStyle2 + ss;
};
let getMonthDays = function(myMonth) {
  let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
  let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
  let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
};
let getTimeStampstatues = function(str) {
  return new Date(Date.parse(str.replace(/-/g, "/"))).getTime();
};
let doHandleMonth = function(month) {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
};
export default {
  install(Vue) {
    Vue.prototype.filterTimeOut = function(dateTime) {
      let date = new Date(dateTime);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    };

    Vue.prototype.getSearchString = function() {
      // 获取url地址 " ? " 号后面的参数
      let param = window.location.href.split("?")[1];
      let query = param.split("&");
      let obj = new Object();
      for (var i = 0; i < query.length; i++) {
        var tmp_arr = query[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      return obj;
    };

    Vue.prototype.getTimeStampstatuesOutput = function(str) {
      return getTimeStampstatues(str);
    };
    Vue.prototype.getToday = function() {
      return dealDateFun(new Date());
    };
    Vue.prototype.filterTime = function(date) {
      /**
       * 过滤
       */
      let str = date ? dealDateFun(date) : dealDateFun(new Date());
      return str;
    };
    Vue.prototype.getCustomDay = function(dayCount, dateStr) {
      /**
       * 前后 N天
       * dayCount : 正负数
       * */
      let date = dateStr ? new Date(dateStr) : new Date();
      let count = dayCount ? parseInt(dayCount) : 0;
      date.setDate(date.getDate() + count);
      return dealDateFun(date);
    };
    Vue.prototype.getAroundMonth = function(dateStr) {
      /**
       * 月初 月末
       */
      let date = dateStr ? new Date(dateStr) : new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let firstDate = new Date(y, m, 1);
      let endDay = new Date(
        firstDate.getTime() - 1000 * 60 * 60 * 24
      ).getDate();
      m = m < 10 ? "0" + m : m;
      let firstStr = y + DStyle + m + DStyle + "01";
      let endStr = y + DStyle + m + DStyle + endDay;
      return [firstStr, endStr];
    };
    Vue.prototype.getNowDateTime = function() {
      let date = new Date();
      let seperator1 = DStyle;
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    };
    Vue.prototype.getTimeStamp = function(n = 0) {
      /**
       *
       * 一天是86400秒
       * 前 N天
       * */
      var timeStamp = new Date(new Date().setHours(0, 0, 0, 0));
      var theDayAgo = timeStamp - 86400 * (!n ? 0 : parseInt(n)) * 1000;
      return theDayAgo;
    };
    // 过滤字符空格
    Vue.prototype.trimStrSpace = function(string) {
      return string.replace(/\s/g, "");
    };
    Vue.prototype.firstUpperCase = function(string) {
      if (!string) return "";
      let str =
        string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
      return str;
    };

    Vue.prototype.getStyle = (el, style) => {
      return parseInt(window.getComputedStyle(el, false)[style]);
    };
    //me
    Vue.prototype.getMonthoneTime = function() {
      //当前月初时间戳
      let firstgmonthstring = dealDateFun(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      );
      return getTimeStampstatues(firstgmonthstring);
    };
    Vue.prototype.getMonthlastTime = function() {
      //当前月末时间戳
      let dayssum = getMonthDays(new Date().getMonth());
      let lastgmonthstring = dealDateFun(
        new Date(new Date().getFullYear(), new Date().getMonth(), dayssum)
      );
      return getTimeStampstatues(lastgmonthstring) + 86400000 - 1;
    };
    Vue.prototype.weeksday7getDay = function(day) {
      let today = new Date();
      let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      tMonth = doHandleMonth(tMonth + 1);
      tDate = doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    };
    //me
    Vue.prototype.gettotlemouthDay = function(validday) {
      //加天数
      let date1 = new Date();
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() + validday);
      return (
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate()
      );
    };
    Vue.prototype.getMouthorYearDay = function(mouthday) {
      let d = new Date();
      d.setMonth(d.getMonth() + mouthday);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    };
    Vue.prototype.onlyInputnumber = function(num) {
      num = num.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      num = num.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      num = num.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      num = num
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两个小数
      num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      return num;
    };

    // 监听浏览器窗口大小缩放
    Vue.prototype.detectZoom = function() {
      var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (~ua.indexOf("msie")) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth;
      }
      if (ratio) {
        ratio = Math.round(ratio * 100);
      }
      return ratio;
    };

    // html {{xx|xx}}
    Vue.filter("formatTime", function(date) {
      let seperator1 = "-";
      let seperator2 = ":";
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh;
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      let ss = date.getSeconds();
      ss = ss < 10 ? "0" + ss : ss;
      return (
        y +
        seperator1 +
        m +
        seperator1 +
        d +
        " " +
        hh +
        seperator2 +
        mm +
        seperator2 +
        ss
      );
    });
    Vue.filter("dateBetweenDay", function(date) {
      var diff = new Date().getTime() - date;
      let num = 24 * 3600 * 1000;
      var days = Math.floor(diff / num);
      return days;
    });
    Vue.filter("time", function(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + DStyle + m + DStyle + d;
    });
    Vue.filter("time1", function(date) {
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return m + DStyle + d;
    });
    Vue.filter("timehf", function(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let f = date.getMinutes();
      f = f < 10 ? "0" + f : f;
      return y + DStyle + m + DStyle + d + "  " + h + ":" + f;
    });
    Vue.filter("timeDHF", function(date) {
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let f = date.getMinutes();
      f = f < 10 ? "0" + f : f;
      return h + ":" + f;
    });
    Vue.filter("money", function(value) {
      value = Number.parseFloat(value).toFixed(2);
      if (value > 10000) {
        value = Number.parseFloat(value / 10000).toFixed(2) + "万元";
      }
      return value;
    });
  }
};

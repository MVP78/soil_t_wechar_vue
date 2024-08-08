"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      isReport: "",
      reportData: [],
      adviceData: {}
    };
  },
  onShow() {
    this.isReport = common_vendor.index.getStorageSync("isReport");
    this.getAdvice();
    this.getReport();
  },
  methods: {
    //查看专家配方
    async getAdvice() {
      let id = common_vendor.index.getStorageSync("orderId");
      const res = await api_my.my.getAdvice(id);
      if (res.data.code === 200) {
        this.adviceData = res.data.data;
      }
    },
    //查看检测报告
    async getReport() {
      let id = common_vendor.index.getStorageSync("orderId");
      const res = await api_my.my.getReport(id);
      if (res.data.code === 200) {
        this.reportData = res.data.data;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isReport === true
  }, $data.isReport === true ? {
    b: common_vendor.f($data.reportData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.itemName),
        b: common_vendor.t(item.itemValue + item.itemUnit),
        c: item.itemLevel === "偏低"
      }, item.itemLevel === "偏低" ? {
        d: common_vendor.t(item.itemLevel)
      } : {}, {
        e: item.itemLevel === "标准"
      }, item.itemLevel === "标准" ? {
        f: common_vendor.t(item.itemLevel)
      } : {}, {
        g: item.itemLevel === "偏高"
      }, item.itemLevel === "偏高" ? {
        h: common_vendor.t(item.itemLevel)
      } : {});
    }),
    c: common_vendor.p({
      title: "报告检测项详情"
    })
  } : {
    d: common_vendor.t($data.adviceData.fertilizationAdvice),
    e: common_vendor.p({
      title: "施肥建议"
    }),
    f: common_vendor.t($data.adviceData.plantAdvice),
    g: common_vendor.p({
      title: "种植建议"
    }),
    h: common_vendor.t($data.adviceData.soilAdvice),
    i: common_vendor.p({
      title: "土壤建议"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/feedback_details/feedback_details.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      eventData: {},
      src: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E6%B4%BB%E5%8A%A8%E5%9B%BE%E7%89%87%2F%E5%86%9C%E5%9C%BA%E5%9B%BE%E7%89%877.jpg"
    };
  },
  onShow() {
    this.getEvent();
  },
  methods: {
    //获取活动信息
    async getEvent() {
      const res = await api_my.my.getEvent();
      if (res.data.code === 200) {
        this.eventData = res.data.data;
      }
    },
    //点击报名
    openRegistration() {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.removeStorageSync("farm");
          common_vendor.index.removeStorageSync("coupon");
          common_vendor.index.navigateTo({
            url: "/pages/registration/registration"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请先登录",
          duration: 1e3,
          icon: "error"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.src,
    b: common_vendor.t($data.eventData.atName),
    c: common_vendor.t($data.eventData.atDescription),
    d: common_vendor.t($data.eventData.endTime),
    e: common_vendor.t($data.eventData.atPrice),
    f: common_vendor.p({
      title: "活动流程",
      type: "line",
      titleFontSize: "20px",
      titleColor: "#01c22e"
    }),
    g: common_vendor.o(($event) => $options.openRegistration())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/event_details/event_details.vue"]]);
wx.createPage(MiniProgramPage);

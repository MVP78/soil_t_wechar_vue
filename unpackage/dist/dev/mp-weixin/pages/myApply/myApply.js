"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      applyList: [{
        id: 1,
        acName: "199元优惠券活动",
        acContent: "用于土壤检测活动的199元优惠券活动申请，土壤检测有助于分析土壤成分，并由专家发土壤配方，以帮助用户更科学地施肥，提高农作物产量和品质。",
        endTime: "2023-12-30 00:00:00",
        acState: "0",
        state: "0",
        price: "199"
      }],
      ordernull: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/ordernull.png"
    };
  },
  onShow() {
    this.getApplyList();
  },
  methods: {
    openApplyDetails(id) {
      common_vendor.index.setStorageSync("applyId", id);
      common_vendor.index.navigateTo({
        url: "/pages/apply_details/apply_details"
      });
    },
    async getApplyList() {
      let userId = common_vendor.index.getStorageSync("userId");
      const res = await api_my.my.getApplyList({
        userId
      });
      if (res.data.code === 200) {
        console.log(res.data.data);
        this.applyList = res.data.data;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.applyList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.acName),
        b: item.acState === "1"
      }, item.acState === "1" ? {} : {}, {
        c: item.acState === "0"
      }, item.acState === "0" ? {} : {}, {
        d: common_vendor.t(item.endTime),
        e: common_vendor.t(item.acContent),
        f: common_vendor.t(item.couponValue),
        g: item.state === "0"
      }, item.state === "0" ? {} : {}, {
        h: item.state === "1"
      }, item.state === "1" ? {} : {}, {
        i: item.state === "2"
      }, item.state === "2" ? {} : {}, {
        j: item.state === "3"
      }, item.state === "3" ? {} : {}, {
        k: common_vendor.o(($event) => $options.openApplyDetails(item.id), index),
        l: index
      });
    }),
    b: $data.applyList.length === 0
  }, $data.applyList.length === 0 ? {
    c: $data.ordernull
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/myApply/myApply.vue"]]);
wx.createPage(MiniProgramPage);

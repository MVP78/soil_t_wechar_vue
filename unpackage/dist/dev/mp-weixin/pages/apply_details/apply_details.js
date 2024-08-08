"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      applyId: null,
      applyData: {
        acContent: "199元优惠券",
        acName: "199元优惠券活动",
        acState: "0",
        applyReason: "用于节省土壤检测开支",
        couponUuid: 20231120085631,
        couponValue: 199,
        createBy: null,
        createTime: null,
        endTime: "2023-11-27 00:00:00",
        farmAddress: "河北省秦皇岛市山海关区",
        farmCrops: "草莓",
        farmName: "大溪花海农场",
        farmSize: 10,
        id: 17,
        remark: null,
        state: "3",
        updateBy: null,
        updateTime: null,
        userId: 3,
        userName: "方杰锋"
      }
    };
  },
  onShow() {
    this.applyId = common_vendor.index.getStorageSync("applyId");
    this.getApplyDetails(this.applyId);
  },
  methods: {
    async getApplyDetails(id) {
      const res = await api_my.my.getApplyDetails(id);
      if (res.data.code === 200) {
        console.log(res.data);
        this.applyData = res.data.data;
        if (this.applyData.state === "0") {
          this.title = "等待审核";
        } else if (this.applyData.state === "1") {
          this.title = "申请过期";
        } else if (this.applyData.state === "2") {
          this.title = "申请失败";
        } else {
          this.title = "申请成功";
        }
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
  return {
    a: common_vendor.t(_ctx.title),
    b: common_vendor.t($data.applyData.acName),
    c: common_vendor.t($data.applyData.couponValue),
    d: common_vendor.t($data.applyData.acContent),
    e: common_vendor.p({
      title: "优惠券活动详情",
      extra: $data.applyData.endTime
    }),
    f: common_vendor.t($data.applyData.userName),
    g: common_vendor.t($data.applyData.farmName),
    h: common_vendor.t($data.applyData.farmSize),
    i: common_vendor.t($data.applyData.farmCrops),
    j: common_vendor.t($data.applyData.farmAddress),
    k: common_vendor.t($data.applyData.applyReason),
    l: common_vendor.p({
      title: "申请详情"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/apply_details/apply_details.vue"]]);
wx.createPage(MiniProgramPage);

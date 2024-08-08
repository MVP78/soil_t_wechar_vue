"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      shenqing: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fshenqing.png",
      inputData1: "",
      inputData2: "",
      applyFormData: {
        userId: "",
        userName: "",
        farmId: "",
        farmName: "",
        applyReason: "",
        tempOne: null
      },
      couponEventData: {},
      rules: {
        userName: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        farmName: {
          rules: [{
            required: true,
            errorMessage: "农场不能为空"
          }]
        },
        applyReason: {
          rules: [{
            required: true,
            errorMessage: "理由不能为空"
          }]
        }
      }
    };
  },
  onUnload() {
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
  },
  onShow() {
    this.applyFormData.farmName = common_vendor.index.getStorageSync("farm").farmName;
    this.applyFormData.farmId = common_vendor.index.getStorageSync("farm").id;
    this.applyFormData.userId = common_vendor.index.getStorageSync("userId");
    this.applyFormData.userName = common_vendor.index.getStorageSync("userData").nickname;
    this.applyFormData.applyReason = common_vendor.index.getStorageSync("applyInputData");
    this.couponEventData = common_vendor.index.getStorageSync("couponEventData");
    this.applyFormData.tempOne = this.couponEventData.id;
  },
  methods: {
    onInput(event) {
      console.log(event);
      common_vendor.index.setStorageSync(`applyInputData`, event);
    },
    // 选择农场
    chooseFarm(entryState) {
      common_vendor.index.setStorageSync("entryState", entryState);
      common_vendor.index.navigateTo({
        url: "/pages/farm/farm"
      });
    },
    //点击提交
    submitForm() {
      this.$refs.form.validate().then((res) => {
        this.applyCoupon(this.applyFormData);
      }).catch((err) => {
        console.log("err", err);
      });
    },
    //申请优惠券
    async applyCoupon(applyFormData) {
      const res = await api_my.my.applyCoupon(applyFormData);
      if (res.data.code === 200) {
        this.clearForm();
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1e3);
        common_vendor.index.showToast({
          title: "申请已发送",
          duration: 1e3,
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "申请失败",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    clearForm() {
      this.applyFormData = [];
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.shenqing,
    b: common_vendor.t($data.couponEventData.endTime),
    c: $data.applyFormData.userName,
    d: common_vendor.o(($event) => $data.applyFormData.userName = $event.detail.value),
    e: common_vendor.p({
      label: "我的名称:",
      required: true,
      name: "userName",
      ["label-width"]: "200rpx"
    }),
    f: $data.applyFormData.farmName,
    g: common_vendor.o(($event) => $data.applyFormData.farmName = $event.detail.value),
    h: common_vendor.o(($event) => $options.chooseFarm("2")),
    i: common_vendor.p({
      label: "我的农场:",
      required: true,
      name: "farmName",
      ["label-width"]: "200rpx"
    }),
    j: common_vendor.o(($event) => $options.onInput($event)),
    k: common_vendor.o(($event) => $data.applyFormData.applyReason = $event),
    l: common_vendor.p({
      type: "textarea",
      autoHeight: true,
      placeholder: "请输入内容",
      modelValue: $data.applyFormData.applyReason
    }),
    m: common_vendor.p({
      label: "申请理由:",
      required: true,
      name: "applyReason",
      ["label-width"]: "200rpx"
    }),
    n: common_vendor.sr("form", "a9e82d10-0"),
    o: common_vendor.p({
      modelValue: $data.applyFormData,
      rules: $data.rules
    }),
    p: common_vendor.o(($event) => $options.submitForm())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/apply_coupon/apply_coupon.vue"]]);
wx.createPage(MiniProgramPage);

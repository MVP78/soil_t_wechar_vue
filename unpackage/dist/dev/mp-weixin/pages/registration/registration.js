"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      baoming: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fregistraion%2Fbaoming.png",
      coupon: [],
      farm: [],
      registrationFormData: {
        userId: null,
        farmId: "",
        farmName: "",
        //活动价格
        orderPrice: 599,
        //优惠劵
        couponId: "",
        couponVaule: "",
        //实付金额
        acPaid: ""
      },
      eventData: {
        atPrice: "500",
        startTime: "2023-11-10",
        endTime: "2024-05-20"
      },
      rules: {
        farmName: {
          rules: [{
            required: true,
            errorMessage: "农场不能为空"
          }]
        }
      }
    };
  },
  onShow() {
    this.getEvent();
    this.coupon = common_vendor.index.getStorageSync("coupon");
    this.registrationFormData.couponVaule = this.coupon.couponValue;
    this.registrationFormData.couponId = this.coupon.id;
    this.farm = common_vendor.index.getStorageSync("farm");
    this.registrationFormData.farmName = this.farm.farmName;
    this.registrationFormData.farmId = this.farm.id;
    this.registrationFormData.userId = common_vendor.index.getStorageSync("userId");
    this.registrationFormData.acPaid = this.registrationFormData.couponVaule ? this.registrationFormData.orderPrice - this.registrationFormData.couponVaule : this.registrationFormData.orderPrice;
    console.log(this.registrationFormData.farmName);
  },
  onUnload() {
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
  },
  methods: {
    //获取活动信息
    async getEvent() {
      const res = await api_my.my.getEvent();
      if (res.data.code === 200) {
        this.eventData = res.data.data;
        this.registrationFormData.orderPrice = this.eventData.atPrice;
      }
    },
    //点击缴费
    submitForm() {
      this.$refs.form.validate().then((res) => {
        this.addOrder(this.registrationFormData);
      }).catch((err) => {
        console.log("err", err);
      });
    },
    //生成订单
    async addOrder(registrationFormData) {
      console.log(registrationFormData);
      const res = await api_my.my.addOrder(registrationFormData);
      if (res.data.code === 200) {
        common_vendor.index.setStorageSync("orderCode", res.data.data.orderCode);
        common_vendor.index.setStorageSync("orderId", res.data.data.id);
        this.makePayment(res.data.data.id);
        this.$refs.popupDialog.open();
      } else {
        common_vendor.index.showToast({
          title: "报名失败",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    //点击关闭
    dialogClose() {
      this.clearForm();
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    //点击下一步
    dialogConfirm() {
      this.clearForm();
      this.$refs.popupDialog.close();
      common_vendor.index.navigateTo({
        url: "/pages/tutorial/tutorial"
      });
    },
    //选择优惠劵
    chooseCoupon() {
      common_vendor.index.navigateTo({
        url: `/pages/discount_coupon/discount_coupon`
      });
    },
    // 选择农场
    chooseFarm(entryState) {
      common_vendor.index.setStorageSync("entryState", entryState);
      common_vendor.index.navigateTo({
        url: `/pages/farm/farm`
      });
    },
    //进行支付
    async makePayment(orderId) {
      let userId = common_vendor.index.getStorageSync("userId");
      const res = await api_my.my.makePayment({
        id: orderId,
        userId,
        state: "1"
      });
      if (res.data.code === 200) {
        this.$refs.popupDialog.open();
      }
    },
    //清空表单
    clearForm() {
      this.registrationFormData = [];
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.baoming,
    b: common_vendor.t($data.eventData.atName),
    c: common_vendor.t($data.eventData.atPrice),
    d: common_vendor.t($data.eventData.endTime),
    e: common_vendor.o(($event) => $options.chooseCoupon()),
    f: $data.registrationFormData.couponVaule,
    g: common_vendor.o(($event) => $data.registrationFormData.couponVaule = $event.detail.value),
    h: common_vendor.p({
      label: "优惠劵/元:",
      name: "couponValue",
      ["label-width"]: "120px"
    }),
    i: $data.registrationFormData.couponVaule === void 0
  }, $data.registrationFormData.couponVaule === void 0 ? {
    j: common_vendor.o(($event) => $options.chooseCoupon())
  } : {}, {
    k: common_vendor.o(($event) => $options.chooseFarm("1")),
    l: $data.registrationFormData.farmName,
    m: common_vendor.o(($event) => $data.registrationFormData.farmName = $event.detail.value),
    n: common_vendor.p({
      label: "农场名称:",
      required: true,
      name: "farmName",
      ["label-width"]: "120px"
    }),
    o: $data.registrationFormData.farmName === void 0
  }, $data.registrationFormData.farmName === void 0 ? {
    p: common_vendor.o(($event) => $options.chooseFarm("1"))
  } : {}, {
    q: common_vendor.sr("form", "0b1abe90-0"),
    r: common_vendor.p({
      modelValue: $data.registrationFormData,
      rules: $data.rules
    }),
    s: common_vendor.t($data.registrationFormData.acPaid),
    t: common_vendor.o(($event) => $options.submitForm()),
    v: common_vendor.o($options.dialogConfirm),
    w: common_vendor.o($options.dialogClose),
    x: common_vendor.p({
      type: "success",
      cancelText: "关闭",
      confirmText: "下一步",
      title: "通知",
      content: "缴费成功"
    }),
    y: common_vendor.sr("popupDialog", "0b1abe90-3"),
    z: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/registration/registration.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      dizhi: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fdizhi.png",
      title: "",
      imgUrl: "",
      orderData: {
        orderCode: "",
        id: "123456",
        state: "0",
        nickname: "xiaohong",
        mobile: "15521917952",
        farmName: "农场一号",
        farmSize: 18,
        farmCrops: "草莓",
        farmAddress: "地址地址",
        soilPhoto: "图片",
        longitude: 12.1521,
        wildhood: 82.1532,
        dtAddress: "详细地址详细地址",
        deliveryMethod: "快递",
        orderPrice: 500,
        couponValue: 100,
        acPaid: 400
      },
      adviceData: {
        fertilizationAdvice: "施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议",
        plantAdvice: "种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议",
        soilAdvice: "土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议"
      },
      reportData: [{
        itemName: "有机质",
        itemValue: 10,
        itemUnit: "kg"
      }, {
        itemName: "有机质",
        itemValue: 10,
        itemUnit: "kg"
      }, {
        itemName: "有机质",
        itemValue: 10,
        itemUnit: "kg"
      }, {
        itemName: "有机质",
        itemValue: 10,
        itemUnit: "kg"
      }]
    };
  },
  onShow() {
    this.orderData.id = common_vendor.index.getStorageSync("orderId");
    this.getOrderdetail(this.orderData.id);
  },
  methods: {
    //点击标题跳转页面
    nextStep(state) {
      if (state === "0") {
        common_vendor.index.setStorageSync("orderId", this.orderData.id);
        this.makePayment(this.orderData.id);
      } else if (state === "1") {
        common_vendor.index.setStorageSync("orderId", this.orderData.id);
        common_vendor.index.navigateTo({
          url: "/pages/soil/soil"
        });
      } else if (state === "2") {
        common_vendor.index.setStorageSync("orderId", this.orderData.id);
        common_vendor.index.navigateTo({
          url: "/pages/sending_soil/sending_soil"
        });
      }
    },
    //点击下一步
    dialogConfirm() {
      this.$refs.popupDialog.close();
      common_vendor.index.navigateTo({
        url: "/pages/soil/soil"
      });
    },
    //点击关闭
    dialogClose() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    //获取订单详情
    async getOrderdetail(id) {
      console.log(id);
      const res = await api_my.my.getOrderdetail(id);
      if (res.data.code === 200) {
        this.orderData = res.data.data.data;
        this.imgUrl = "http://47.111.157.212:8787" + this.orderData.soilPhoto;
        if (this.orderData.state === "0") {
          this.title = "前往付款";
        } else if (this.orderData.state === "1") {
          this.title = "前往采土";
        } else if (this.orderData.state === "2") {
          this.title = "前往寄土";
        } else if (this.orderData.state === "3") {
          this.title = "等待报告";
        } else if (this.orderData.state === "4") {
          this.title = "等待配方";
        } else {
          this.title = "订单完成";
        }
      }
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
    //点击专家配方
    openFeedback(isReport) {
      common_vendor.index.setStorageSync("isReport", isReport);
      common_vendor.index.setStorageSync("orderId", this.orderData.id);
      common_vendor.index.navigateTo({
        url: "/pages/feedback_details/feedback_details"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: common_vendor.o(($event) => $options.nextStep($data.orderData.state)),
    c: common_vendor.t($data.orderData.orderCode),
    d: common_vendor.t($data.orderData.id),
    e: common_vendor.t($data.orderData.orderPrice),
    f: $data.orderData.couponValue
  }, $data.orderData.couponValue ? {
    g: common_vendor.t($data.orderData.couponValue)
  } : {}, {
    h: common_vendor.t($data.orderData.acPaid),
    i: common_vendor.p({
      title: "订单详情",
      extra: $data.orderData.orderTime
    }),
    j: common_vendor.t($data.orderData.nickname),
    k: common_vendor.t($data.orderData.mobile),
    l: common_vendor.p({
      title: "个人信息"
    }),
    m: common_vendor.t($data.orderData.farmName),
    n: common_vendor.t($data.orderData.farmSize),
    o: common_vendor.t($data.orderData.farmCrops),
    p: common_vendor.t($data.orderData.farmAddress),
    q: common_vendor.p({
      title: "农场信息"
    }),
    r: $data.orderData.state === "2" || $data.orderData.state === "3" || $data.orderData.state === "4" || $data.orderData.state === "5"
  }, $data.orderData.state === "2" || $data.orderData.state === "3" || $data.orderData.state === "4" || $data.orderData.state === "5" ? common_vendor.e({
    s: $data.orderData.soilPhoto
  }, $data.orderData.soilPhoto ? {
    t: $data.imgUrl
  } : {}, {
    v: common_vendor.t($data.orderData.longitude),
    w: common_vendor.t($data.orderData.wildhood),
    x: $data.dizhi,
    y: common_vendor.t($data.orderData.dtAddress),
    z: common_vendor.p({
      title: "采土信息"
    })
  }) : {}, {
    A: $data.orderData.state === "3" || $data.orderData.state === "4" || $data.orderData.state === "5"
  }, $data.orderData.state === "3" || $data.orderData.state === "4" || $data.orderData.state === "5" ? common_vendor.e({
    B: common_vendor.t($data.orderData.deliveryMethod),
    C: $data.orderData.trackingNumber
  }, $data.orderData.trackingNumber ? {
    D: common_vendor.t($data.orderData.trackingNumber)
  } : {
    E: common_vendor.t($data.orderData.arrivalTime)
  }, {
    F: common_vendor.p({
      title: "寄土信息"
    })
  }) : {}, {
    G: $data.orderData.state === "3"
  }, $data.orderData.state === "3" ? {} : {}, {
    H: $data.orderData.state === "4" || $data.orderData.state === "5"
  }, $data.orderData.state === "4" || $data.orderData.state === "5" ? {
    I: common_vendor.o(($event) => $options.openFeedback(true))
  } : {}, {
    J: $data.orderData.state === "4"
  }, $data.orderData.state === "4" ? {} : {}, {
    K: $data.orderData.state === "5"
  }, $data.orderData.state === "5" ? {
    L: common_vendor.o(($event) => $options.openFeedback(false))
  } : {}, {
    M: common_vendor.o($options.dialogConfirm),
    N: common_vendor.o($options.dialogClose),
    O: common_vendor.p({
      type: "success",
      cancelText: "关闭",
      confirmText: "下一步",
      title: "通知",
      content: "缴费成功"
    }),
    P: common_vendor.sr("popupDialog", "948da188-5"),
    Q: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/order_details/order_details.vue"]]);
wx.createPage(MiniProgramPage);

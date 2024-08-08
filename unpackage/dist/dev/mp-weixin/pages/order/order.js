"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      userId: null,
      currentTab: 0,
      nub0: [],
      nub1: [],
      nub2: [],
      nub3: [],
      nub4: [],
      nub5: [],
      tabOptions: ["待支付", "未采土", "未寄土", "待报告", "待配方", "已完成"],
      order: [],
      orderNull: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/ordernull.png"
    };
  },
  onShow() {
    this.currentTab = common_vendor.index.getStorageSync("currentTab");
    this.userId = common_vendor.index.getStorageSync("userId");
    this.getOrderlist(this.userId);
  },
  methods: {
    onClickItem(e) {
      if (this.currentTab != e.currentIndex) {
        this.currentTab = e.currentIndex;
      }
    },
    //点击缴费
    dialogToggle(orderId2) {
      this.makePayment(orderId2);
    },
    //点击下一步跳转采土打卡
    dialogConfirm() {
      common_vendor.index.setStorageSync("orderId", orderId);
      common_vendor.index.navigateTo({
        url: "/pages/soil/soil"
      });
    },
    //点击关闭
    dialogClose() {
      this.getOrderlist(this.userId);
    },
    //点击前往采土
    openSoil(order) {
      common_vendor.index.setStorageSync("orderId", order.id);
      common_vendor.index.setStorageSync("orderCode", order.orderCode);
      common_vendor.index.navigateTo({
        url: "/pages/tutorial/tutorial"
      });
    },
    //点击前往寄土
    openSendsoil(order) {
      common_vendor.index.setStorageSync("orderId", order.id);
      common_vendor.index.setStorageSync("orderCode", order.orderCode);
      common_vendor.index.navigateTo({
        url: "/pages/sending_soil/sending_soil"
      });
    },
    //打开订单详情
    openDetailedorder(order) {
      common_vendor.index.setStorageSync("orderId", order.id);
      common_vendor.index.setStorageSync("orderCode", order.orderCode);
      common_vendor.index.navigateTo({
        url: "/pages/order_details/order_details"
      });
    },
    //获取用户订单列表	
    async getOrderlist(userId) {
      const res = await api_my.my.getOrderlist({
        userId
      });
      if (res.data.code === 200) {
        this.order = res.data.data;
        this.order.forEach((item) => {
          if (item.state === "0") {
            this.nub0.push(item);
          } else if (item.state === "1") {
            this.nub1.push(item);
          } else if (item.state === "2") {
            this.nub2.push(item);
          } else if (item.state === "3") {
            this.nub3.push(item);
          } else if (item.state === "4") {
            this.nub4.push(item);
          } else if (item.state === "5") {
            this.nub5.push(item);
          }
        });
      }
    },
    //进行支付
    async makePayment(orderId2) {
      const res = await api_my.my.makePayment({
        id: orderId2,
        userId: this.userId,
        state: "1"
      });
      if (res.data.code === 200) {
        this.$refs.popupDialog.open();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.currentTab,
      values: $data.tabOptions,
      styleType: "text",
      activeColor: "#01c22e"
    }),
    c: $data.currentTab === 0
  }, $data.currentTab === 0 ? common_vendor.e({
    d: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "0"
      }, item.state === "0" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid),
        h: common_vendor.o(($event) => $options.dialogToggle(item.id), index),
        i: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      } : {}, {
        j: index
      });
    }),
    e: $data.nub0.length === 0
  }, $data.nub0.length === 0 ? {
    f: _ctx.ordernull
  } : {}) : {}, {
    g: $data.currentTab === 1
  }, $data.currentTab === 1 ? common_vendor.e({
    h: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "1"
      }, item.state === "1" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid),
        h: common_vendor.o(($event) => $options.openSoil(item), index),
        i: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      } : {}, {
        j: index
      });
    }),
    i: $data.nub1.length === 0
  }, $data.nub1.length === 0 ? {
    j: _ctx.ordernull
  } : {}) : {}, {
    k: $data.currentTab === 2
  }, $data.currentTab === 2 ? common_vendor.e({
    l: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "2"
      }, item.state === "2" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid),
        h: common_vendor.o(($event) => $options.openSendsoil(item), index)
      } : {}, {
        i: index,
        j: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      });
    }),
    m: $data.nub2.length === 0
  }, $data.nub2.length === 0 ? {
    n: _ctx.ordernull
  } : {}) : {}, {
    o: $data.currentTab === 3
  }, $data.currentTab === 3 ? common_vendor.e({
    p: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "3"
      }, item.state === "3" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid)
      } : {}, {
        h: index,
        i: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      });
    }),
    q: $data.nub3.length === 0
  }, $data.nub3.length === 0 ? {
    r: _ctx.ordernull
  } : {}) : {}, {
    s: $data.currentTab === 4
  }, $data.currentTab === 4 ? common_vendor.e({
    t: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "4"
      }, item.state === "4" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid),
        h: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      } : {}, {
        i: index
      });
    }),
    v: $data.nub4.length === 0
  }, $data.nub4.length === 0 ? {
    w: _ctx.ordernull
  } : {}) : {}, {
    x: $data.currentTab === 5
  }, $data.currentTab === 5 ? common_vendor.e({
    y: common_vendor.f($data.order, (item, index, i0) => {
      return common_vendor.e({
        a: item.state === "5"
      }, item.state === "5" ? {
        b: common_vendor.t(item.orderCode),
        c: common_vendor.t(item.orderTime),
        d: common_vendor.t(item.farmName),
        e: common_vendor.t(item.farmCrops),
        f: common_vendor.t(item.farmAddress),
        g: common_vendor.t(item.acPaid),
        h: common_vendor.o(($event) => $options.openDetailedorder(item), index)
      } : {}, {
        i: index
      });
    }),
    z: $data.nub5.length === 0
  }, $data.nub5.length === 0 ? {
    A: _ctx.ordernull
  } : {}) : {}, {
    B: common_vendor.o($options.dialogConfirm),
    C: common_vendor.o($options.dialogClose),
    D: common_vendor.p({
      type: "success",
      cancelText: "关闭",
      confirmText: "下一步",
      title: "通知",
      content: "缴费成功"
    }),
    E: common_vendor.sr("popupDialog", "93207a4f-1"),
    F: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-93207a4f"], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      couponEventDate: [],
      huodong: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fhuodong.png",
      baoming: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fbaoming.png",
      gonggao: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fgonggao.png",
      caitu: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fcaitu.png",
      jitu: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fjitu.png"
    };
  },
  onShow() {
    this.getCouponEventList();
  },
  onLoad() {
    this.$refs.popup.open();
  },
  methods: {
    //点击海报申请优惠券
    openApply(item) {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.removeStorageSync("applyInputData");
          common_vendor.index.removeStorageSync("farm");
          common_vendor.index.setStorageSync("couponEventData", item);
          common_vendor.index.navigateTo({
            url: "/pages/apply_coupon/apply_coupon"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请先登录",
          duration: 1e3,
          icon: "error"
        });
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
    },
    //点击寄土采土跳转对应订单列表
    openOrder(currentTab) {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.setStorageSync("currentTab", currentTab);
          common_vendor.index.navigateTo({
            url: "/pages/order/order"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请先登录",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    //点击活动弹窗
    openSoilDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/event_details/event_details"
      });
    },
    //点击X
    colsePopup() {
      this.$refs.popup.close();
    },
    //点击公告
    openNotice() {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/notice/notice"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请先登录",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    //获取优惠券活动列表
    async getCouponEventList() {
      const res = await api_my.my.getCouponEventList();
      if (res.data.code === 200) {
        let arr = res.data.rows.map((obj) => {
          obj.acPoster = "http://47.111.157.212:8787" + obj.acPoster;
          return obj;
        });
        this.couponEventDate = arr;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_notice_bar2 + _easycom_uni_popup2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.couponEventDate, (item, index, i0) => {
      return {
        a: item.acPoster,
        b: common_vendor.o(($event) => $options.openApply(item), index),
        c: index
      };
    }),
    b: _ctx.autoplay,
    c: common_vendor.o(($event) => $options.openSoilDetail()),
    d: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "广东省土壤检测配方活动火热进行中,点击前往查看详情.."
    }),
    e: $data.baoming,
    f: common_vendor.o(($event) => $options.openRegistration()),
    g: $data.gonggao,
    h: common_vendor.o(($event) => $options.openNotice()),
    i: $data.caitu,
    j: common_vendor.o(($event) => $options.openOrder(1)),
    k: $data.jitu,
    l: common_vendor.o(($event) => $options.openOrder(2)),
    m: $data.huodong,
    n: common_vendor.o(($event) => $options.openSoilDetail()),
    o: common_vendor.o(($event) => $options.colsePopup()),
    p: common_vendor.sr("popup", "1cf27b2a-1"),
    q: common_vendor.p({
      type: "center",
      ["mask-click"]: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

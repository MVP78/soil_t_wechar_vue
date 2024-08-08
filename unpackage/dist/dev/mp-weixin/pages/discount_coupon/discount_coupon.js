"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      yhq: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fyhq.png",
      userId: null,
      isExpire: false,
      soil_coupon: [],
      noUsedCouponNumber: 0,
      usedCouponNumber: 0,
      textnull: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/textnull.png"
    };
  },
  onShow() {
    this.userId = common_vendor.index.getStorageSync("userId");
    this.getCouponlist(this.userId);
  },
  methods: {
    //选择优惠劵
    selectTap(coupon) {
      common_vendor.index.setStorageSync("coupon", coupon);
      common_vendor.index.navigateTo({
        url: `/pages/registration/registration`
      });
    },
    //切换可用和不可以优惠劵界面
    toggleExpire() {
      this.isExpire = !this.isExpire;
    },
    //获取列表数据
    async getCouponlist(userId) {
      const res = await api_my.my.getCoupon({
        userId
      });
      if (res.data.code === 200) {
        this.soil_coupon = res.data.data;
        let filterArr1 = [];
        let filterArr2 = [];
        this.soil_coupon.forEach((item) => {
          if (item.isUsed === "0") {
            filterArr1.push(item);
          } else {
            filterArr2.push(item);
          }
        });
        this.noUsedCouponNumber = filterArr1.length;
        this.usedCouponNumber = filterArr2.length;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isExpire === false
  }, $data.isExpire === false ? {
    b: common_vendor.o((...args) => $options.toggleExpire && $options.toggleExpire(...args))
  } : {
    c: common_vendor.o((...args) => $options.toggleExpire && $options.toggleExpire(...args))
  }, {
    d: $data.noUsedCouponNumber === 0 && $data.isExpire === false
  }, $data.noUsedCouponNumber === 0 && $data.isExpire === false ? {
    e: $data.textnull
  } : {}, {
    f: $data.usedCouponNumber === 0 && $data.isExpire === true
  }, $data.usedCouponNumber === 0 && $data.isExpire === true ? {
    g: $data.textnull
  } : {}, {
    h: common_vendor.f($data.soil_coupon, (item, index, i0) => {
      return common_vendor.e({
        a: item.isUsed === "0" && $data.isExpire === false
      }, item.isUsed === "0" && $data.isExpire === false ? common_vendor.e({
        b: $data.yhq,
        c: common_vendor.t(item.endTime),
        d: item.isUsed === "0"
      }, item.isUsed === "0" ? {
        e: common_vendor.t(item.couponValue),
        f: common_vendor.o(($event) => $options.selectTap(item), index)
      } : {}) : {}, {
        g: $data.isExpire === true && (item.isUsed === "1" || item.isUsed === "2")
      }, $data.isExpire === true && (item.isUsed === "1" || item.isUsed === "2") ? common_vendor.e({
        h: $data.yhq,
        i: common_vendor.t(item.endTime),
        j: item.isUsed === "1"
      }, item.isUsed === "1" ? {
        k: common_vendor.t(item.couponValue)
      } : {}, {
        l: item.isUsed === "2"
      }, item.isUsed === "2" ? {
        m: common_vendor.t(item.couponValue)
      } : {}) : {}, {
        n: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/discount_coupon/discount_coupon.vue"]]);
wx.createPage(MiniProgramPage);

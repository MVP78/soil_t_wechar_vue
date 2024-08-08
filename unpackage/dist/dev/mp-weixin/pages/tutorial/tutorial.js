"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5e3,
      duration: 500,
      swiperList: [
        {
          src: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F1.png"
        },
        {
          src: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F2.png"
        },
        {
          src: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F3.png"
        },
        {
          src: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F4.png"
        }
      ]
    };
  },
  methods: {
    openSoil() {
      common_vendor.index.navigateTo({
        url: "/pages/soil/soil"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.src,
        b: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: common_vendor.o(($event) => $options.openSoil())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/tutorial/tutorial.vue"]]);
wx.createPage(MiniProgramPage);

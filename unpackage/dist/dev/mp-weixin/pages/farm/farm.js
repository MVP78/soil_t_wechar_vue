"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      xiugai: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fxiugai.png",
      shanchu: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fshanchu.png",
      userId: null,
      entryState: "0",
      title: "",
      content: "",
      soil_farm: [],
      textnull: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/textnull.png"
    };
  },
  onShow() {
    this.entryState = common_vendor.index.getStorageSync("entryState");
    this.userId = common_vendor.index.getStorageSync("userId");
    this.getSoilfarm(this.userId);
  },
  methods: {
    //选择农场
    selectTap(farm) {
      common_vendor.index.setStorageSync("farm", farm);
      if (this.entryState === "1") {
        common_vendor.index.navigateTo({
          url: `/pages/registration/registration`
        });
      } else if (this.entryState === "2") {
        common_vendor.index.navigateTo({
          url: "/pages/apply_coupon/apply_coupon"
        });
      }
    },
    //打开新增或修改农场地址表单
    openPopup(openId) {
      common_vendor.index.setStorageSync("openId", openId);
      common_vendor.index.navigateTo({
        url: `/pages/farm_modify/farm_modify`
      });
    },
    //删除农场
    deleteFarm(id) {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "您确定要删除该农场吗？",
        success: (res) => {
          if (res.confirm) {
            console.log(id);
            this.removeFarm(id);
          }
        }
      });
    },
    //重新获取数据
    async getSoilfarm(userId) {
      const res = await api_my.my.getFarmlist({
        userId
      });
      if (res.statusCode === 200) {
        this.soil_farm = res.data;
      }
    },
    async removeFarm(id) {
      console.log(id);
      let userId = this.userId;
      const res = await api_my.my.deleteFarm({
        userId,
        id
      });
      if (res.data.code === 200) {
        this.getSoilfarm(this.userId);
        common_vendor.index.showToast({
          title: "删除成功",
          duration: 1e3,
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "删除失败",
          duration: 1e3,
          icon: "error"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.soil_farm, (item, index, i0) => {
      return {
        a: common_vendor.t(item.farmName),
        b: common_vendor.t(item.farmSize),
        c: common_vendor.t(item.farmCrops),
        d: common_vendor.t(item.farmAddress),
        e: common_vendor.o(($event) => $options.selectTap(item), index),
        f: common_vendor.o(($event) => $options.openPopup(item.id), index),
        g: common_vendor.o(($event) => $options.deleteFarm(item.id), index),
        h: index
      };
    }),
    b: $data.xiugai,
    c: $data.shanchu,
    d: $data.soil_farm.length === 0
  }, $data.soil_farm.length === 0 ? {
    e: $data.textnull
  } : {}, {
    f: common_vendor.o(($event) => $options.openPopup("-1"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/farm/farm.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      kefu: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fkefu.png",
      nongchang: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fnongchang.png",
      youhuiquan: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fyouhuiquan.png",
      dingdan: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2F31dingdan.png",
      myApply: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/myApply.png",
      isLogin: false,
      userId: null,
      userData: {
        avatarUrl: "",
        mobile: "",
        nickname: ""
      }
    };
  },
  onShow() {
    if (common_vendor.index.getStorageSync("token")) {
      this.getUserinfo();
    }
  },
  methods: {
    //点击登录
    wxLogin() {
      let _this = this;
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          console.log(loginRes);
          _this.toLogin(loginRes.code);
        }
      });
    },
    //登录
    async toLogin(code) {
      let _this = this;
      const response = await api_my.my.login({
        appid: "wxd56d534af754b002",
        code
      });
      if (response.data.code === 200) {
        common_vendor.index.setStorageSync("token", response.data.data.token);
        common_vendor.index.setStorageSync("userId", response.data.data.user.id);
        this.userData = response.data.data.user;
        this.userData.avatarUrl = "http://47.111.157.212:8787" + this.userData.avatarUrl;
        common_vendor.index.setStorageSync("userData", response.data.data.user);
        this.isLogin = true;
      } else {
        common_vendor.index.showModal({
          title: "授权",
          content: "您确定授权登录该小程序吗？",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.setStorageSync("token", response.data.data.token);
              common_vendor.index.getUserInfo({
                provider: "weixin",
                success: function(infoRes) {
                  console.log("11111111111111");
                  console.log(infoRes);
                  _this.auth(infoRes.userInfo);
                }
              });
            }
          }
        });
      }
    },
    //授权
    async auth(userInfo) {
      const res = await api_my.my.postAuth({
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickName
      });
      if (res.data.code === 200) {
        common_vendor.index.setStorageSync("userId", res.data.data.userId);
        this.getUserinfo();
      }
    },
    //获取用户信息
    async getUserinfo() {
      let id = common_vendor.index.getStorageSync("userId");
      const res = await api_my.my.getUser({
        userId: id
      });
      if (res.data.code === 200) {
        this.userData = res.data.data.soilUser;
        common_vendor.index.setStorageSync("userData", res.data.data.soilUser);
        console.log("222222222222222222");
        console.log(this.userData);
        this.userData.avatarUrl = "http://47.111.157.212:8787" + this.userData.avatarUrl;
        this.isLogin = true;
      }
    },
    //编辑个人信息	
    openMyInfo() {
      common_vendor.index.removeStorageSync("myInfoInputData1");
      common_vendor.index.removeStorageSync("myInfoInputData2");
      common_vendor.index.removeStorageSync("imgFilePath");
      common_vendor.index.navigateTo({
        url: "/pages/personal_details/personal_details"
      });
    },
    //打开优惠券
    chooseCoupon() {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/discount_coupon/discount_coupon"
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
    //打开农场列表
    chooseFarm(entryState) {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.setStorageSync("entryState", entryState);
          common_vendor.index.navigateTo({
            url: `/pages/farm/farm`
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
    //打开订单列表
    chooseOrder(currentTab) {
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
            url: `/pages/order/order`
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
    //打开我的申请
    chooseApply() {
      if (common_vendor.index.getStorageSync("token")) {
        if (common_vendor.index.getStorageSync("userData").nickname === "微信用户" || common_vendor.index.getStorageSync("userData").mobile === "") {
          common_vendor.index.showToast({
            title: "请先填写个人信息",
            duration: 1e3,
            icon: "error"
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/myApply/myApply"
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
    contact() {
      common_vendor.wx$1.openCustomerServiceChat({
        extInfo: {
          url: ""
        },
        corpId: "",
        success(res) {
        },
        fail(error) {
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin
  }, $data.isLogin ? {
    b: $data.userData.avatarUrl,
    c: common_vendor.t($data.userData.nickname),
    d: common_vendor.o(($event) => $options.openMyInfo())
  } : {
    e: common_vendor.p({
      type: "contact-filled",
      size: "100"
    }),
    f: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args))
  }, {
    g: $data.dingdan,
    h: common_vendor.p({
      showArrow: true
    }),
    i: common_vendor.o(($event) => $options.chooseOrder(0)),
    j: $data.youhuiquan,
    k: common_vendor.p({
      showArrow: true
    }),
    l: common_vendor.o(($event) => $options.chooseCoupon()),
    m: $data.nongchang,
    n: common_vendor.p({
      showArrow: true
    }),
    o: common_vendor.o(($event) => $options.chooseFarm("0")),
    p: $data.myApply,
    q: common_vendor.p({
      showArrow: true
    }),
    r: common_vendor.o(($event) => $options.chooseApply()),
    s: common_vendor.p({
      title: "个人管理",
      type: "line"
    }),
    t: $data.kefu
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);

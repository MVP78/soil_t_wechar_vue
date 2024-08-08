"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/message/message.js";
  "./pages/my/my.js";
  "./pages/farm/farm.js";
  "./pages/order/order.js";
  "./pages/farm_modify/farm_modify.js";
  "./pages/personal_details/personal_details.js";
  "./pages/discount_coupon/discount_coupon.js";
  "./pages/order_details/order_details.js";
  "./pages/soil/soil.js";
  "./pages/registration/registration.js";
  "./pages/sending_soil/sending_soil.js";
  "./pages/tutorial/tutorial.js";
  "./pages/apply_coupon/apply_coupon.js";
  "./pages/notice/notice.js";
  "./pages/event_details/event_details.js";
  "./pages/feedback_details/feedback_details.js";
  "./pages/myApply/myApply.js";
  "./pages/apply_details/apply_details.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/下载/测试/soil_t_wechar_vue/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      userId: null,
      content: "",
      messageList: [],
      stateData: {}
    };
  },
  onShow() {
    this.userId = common_vendor.index.getStorageSync("userId");
    this.getMassage(this.userId);
  },
  methods: {
    async getMassage(id) {
      const res = await api_my.my.getMessageList({
        userId: id
      });
      if (res.data.code === 200) {
        let dataArr = res.data.data;
        let arr = dataArr.map((obj) => {
          if (obj.state === "0") {
            obj.isRead = true;
          } else if (obj.state === "1") {
            obj.isRead = false;
          }
          const date = new Date(obj.createdAt);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;
          obj.createdAt = formattedDate;
          return obj;
        });
        this.messageList = arr;
      }
    },
    async openMessage(id) {
      const res = await api_my.my.getMessage(id);
      if (res.data.code === 200) {
        this.content = res.data.data.content;
        if (res.data.data.state === "0") {
          this.stateData.id = id;
          this.stateData.userId = this.userId;
          this.updateState(this.stateData);
        }
        this.$refs.popupDialog.open();
      }
    },
    async updateState(stateData) {
      const res = await api_my.my.updateState(stateData);
      if (res.data.code === 200) {
        this.getMassage(this.userId);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.messageList, (item, index, i0) => {
      return {
        a: "4c1b26cf-1-" + i0 + "," + ("4c1b26cf-0-" + i0),
        b: common_vendor.p({
          ellipsis: "1",
          title: item.content,
          rightText: item.createdAt,
          showArrow: true,
          ["show-badge"]: item.isRead,
          ["badge-text"]: "!"
        }),
        c: common_vendor.o(($event) => $options.openMessage(item.id), index),
        d: index,
        e: "4c1b26cf-0-" + i0
      };
    }),
    b: common_vendor.o(_ctx.dialogClose),
    c: common_vendor.p({
      type: "success",
      cancelText: "关闭",
      title: "消息",
      content: $data.content
    }),
    d: common_vendor.sr("popupDialog", "4c1b26cf-2"),
    e: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const api_my = require("../../api/my.js");
const common_vendor = require("../../common/vendor.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabOptions: ["公告", "通知"],
      noticeListData: [],
      noticeData: {}
    };
  },
  onShow() {
    this.getNoticeList();
  },
  methods: {
    onClickItem(e) {
      if (this.currentTab != e.currentIndex) {
        this.currentTab = e.currentIndex;
      }
    },
    async getNoticeList() {
      const res = await api_my.my.getNoticeList();
      if (res.data.code === 200) {
        this.noticeListData = res.data.data;
      }
    },
    async openNotice(noticeId) {
      const res = await api_my.my.getNotice(noticeId);
      if (res.data.code === 200) {
        this.noticeData = res.data.data;
        const date = new Date(res.data.data.createTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        this.noticeData.createTime = formattedDate;
        this.noticeData.noticeContent = this.noticeData.noticeContent.replace(/<[^>]+>/g, "");
        this.$refs.popup.open();
      }
    },
    closePopup() {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_popup)();
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
  }, $data.currentTab === 0 ? {
    d: common_vendor.f($data.noticeListData, (item, index, i0) => {
      return common_vendor.e({
        a: item.noticeType === "2"
      }, item.noticeType === "2" ? {
        b: "60cccc50-2-" + i0 + "," + ("60cccc50-1-" + i0),
        c: common_vendor.p({
          ellipsis: "1",
          title: item.noticeTitle,
          showArrow: true
        }),
        d: common_vendor.o(($event) => $options.openNotice(item.noticeId), index)
      } : {}, {
        e: index,
        f: "60cccc50-1-" + i0
      });
    })
  } : {}, {
    e: $data.currentTab === 1
  }, $data.currentTab === 1 ? {
    f: common_vendor.f($data.noticeListData, (item, index, i0) => {
      return common_vendor.e({
        a: item.noticeType === "1"
      }, item.noticeType === "1" ? {
        b: "60cccc50-4-" + i0 + "," + ("60cccc50-3-" + i0),
        c: common_vendor.p({
          ellipsis: "1",
          title: item.noticeTitle,
          showArrow: true
        }),
        d: common_vendor.o(($event) => $options.openNotice(item.noticeId), index)
      } : {}, {
        e: index,
        f: "60cccc50-3-" + i0
      });
    })
  } : {}, {
    g: common_vendor.t($data.noticeData.noticeContent),
    h: common_vendor.p({
      title: $data.noticeData.noticeTitle,
      extra: $data.noticeData.createTime
    }),
    i: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    j: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    k: common_vendor.sr("popup", "60cccc50-5"),
    l: common_vendor.o(_ctx.change),
    m: common_vendor.p({
      ["background-color"]: "#fff"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);

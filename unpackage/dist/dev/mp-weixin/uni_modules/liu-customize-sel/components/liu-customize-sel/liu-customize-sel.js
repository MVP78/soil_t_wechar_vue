"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_liuCustomizeSel_city = require("../../city.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  props: {
    //是否开启动画
    animation: {
      type: Boolean,
      default: true
    },
    //是否点击阴影关闭
    isMask: {
      type: Boolean,
      default: true
    },
    //是否开启安全条
    safeArea: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    confirmClass() {
      return this.checkArr.length == this.tabList.length ? "sel-top-right-check" : "sel-top-right";
    }
  },
  data() {
    return {
      isShow: false,
      checkBox: [],
      noDataImg: "",
      cityList: uni_modules_liuCustomizeSel_city.cityList,
      tabId: 0,
      //计算当前顶部滑块id
      checkArr: [],
      id: 0,
      //通tabId，他们2的区别是，id先赋值，tabId在数据请求成功后才会赋值
      tabList: [
        {
          title: "选择所在省",
          id: 0
        },
        {
          title: "选择所在市",
          id: 1
        },
        {
          title: "选择所在县",
          id: 2
        }
      ]
    };
  },
  mounted() {
    this.noDataImg = common_assets.noData;
  },
  methods: {
    init() {
      this.id = 0;
      this.tabId = 0;
      this.checkBox = [];
      this.checkArr = [];
      this.getData();
    },
    open() {
      this.isShow = true;
      this.init();
    },
    close() {
      this.isShow = false;
    },
    async check(index) {
      this.$set(this.checkArr, this.id, this.checkBox[this.id][index]);
      if (this.id < this.tabList.length - 1)
        this.id = this.id + 1;
      await this.getData();
      if (this.tabId < this.tabList.length - 1)
        this.tabId = this.tabId + 1;
    },
    checkTab(e) {
      if (e == this.id)
        return;
      this.id = e;
      this.tabId = e;
      this.checkArr = this.checkArr.splice(0, e);
    },
    getResult(event) {
      if (event == "confirm") {
        if (this.checkArr.length != this.tabList.length)
          return;
        let result = this.checkArr;
        this.$emit("change", {
          value: result
        });
      }
      this.close();
    },
    async getData() {
      var _a, _b, _c, _d;
      if (this.checkArr.length == this.tabList.length)
        return;
      let list = [];
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      if (this.checkArr.length) {
        var id = (_b = (_a = this.checkArr) == null ? void 0 : _a[this.id - 1]) == null ? void 0 : _b.value;
        let idList = (_d = (_c = this.checkBox) == null ? void 0 : _c[this.id - 1]) == null ? void 0 : _d.find((item) => {
          return item.value == id;
        });
        idList == null ? void 0 : idList.children.map((e) => {
          list.push(e);
        });
        common_vendor.index.hideLoading();
        this.$set(this.checkBox, this.id, list);
      } else {
        this.cityList.map((e) => {
          list.push(e);
        });
        common_vendor.index.hideLoading();
        this.$set(this.checkBox, this.id, list);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.getResult("cancel")),
    b: common_vendor.n($options.confirmClass),
    c: common_vendor.o(($event) => $options.getResult("confirm")),
    d: common_vendor.f($data.tabList, (i, e, i0) => {
      return common_vendor.e({
        a: $data.tabId >= e
      }, $data.tabId >= e ? {
        b: common_vendor.t($data.checkArr[e] ? $data.checkArr[e].label : i.title),
        c: "se-" + e,
        d: common_vendor.n($data.tabId == e ? " sel-title-item-true" : "sel-title-item-false")
      } : {}, {
        e,
        f: common_vendor.o(($event) => $options.checkTab(e), e)
      });
    }),
    e: $data.checkBox.length && $data.checkBox[$data.tabId]
  }, $data.checkBox.length && $data.checkBox[$data.tabId] ? {
    f: common_vendor.f($data.checkBox[$data.tabId], (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index,
        c: common_vendor.o(($event) => $options.check(index), index),
        d: common_vendor.n($data.checkArr[$data.tabId] ? item.label == $data.checkArr[$data.tabId].label ? "sel-scroll-view-item-true" : "sel-scroll-view-item" : "sel-scroll-view-item")
      };
    })
  } : {
    g: $data.noDataImg
  }, {
    h: $props.safeArea,
    i: common_vendor.n($data.isShow ? "sel-open" : ""),
    j: common_vendor.n($props.animation ? "sel-animation" : ""),
    k: $data.isShow,
    l: common_vendor.o(($event) => $props.isMask ? $options.close() : "")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f9d47a01"], ["__file", "D:/下载/测试/soil_t_wechar_vue/uni_modules/liu-customize-sel/components/liu-customize-sel/liu-customize-sel.vue"]]);
wx.createComponent(Component);

"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk = require("../../utils/qqmap-wx-jssdk.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      orderId: null,
      orderCode: null,
      soilFormData: {
        id: "",
        imageUrl: "",
        wildhood: "",
        longitude: "",
        dtAddress: ""
      },
      rules: {
        imageUrl: {
          rules: [{
            required: true,
            errorMessage: "采土照片不能为空"
          }]
        },
        wildhood: {
          rules: [{
            required: true,
            errorMessage: "纬度不能为空"
          }]
        },
        longitude: {
          rules: [{
            required: true,
            errorMessage: "经度不能为空"
          }]
        },
        dtAddress: {
          rules: [{
            required: true,
            errorMessage: "详细地址不能为空"
          }]
        }
      }
    };
  },
  onShow() {
    this.orderId = common_vendor.index.getStorageSync("orderId");
    this.orderCode = common_vendor.index.getStorageSync("orderCode");
  },
  onUnload() {
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
  },
  methods: {
    //获取经纬度和详细地址
    getMapAddress() {
      var that = this;
      const tMap = new utils_qqmapWxJssdk.QQMapWX({
        key: "QWABZ-M2H3Q-J6Z5E-2YBXB-7F7JO-R2FXQ"
        //开发者密钥 
      });
      common_vendor.index.getLocation({
        type: "gcj02",
        geocode: true,
        isHighAccuracy: true,
        success: (res) => {
          console.log("获取经纬度成功");
          this.soilFormData.wildhood = res.latitude;
          this.soilFormData.longitude = res.longitude;
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "获取失败",
            duration: 1e3,
            icon: "error"
          });
          console.log("获取经纬度失败");
        },
        complete: () => {
          tMap.reverseGeocoder({
            location: {
              latitude: this.soilFormData.wildhood,
              longitude: this.soilFormData.longitude
            },
            success: function(res) {
              console.log("解析地址成功", res);
              console.log("当前地址：", res.result.address);
              that.soilFormData.dtAddress = res.result.address;
            },
            fail: function(res) {
              common_vendor.index.showToast({
                title: "定位失败",
                duration: 1e3,
                icon: "error"
              });
              console.log(res);
            }
          });
        }
      });
    },
    //点击提交
    submitForm() {
      this.$refs.form.validate().then((res) => {
        this.processRequest();
      }).catch((err) => {
        console.log("err", err);
      });
    },
    //点击下一步
    dialogConfirm() {
      common_vendor.index.setStorageSync("orderId", this.orderId);
      this.$refs.popupDialog.close();
      common_vendor.index.navigateTo({
        url: "/pages/sending_soil/sending_soil"
      });
      this.clearForm();
    },
    //点击关闭
    dialogClose() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
      this.clearForm();
    },
    //采土打卡
    async clockSoil(soilFormData) {
      this.soilFormData.id = this.orderId;
      const res = await api_my.my.clockSoil(soilFormData);
      if (res.data.code === 200) {
        this.$refs.popupDialog.open();
      }
    },
    //选择照片
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          this.soilFormData.imageUrl = tempFilePaths[0];
        },
        fail: (err) => {
          console.error(err.errMsg);
        }
      });
      this.getMapAddress();
    },
    //上传照片
    uploadImage(filePath) {
      let orderId = common_vendor.index.getStorageSync("orderId");
      common_vendor.index.uploadFile({
        url: "http://47.111.157.212:8787/soil/order/uploadImg",
        filePath,
        name: "soilPhoto",
        header: {
          "Content-Type": "multipart/form-data"
          // 添加其他请求头...
        },
        formData: {
          id: orderId
        },
        success: (res) => {
          var temp = JSON.parse(res.data);
          console.log(temp);
        },
        fail: (err) => {
          console.error("上传失败", err);
        }
      });
    },
    //顺序处理两个请求
    async processRequest() {
      try {
        const response1 = await this.uploadImage(this.soilFormData.imageUrl);
        const response2 = await this.clockSoil(this.soilFormData);
      } catch (error) {
        console.error("请求发生错误", error);
      }
    },
    //清除图片
    clearImage() {
      this.soilFormData.imageUrl = "";
    },
    clearForm() {
      this.soilFormData = [];
    }
  }
};
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.orderCode),
    b: $data.soilFormData.imageUrl
  }, $data.soilFormData.imageUrl ? common_vendor.e({
    c: $data.soilFormData.imageUrl
  }, $data.soilFormData.imageUrl ? {
    d: common_vendor.o((...args) => $options.clearImage && $options.clearImage(...args))
  } : {}, {
    e: $data.soilFormData.imageUrl
  }) : {
    f: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  }, {
    g: common_vendor.p({
      label: "采土照片:",
      required: true,
      name: "imageUrl",
      ["label-width"]: "200px"
    }),
    h: $data.soilFormData.wildhood,
    i: common_vendor.o(($event) => $data.soilFormData.wildhood = $event.detail.value),
    j: common_vendor.p({
      label: "纬度:",
      name: "wildhood",
      ["label-width"]: "200rpx"
    }),
    k: $data.soilFormData.longitude,
    l: common_vendor.o(($event) => $data.soilFormData.longitude = $event.detail.value),
    m: common_vendor.p({
      label: "经度:",
      name: "longitude",
      ["label-width"]: "200rpx"
    }),
    n: $data.soilFormData.dtAddress,
    o: common_vendor.o(($event) => $data.soilFormData.dtAddress = $event.detail.value),
    p: common_vendor.p({
      label: "详细地址:",
      name: "dtAddress",
      ["label-width"]: "200rpx"
    }),
    q: $data.soilFormData.wildhood,
    r: $data.soilFormData.longitude,
    s: common_vendor.sr("form", "6b523710-0"),
    t: common_vendor.p({
      modelValue: $data.soilFormData,
      ["label-position"]: "top",
      rules: $data.rules
    }),
    v: common_vendor.o(($event) => $options.submitForm()),
    w: common_vendor.o($options.dialogConfirm),
    x: common_vendor.o($options.dialogClose),
    y: common_vendor.p({
      type: "success",
      cancelText: "关闭",
      confirmText: "下一步",
      title: "通知",
      content: "采土打卡成功"
    }),
    z: common_vendor.sr("popupDialog", "6b523710-5"),
    A: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/soil/soil.vue"]]);
wx.createPage(MiniProgramPage);

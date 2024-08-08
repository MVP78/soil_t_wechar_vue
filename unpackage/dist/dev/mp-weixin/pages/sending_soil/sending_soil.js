"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      zhuyi: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fzhuyi.png",
      isStare: true,
      nowDay: "",
      sendSoilFormData: {
        deliveryMethod: "快递方式",
        orderCode: "",
        trackingNumber: "",
        arrivalTime: "",
        soilId: ""
      },
      wayData: [
        {
          value: "快递方式",
          text: "快递"
        },
        {
          value: "线下方式",
          text: "线下"
        }
      ],
      rules: {
        trackingNumber: {
          rules: [{
            required: true,
            errorMessage: "请填写快递单号"
          }]
        },
        arrivalTime: {
          rules: [{
            required: true,
            errorMessage: "请选择日期"
          }]
        }
      }
    };
  },
  onLoad() {
    const currentDate = /* @__PURE__ */ new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    this.nowDay = `${year}-${month}-${day}`;
  },
  onUnload() {
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
  },
  onShow() {
    this.sendSoilFormData.soilId = common_vendor.index.getStorageSync("orderId");
    this.sendSoilFormData.orderCode = common_vendor.index.getStorageSync("orderCode");
  },
  methods: {
    change(e) {
      if (e === "快递方式") {
        this.isStare = true;
        this.sendSoilFormData.arrivalTime = "";
      } else if (e === "线下方式") {
        this.isStare = false;
        this.sendSoilFormData.trackingNumber = "";
      }
    },
    //点击提交
    submitForm() {
      this.$refs.form.validate().then((res) => {
        this.sendSoil(this.sendSoilFormData);
      }).catch((err) => {
        console.log("err", err);
      });
    },
    //寄土
    async sendSoil(sendSoilFormData) {
      const res = await api_my.my.sendSoil(sendSoilFormData);
      if (res.data.code === 200) {
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: `/pages/index/index`
          });
        }, 1e3);
        common_vendor.index.showToast({
          title: "寄土成功",
          duration: 1e3,
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "寄土失败",
          duration: 1e3,
          icon: "error"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_select2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.sendSoilFormData.orderCode),
    b: $data.zhuyi,
    c: common_vendor.t($data.sendSoilFormData.soilId),
    d: common_vendor.o($options.change),
    e: common_vendor.o(($event) => $data.sendSoilFormData.deliveryMethod = $event),
    f: common_vendor.p({
      localdata: $data.wayData,
      clear: false,
      modelValue: $data.sendSoilFormData.deliveryMethod
    }),
    g: $data.isStare === true
  }, $data.isStare === true ? {
    h: common_vendor.o(($event) => $data.sendSoilFormData.trackingNumber = $event),
    i: common_vendor.p({
      placeholder: "请输入快递单号",
      modelValue: $data.sendSoilFormData.trackingNumber
    }),
    j: common_vendor.p({
      label: "快递单号",
      required: true,
      ["label-width"]: "124px",
      name: "trackingNumber"
    })
  } : {
    k: common_vendor.o(($event) => $data.sendSoilFormData.arrivalTime = $event),
    l: common_vendor.p({
      type: "datetime",
      start: $data.nowDay,
      modelValue: $data.sendSoilFormData.arrivalTime
    }),
    m: common_vendor.p({
      label: "上门日期",
      required: true,
      ["label-width"]: "124px",
      name: "arrivalTime"
    })
  }, {
    n: common_vendor.sr("form", "21f2ca98-1,21f2ca98-0"),
    o: common_vendor.p({
      modelValue: $data.sendSoilFormData,
      rules: $data.rules
    }),
    p: common_vendor.p({
      title: "选择寄土方式 :",
      type: "line",
      titleFontSize: "20px",
      titleColor: "#01c22e"
    }),
    q: common_vendor.o(($event) => $options.submitForm())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/sending_soil/sending_soil.vue"]]);
wx.createPage(MiniProgramPage);

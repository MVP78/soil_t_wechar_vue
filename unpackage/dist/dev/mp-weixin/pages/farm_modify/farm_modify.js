"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      dizhi: "https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fdizhi.png",
      title: "",
      openId: null,
      showModal: true,
      valiFormData: {
        // id: null,
        // userId: '',
        // farmName: '小',
        // farmCrops: '10010',
        // farmSize: 10,
        // farmAddress: '北京市海淀区植物园',
      },
      rules: {
        farmName: {
          rules: [{
            required: true,
            errorMessage: "农场名称不能为空"
          }]
        },
        farmCrops: {
          rules: [{
            required: true,
            errorMessage: "农场作物不能为空"
          }]
        },
        farmSize: {
          rules: [{
            required: true,
            errorMessage: "农场大小不能为空"
          }, {
            format: "number",
            errorMessage: "请输入数字"
          }]
        },
        farmAddress: {
          rules: [{
            required: true,
            errorMessage: "农场地址不能为空"
          }]
        }
      }
    };
  },
  onShow() {
    this.openId = common_vendor.index.getStorageSync("openId");
    if (this.openId === "-1") {
      this.title = "新增农场";
    } else {
      this.title = "修改农场";
      this.getFarmByid();
    }
  },
  methods: {
    //回显表单信息
    async getFarmByid() {
      const res = await api_my.my.getFarmByid(this.openId);
      if (res.data.code === 200) {
        this.valiFormData = res.data.data;
        console.log(this.valiFormData);
      }
    },
    //打开地址选择器
    openAddress() {
      this.$refs.scroll.open();
    },
    //地址选择成功
    chooseSuccess(e) {
      console.log("所选择的地址信息:", e.value[0].label);
      this.valiFormData.farmAddress = e.value[0].label + e.value[1].label + e.value[2].label;
    },
    //提交表单
    submitForm() {
      this.valiFormData.userId = common_vendor.index.getStorageSync("userId");
      this.$refs.form.validate().then((res) => {
        if (this.openId === "-1") {
          this.addFarm(this.valiFormData);
        } else {
          this.valiFormData.id = common_vendor.index.getStorageSync("openId");
          this.updateFarm(this.valiFormData);
        }
        this.clearForm();
      }).catch((err) => {
        console.log("err", err);
      });
    },
    async addFarm(valiFormData) {
      const res = await api_my.my.addFarm(valiFormData);
      if (res.data.code === 200) {
        setTimeout(function() {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
        common_vendor.index.showToast({
          title: "添加成功",
          duration: 1e3,
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "添加失败",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    //修改农场
    async updateFarm(valiFormData) {
      const res = await api_my.my.updateFarm(valiFormData);
      if (res.data.code === 200) {
        setTimeout(function() {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
        common_vendor.index.showToast({
          title: "修改成功",
          duration: 1e3,
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "修改失败",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    clearForm() {
      this.valiFormData = [];
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_liu_customize_sel2 = common_vendor.resolveComponent("liu-customize-sel");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_liu_customize_sel2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_liu_customize_sel = () => "../../uni_modules/liu-customize-sel/components/liu-customize-sel/liu-customize-sel.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_liu_customize_sel)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.valiFormData.farmName = $event),
    b: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请输入农场名称",
      modelValue: $data.valiFormData.farmName
    }),
    c: common_vendor.p({
      label: "农场名称",
      required: true,
      name: "farmName",
      ["label-width"]: "220rpx"
    }),
    d: common_vendor.o(($event) => $data.valiFormData.farmCrops = $event),
    e: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请输入农场作物",
      modelValue: $data.valiFormData.farmCrops
    }),
    f: common_vendor.p({
      label: "农场作物",
      required: true,
      name: "farmCrops",
      ["label-width"]: "220rpx"
    }),
    g: common_vendor.o(($event) => $data.valiFormData.farmSize = $event),
    h: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请输入农场尺寸",
      modelValue: $data.valiFormData.farmSize
    }),
    i: common_vendor.p({
      label: "农场尺寸/公亩",
      required: true,
      name: "farmSize",
      ["label-width"]: "220rpx"
    }),
    j: common_vendor.o(($event) => $data.valiFormData.farmAddress = $event),
    k: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请选择农场地址",
      modelValue: $data.valiFormData.farmAddress
    }),
    l: common_vendor.p({
      label: "农场地址",
      required: true,
      name: "farmAddress",
      ["label-width"]: "220rpx"
    }),
    m: $data.dizhi,
    n: common_vendor.o((...args) => $options.openAddress && $options.openAddress(...args)),
    o: common_vendor.sr("form", "2feeb060-0"),
    p: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.valiFormData
    }),
    q: common_vendor.t($data.title),
    r: common_vendor.o(($event) => $options.submitForm()),
    s: common_vendor.sr("scroll", "2feeb060-9"),
    t: common_vendor.o($options.chooseSuccess)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/farm_modify/farm_modify.vue"]]);
wx.createPage(MiniProgramPage);

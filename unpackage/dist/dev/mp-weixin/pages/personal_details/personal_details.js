"use strict";
const common_vendor = require("../../common/vendor.js");
const api_my = require("../../api/my.js");
require("../../api/request.js");
const _sfc_main = {
  data() {
    return {
      isChange: false,
      imageUrl: "",
      valiFormData: {
        userId: null,
        nickname: "",
        mobile: ""
      },
      rules: {
        mobile: {
          rules: [
            {
              format: "number",
              errorMessage: "请输入数字"
            },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码"
            }
          ]
        }
      }
    };
  },
  onShow() {
    this.valiFormData = common_vendor.index.getStorageSync("userData");
    this.valiFormData.avatarUrl = "http://47.111.157.212:8787" + this.valiFormData.avatarUrl;
    let nickname = common_vendor.index.getStorageSync("myInfoInputData1");
    let mobile = common_vendor.index.getStorageSync("myInfoInputData2");
    if (nickname) {
      this.valiFormData.nickname = nickname;
    }
    if (mobile) {
      this.valiFormData.mobile = mobile;
    }
    if (common_vendor.index.getStorageSync("imgFilePath")) {
      this.imageUrl = common_vendor.index.getStorageSync("imgFilePath");
    } else {
      this.imageUrl = this.valiFormData.avatarUrl;
    }
    this.valiFormData.userId = common_vendor.index.getStorageSync("userId");
  },
  methods: {
    onInput(inputNumber, event) {
      common_vendor.index.setStorageSync(`myInfoInputData${inputNumber}`, event);
    },
    submitForm() {
      this.$refs.form.validate().then((res) => {
        if (this.imageUrl && this.isChange === true) {
          this.processRequest();
        } else {
          this.updateUserInfo(this.valiFormData);
        }
      }).catch((err) => {
        console.log("err", err);
      });
    },
    //选择图片
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          console.log(res);
          const tempFilePaths = res.tempFilePaths;
          common_vendor.index.setStorageSync("imgFilePath", tempFilePaths[0]);
          this.imageUrl = tempFilePaths[0];
          this.isChange = true;
        },
        fail: (err) => {
          console.error(err.errMsg);
        }
      });
    },
    //上传
    uploadImage(filePath) {
      console.log("图片请求拦截器:" + filePath);
      let userId = common_vendor.index.getStorageSync("userId");
      common_vendor.index.uploadFile({
        url: "http://47.111.157.212:8787/soil/user/avatar",
        filePath,
        name: "avatarFile",
        header: {
          "Content-Type": "multipart/form-data"
          // 添加其他请求头...
        },
        formData: {
          userId
        },
        success: (res) => {
          var temp = JSON.parse(res.data);
          console.log("图片响应拦截器");
          console.log(temp);
        },
        fail: (err) => {
          console.error("上传失败", err);
        }
      });
    },
    //修改用户信息
    async updateUserInfo(valiFormData) {
      console.log(valiFormData);
      const res = await api_my.my.updateUser(valiFormData);
      if (res.data.code === 200) {
        common_vendor.index.showToast({
          title: "上传成功",
          duration: 1e3,
          icon: "success"
        });
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 1e3);
      } else if (res.data.msg === "该手机号码已被注册") {
        common_vendor.index.showToast({
          title: "手机号已被注册",
          duration: 1e3,
          icon: "error"
        });
      } else {
        common_vendor.index.showToast({
          title: "上传失败",
          duration: 1e3,
          icon: "error"
        });
      }
    },
    //顺序处理两个请求
    async processRequest() {
      try {
        const response1 = await this.uploadImage(this.imageUrl);
        const response2 = await this.updateUserInfo(this.valiFormData);
      } catch (error) {
        console.error("请求发生错误", error);
      }
    },
    clearImage() {
      this.imageUrl = "";
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.onInput(1, $event)),
    b: common_vendor.o(($event) => $data.valiFormData.nickname = $event),
    c: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请输入姓名",
      modelValue: $data.valiFormData.nickname
    }),
    d: common_vendor.p({
      label: "姓名",
      name: "nickname",
      ["label-width"]: "90px"
    }),
    e: common_vendor.o(($event) => $options.onInput(2, $event)),
    f: common_vendor.o(($event) => $data.valiFormData.mobile = $event),
    g: common_vendor.p({
      inputBorder: false,
      clearable: false,
      placeholder: "请输入手机号",
      modelValue: $data.valiFormData.mobile
    }),
    h: common_vendor.p({
      label: "手机号",
      name: "mobile",
      ["label-width"]: "90px"
    }),
    i: $data.imageUrl
  }, $data.imageUrl ? common_vendor.e({
    j: $data.imageUrl
  }, $data.imageUrl ? {
    k: common_vendor.o((...args) => $options.clearImage && $options.clearImage(...args))
  } : {}, {
    l: $data.imageUrl
  }) : {
    m: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  }, {
    n: common_vendor.p({
      label: "我的头像",
      name: "image",
      ["label-width"]: "80px"
    }),
    o: common_vendor.sr("form", "4c8189f8-0"),
    p: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.valiFormData
    }),
    q: common_vendor.o(($event) => $options.submitForm())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/下载/测试/soil_t_wechar_vue/pages/personal_details/personal_details.vue"]]);
wx.createPage(MiniProgramPage);

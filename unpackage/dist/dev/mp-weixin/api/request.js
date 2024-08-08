"use strict";
const common_vendor = require("../common/vendor.js");
const http = {
  baseUrl: "http://47.111.157.212:8787",
  //baseUrl: 'http://soil.free.idcfengye.com',
  //请求方法 config：配置对象	
  request(config) {
    config = beforeRequest(config);
    config.url = this.baseUrl + config.url;
    return new Promise((resolve, reject) => {
      common_vendor.index.request(config).then((res) => {
        const response = beforeResponse(res);
        resolve(response);
      }).catch((err) => {
        errorHandle(err);
        reject(err);
      });
    });
  },
  get(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "GET"
    });
  },
  post(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "POST"
    });
  },
  put(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "PUT"
    });
  },
  delete(url, data, auth) {
    return this.request({
      url,
      data,
      auth,
      method: "DELETE"
    });
  }
};
const beforeRequest = (config) => {
  if (config.auth) {
    if (common_vendor.index.getStorageSync("token")) {
      let token = common_vendor.index.getStorageSync("token");
      config.header = {
        "Authorization": "wx " + token
      };
    } else {
      console.log("未登录，无访问权限");
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    }
  }
  console.log("请求拦截器", config);
  return config;
};
const beforeResponse = (response) => {
  console.log("响应拦截器", response);
  return response;
};
const errorHandle = (err) => {
  console.log("网络异常,请求失败", err);
};
exports.http = http;

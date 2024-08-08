"use strict";
const api_request = require("./request.js");
const my = {
  //小程序用户
  login(params) {
    return api_request.http.post("/soil/user/login", params);
  },
  postAuth(params) {
    return api_request.http.post("/soil/user/postAuth", params, true);
  },
  getUser(params) {
    return api_request.http.post("/soil/user/selectUserInfo", params, true);
  },
  updateUser(params) {
    return api_request.http.post("/soil/user/updateUserInfo", params);
  },
  //农场
  getFarmlist(params) {
    return api_request.http.get("/soil/farm/list", params);
  },
  addFarm(params) {
    return api_request.http.post("/soil/farm/add", params);
  },
  getFarmByid(id) {
    return api_request.http.get(`/soil/farm/${id}`, {});
  },
  updateFarm(params) {
    return api_request.http.put("/soil/farm/edit", params);
  },
  deleteFarm(params) {
    return api_request.http.put("/soil/farm/remove", params);
  },
  //优惠劵
  getCoupon(params) {
    return api_request.http.get("/soil/coupon/list", params);
  },
  applyCoupon(params) {
    return api_request.http.post("/soil/apply/add", params);
  },
  getCouponEventList() {
    return api_request.http.get("/soil/couponActive/couponList", {});
  },
  getApplyList(params) {
    return api_request.http.get("/soil/apply/list", params);
  },
  getApplyDetails(id) {
    return api_request.http.get(`/soil/apply/infoSearch/${id}`, {});
  },
  //订单	
  getOrderlist(params) {
    return api_request.http.get("/soil/order/list", params);
  },
  getOrderdetail(id) {
    return api_request.http.get(`/soil/order/${id}`, {});
  },
  makePayment(params) {
    return api_request.http.put("/soil/order/paySuccess", params);
  },
  //采土活动
  getEvent() {
    return api_request.http.get("/soil/active/getInfo", {});
  },
  addOrder(params) {
    return api_request.http.post("/soil/order/add", params);
  },
  //采土
  clockSoil(params) {
    return api_request.http.put("/soil/order/edit", params);
  },
  //寄土
  sendSoil(params) {
    return api_request.http.post("/soil/send/add", params);
  },
  //消息
  getMessageList(params) {
    return api_request.http.get("/soil/mail/listForWx", params);
  },
  getMessage(id) {
    return api_request.http.get(`/soil/mail/${id}`, {});
  },
  updateState(params) {
    return api_request.http.put("/soil/mail/updateState", params);
  },
  //公告
  getNoticeList() {
    return api_request.http.get("/soil/notice/list", {});
  },
  getNotice(id) {
    return api_request.http.get(`/soil/notice/${id}`, {});
  },
  //检测报告
  getReport(id) {
    return api_request.http.get(`/soil/report/getInfo/${id}`, {});
  },
  //专家配方
  getAdvice(id) {
    return api_request.http.get(`/soil/advice/getInfo/${id}`, {});
  }
};
exports.my = my;

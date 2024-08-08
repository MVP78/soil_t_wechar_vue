import http from './request.js'

export default {
	//小程序用户
	login(params) {
		return http.post('/soil/user/login', params)
	},
	postAuth(params) {
		return http.post('/soil/user/postAuth', params, true)
	},
	getUser(params) {
		return http.post('/soil/user/selectUserInfo', params, true)
	},
	updateUser(params) {
		return http.post('/soil/user/updateUserInfo', params)
	},
	//上传头像图片
	uploadImage(filePath, formData) {
		return http.uploadImage('/soil/user/avatar', filePath, 'avatarFile', formData)
	},
	//农场
	getFarmlist(params) {
		return http.get('/soil/farm/list', params)
	},
	addFarm(params) {
		return http.post('/soil/farm/add', params)
	},
	getFarmByid(id) {
		return http.get(`/soil/farm/${id}`, {})
	},
	updateFarm(params) {
		return http.put('/soil/farm/edit', params)
	},
	deleteFarm(params) {
		return http.put('/soil/farm/remove', params)
	},

	//优惠劵
	getCoupon(params) {
		return http.get('/soil/coupon/list', params)
	},
	applyCoupon(params) {
		return http.post('/soil/apply/add', params)
	},
	getCouponEventList() {
		return http.get('/soil/couponActive/couponList', {})
	},
	getApplyList(params) {
		return http.get('/soil/apply/list', params)
	},
	getApplyDetails(id) {
		return http.get(`/soil/apply/infoSearch/${id}`, {})
	},
	//订单	
	getOrderlist(params) {
		return http.get('/soil/order/list', params)
	},
	getOrderdetail(id) {
		return http.get(`/soil/order/${id}`, {})
	},
	makePayment(params) {
		return http.put('/soil/order/paySuccess', params)
	},
	//采土活动
	getEvent() {
		return http.get('/soil/active/getInfo', {})
	},
	addOrder(params) {
		return http.post('/soil/order/add', params)
	},
	//采土
	clockSoil(params) {
		return http.put('/soil/order/edit', params)
	},
	//上传采土图片
	uploadSoilImage(filePath, formData) {
		return http.uploadImage('/soil/order/uploadImg', filePath, 'soilPhoto', formData)
	},
	//寄土
	sendSoil(params) {
		return http.post('/soil/send/add', params)
	},
	//消息
	getMessageList(params) {
		return http.get('/soil/mail/listForWx', params)
	},
	getMessage(id) {
		return http.get(`/soil/mail/${id}`, {})
	},
	updateState(params) {
		return http.put('/soil/mail/updateState', params)
	},
	//公告
	getNoticeList() {
		return http.get('/soil/notice/list', {})
	},
	getNotice(id) {
		return http.get(`/soil/notice/${id}`, {})
	},
	//检测报告
	getReport(id) {
		return http.get(`/soil/report/getInfo/${id}`, {})
	},
	//专家配方
	getAdvice(id) {
		return http.get(`/soil/advice/getInfo/${id}`, {})
	},
}
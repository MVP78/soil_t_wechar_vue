<template>
	<view class="container">
		<view class="top">
			<text>当前订单编号为：{{orderCode}}</text>
		</view>
		<uni-forms :modelValue="soilFormData" label-position="top" ref="form" :rules="rules">
			<view class="item">
				<uni-forms-item label="采土照片:" required name="imageUrl" label-width="200px">
					<view class="uimg">
						<!-- 图片显示区域 -->
						<image v-if="soilFormData.imageUrl" :src="soilFormData.imageUrl">
							<view v-if="soilFormData.imageUrl" class="clear-button" @tap="clearImage">X</view>
						</image>
						<!-- 清除按钮 -->
						<text v-else @tap="chooseImage">+</text>
					</view>
				</uni-forms-item>
			</view>


			<view class="position">
				<view class="bottom">
					<uni-forms-item label="纬度:" name="wildhood" label-width="200rpx">
						<input class="inputItem" disabled v-model="soilFormData.wildhood" />
					</uni-forms-item>
					<uni-forms-item label="经度:" name="longitude" label-width="200rpx">
						<input class="inputItem" disabled v-model="soilFormData.longitude" />
					</uni-forms-item>
					<uni-forms-item label="详细地址:" name="dtAddress" label-width="200rpx">
						<input class="inputItem" disabled v-model="soilFormData.dtAddress" />
					</uni-forms-item>
				</view>

				<view class="page-body">

					<map style="width: 100%; height: 150px;" :latitude="soilFormData.wildhood"
						:longitude="soilFormData.longitude" scale="14">
					</map>

				</view>
			</view>
		</uni-forms>
		<view class="box">
			<view class="submitButton" @click="submitForm()">提交信息</view>
		</view>


		<!-- 对话框 -->
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog type="success" cancelText="关闭" confirmText="下一步" title="通知" content="采土打卡成功"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>

	</view>

</template>

<script>
	import QQMapWX from "@/utils/qqmap-wx-jssdk.js";
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				orderId: null,
				orderCode: null,
				soilFormData: {
					id: '',
					imageUrl: '',
					wildhood: '',
					longitude: '',
					dtAddress: '',
				},
				rules: {
					imageUrl: {
						rules: [{
							required: true,
							errorMessage: '采土照片不能为空'
						}]
					},
					wildhood: {
						rules: [{
							required: true,
							errorMessage: '纬度不能为空'
						}]
					},
					longitude: {
						rules: [{
							required: true,
							errorMessage: '经度不能为空'
						}]
					},
					dtAddress: {
						rules: [{
							required: true,
							errorMessage: '详细地址不能为空'
						}]
					},

				},

			}
		},

		onShow() {
			this.orderId = uni.getStorageSync('orderId')
			this.orderCode = uni.getStorageSync('orderCode')
		},
		onUnload() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		methods: {
			//获取经纬度和详细地址
			getMapAddress() {
				var that = this
				const tMap = new QQMapWX({
					key: 'QWABZ-M2H3Q-J6Z5E-2YBXB-7F7JO-R2FXQ' //开发者密钥 
				});
				//获取用户所在经纬度
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					isHighAccuracy: true,
					success: (res) => {
						console.log("获取经纬度成功");
						this.soilFormData.wildhood = res.latitude;
						this.soilFormData.longitude = res.longitude;
					},
					fail: () => {
						uni.showToast({
							title: '获取失败',
							duration: 1000,
							icon: 'error',
						});
						console.log("获取经纬度失败");
					},
					complete: () => {
						// 使用腾讯sdk的reverseGeocoder方法 解析经纬度
						tMap.reverseGeocoder({
							location: {
								latitude: this.soilFormData.wildhood,
								longitude: this.soilFormData.longitude
							},
							success: function(res) {
								console.log("解析地址成功", res);
								console.log("当前地址：", res.result.address);
								that.soilFormData.dtAddress = res.result.address
							},
							fail: function(res) {
								uni.showToast({
									title: '定位失败',
									duration: 1000,
									icon: "error"
								})
								console.log(res);
							},
						})
					}
				})
			},
			//点击提交
			submitForm() {
				//进行表单校验规则
				this.$refs.form.validate().then(res => {
					//请求后台添加采土打卡信息
					this.processRequest()

				}).catch(err => {
					console.log('err', err);
				})



			},
			//点击下一步
			dialogConfirm() {
				uni.setStorageSync('orderId', this.orderId)
				this.$refs.popupDialog.close()
				uni.navigateTo({
					url: "/pages/sending_soil/sending_soil"
				})
				this.clearForm()

			},
			//点击关闭
			dialogClose() {
				uni.switchTab({
					url: '/pages/index/index'
				});
				this.clearForm()
			},
			//采土打卡
			async clockSoil(soilFormData) {
				this.soilFormData.id = this.orderId
				const res = await my.clockSoil(soilFormData)
				if (res.data.code === 200) {
					this.$refs.popupDialog.open()
				}
			},
			//选择照片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.soilFormData.imageUrl = tempFilePaths[0]
					},
					fail: (err) => {
						console.error(err.errMsg);
					},
				});
				this.getMapAddress()
			},
			//上传图片
			async uploadImage(filePath) {
				let orderId = uni.getStorageSync('orderId')
				const res = await api.uploadSoilImage(filePath, {
					id: orderId
				})
				if (res.statusCode === 200) {
					let temp = JSON.parse(res.data);
					// this.formData.avatarUrl = temp.data.url
				}
			},
			//顺序处理两个请求
			async processRequest() {
				try {
					// 发起第一个请求
					const response1 = await this.uploadImage(this.soilFormData.imageUrl);


					// 处理第一个请求的结果，可以根据需要进行逻辑处理
					//console.log('第一个请求结果', response1);

					// 发起第二个请求
					const response2 = await this.clockSoil(this.soilFormData)

					// 处理第二个请求的结果，可以根据需要进行逻辑处理
					//console.log('第二个请求结果', response2);
				} catch (error) {
					// 捕捉可能的错误
					console.error('请求发生错误', error);
				}
			},
			//清除图片
			clearImage() {
				this.soilFormData.imageUrl = '';
			},
			clearForm() {
				this.soilFormData = []
			},
		}
	}
</script>


<style lang="scss">
	.container {
		padding: 0 10px;

	}

	text {
		font-family: "Microsoft YaHei";
	}

	.top {
		font-size: 16px;
		font-weight: 700;
		line-height: 44px;
		text-align: center;
		background-color: #fff;
		border-bottom: 2px solid #757575;
		border-right: 2px solid #757575;
		border-radius: 10px;
		margin: 10px 0;
	}

	.item {
		position: relative;
		background-color: #fff;
		padding: 10rpx 20rpx;
		border-bottom: 2px solid #757575;
		border-right: 2px solid #757575;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.item text {
		font-size: 18px;
		font-weight: 700;
	}


	.uimg {
		display: block;
		text-align: center;
	}

	.uimg text {
		display: inline-block;
		width: 310px;
		height: 200px;
		line-height: 162px;
		font-size: 200px;
		color: #eaeaea;
		border: 2px solid #eaeaea;
		border-radius: 14px;
	}

	.uimg image {

		width: 310px;
		height: 200px;
		border-radius: 14px;
		display: inline-block;
	}

	.clear-button {
		position: absolute;
		top: 14px;
		right: 19px;
		width: 18px;
		font-size: 18px;
		color: #fff;
		background-color: #a9a4a4;
		padding: 6px;
		border-radius: 50%;
	}

	.position {
		background-color: #fff;
		padding: 10rpx 20rpx;
		border-bottom: 2px solid #757575;
		border-right: 2px solid #757575;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.bottom {
		margin-top: 10px;
	}

	.bottom text {
		font-size: 18px;
		font-weight: 700;
	}



	.page-body {
		margin-bottom: 10px;
	}

	.box {
		height: 69px;
	}

	.submitButton {


		height: 40px;
		line-height: 40px;
		font-size: 18px;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 9px;
		letter-spacing: 0.3em;
	}
</style>
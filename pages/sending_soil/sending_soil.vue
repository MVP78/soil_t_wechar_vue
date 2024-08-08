<template>
	<view class="container">
		<view class="top">
			<text>当前订单编号为：{{sendSoilFormData.orderCode}}</text>

		</view>
		<view class="remind">
			<image :src="zhuyi" mode=""></image>
			<view class="remindText">
				<view class="textTitle">
					<text>您的土壤编号为：</text><text class="soilId">{{sendSoilFormData.soilId}}</text>
				</view>
				<view class="textContent">
					<text>请将该编号写在小纸条上，放入土壤盒子一同寄出</text>
				</view>

			</view>
		</view>

		<view class="box">
			<uni-section title="选择寄土方式 :" type="line" titleFontSize="20px" titleColor="#01c22e">
				<view class="select">
					<uni-forms :modelValue="sendSoilFormData" ref="form" :rules="rules">

						<uni-data-select v-model="sendSoilFormData.deliveryMethod" :localdata="wayData" :clear="false"
							@change="change"></uni-data-select>


						<view v-if="isStare === true" class="item">
							<uni-forms-item label="快递单号" required label-width="124px" name="trackingNumber">
								<uni-easyinput v-model="sendSoilFormData.trackingNumber" placeholder="请输入快递单号" />
							</uni-forms-item>
						</view>
						<view v-else class="item">
							<uni-forms-item label="上门日期" required label-width="124px" name="arrivalTime">
								<uni-datetime-picker type="datetime" v-model="sendSoilFormData.arrivalTime"
									:start="nowDay" />
							</uni-forms-item>
						</view>
					</uni-forms>
				</view>


			</uni-section>
		</view>
		<view class="submitButton" @click="submitForm()">
			提交寄土信息
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				zhuyi: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fzhuyi.png',
				isStare: true,
				nowDay: '',
				sendSoilFormData: {
					deliveryMethod: '快递方式',
					orderCode: '',
					trackingNumber: '',
					arrivalTime: '',
					soilId: '',
				},
				wayData: [{
						value: '快递方式',
						text: '快递'
					},
					{
						value: '线下方式',
						text: '线下'
					},
				],
				rules: {
					trackingNumber: {
						rules: [{
							required: true,
							errorMessage: '请填写快递单号',
						}]
					},
					arrivalTime: {
						rules: [{
							required: true,
							errorMessage: '请选择日期',
						}]
					},
				}
			}
		},
		onLoad() {
			const currentDate = new Date();
			// 获取年、月、日
			const year = currentDate.getFullYear();
			const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份补零
			const day = currentDate.getDate().toString().padStart(2, '0'); // 日补零
			// 格式化日期
			this.nowDay = `${year}-${month}-${day}`;
		},

		onUnload() {
			uni.reLaunch({
				url: '/pages/index/index'
			})

		},

		onShow() {
			this.sendSoilFormData.soilId = uni.getStorageSync('orderId')
			this.sendSoilFormData.orderCode = uni.getStorageSync('orderCode')
		},
		methods: {
			change(e) {
				if (e === '快递方式') {
					this.isStare = true
					this.sendSoilFormData.arrivalTime = ''
				} else if (e === '线下方式') {
					this.isStare = false
					this.sendSoilFormData.trackingNumber = ''
				}
			},
			//点击提交
			submitForm() {
				//进行表单校验规则
				this.$refs.form.validate().then(res => {
					//请求后台
					this.sendSoil(this.sendSoilFormData)

				}).catch(err => {
					console.log('err', err);
				})
			},
			//寄土
			async sendSoil(sendSoilFormData) {
				const res = await my.sendSoil(sendSoilFormData)
				if (res.data.code === 200) {
					setTimeout(function() {
						uni.switchTab({
							url: `/pages/index/index`,
						});
					}, 1000)

					uni.showToast({
						title: '寄土成功',
						duration: 1000,
						icon: 'success',
					});
				} else {
					uni.showToast({
						title: '寄土失败',
						duration: 1000,
						icon: 'error',
					});
				}
			}

		}
	}
</script>

<style>
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

	.remind {
		position: relative;
		background-color: #fff;
		border-bottom: 2px solid #757575;
		border-right: 2px solid #757575;
		border-radius: 10px;
		margin: 20px 0;
	}

	.remind image {
		width: 80px;
		height: 80px;
		padding: 10px;
	}

	.soilId {
		color: #01c22e;
		font-weight: 700;
	}

	.remindText {
		position: absolute;
		color: #757575;
		top: 10px;
		left: 117px;
		font-size: 16px;
		width: 224px;
		line-height: 28px;
	}

	.box {
		position: relative;
		padding-top: 10px;
		padding-bottom: 20px;

		background-color: #fff;
		border-bottom: 2px solid #757575;
		border-right: 2px solid #757575;
		border-radius: 10px;
	}

	.select {
		text-align: center;
		margin: 10px 20px;
	}

	uni-data-select {
		position: absolute;
		width: 150px;
		display: inline-block;
		right: 22px;
		top: 19px;
	}



	.item text {
		font-size: 20px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.uni-easyinput__content-input {
		border-radius: 20px;
	}

	.submitButton {
		position: fixed;
		bottom: 20rpx;
		left: 20rpx;
		width: 696rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 18rpx;
		letter-spacing: 0.3em;

	}
</style>
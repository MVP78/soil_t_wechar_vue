<template>
	<view class="box">
		<image :src="baoming" style="width: 750rpx;">

		</image>

		<view class="EventDetails">
			<view class="name">
				{{eventData.atName}}
			</view>
			<view class="price">
				￥{{eventData.atPrice}}
			</view>
			<view class="time">
				活动结束时间：{{eventData.endTime}}
			</view>
		</view>

		<view class="selector">
			<uni-forms :modelValue="registrationFormData" ref="form" :rules="rules">
				<view class="item">
					<uni-forms-item label="优惠劵/元:" name="couponValue" label-width="120px">
						<input class="uni-input" disabled v-model="registrationFormData.couponVaule"
							@click="chooseCoupon()" />
					</uni-forms-item>
					<view v-if="registrationFormData.couponVaule ===undefined" class="button" @click="chooseCoupon()">
						选择优惠券</view>

				</view>
				<view class="item">
					<uni-forms-item label="农场名称:" required name="farmName" label-width="120px">
						<input class="uni-input" disabled v-model="registrationFormData.farmName"
							@click="chooseFarm('1')" />
					</uni-forms-item>
					<view v-if="registrationFormData.farmName ===undefined" class="button" @click="chooseFarm('1')">选择地址
					</view>
				</view>
			</uni-forms>

		</view>
		<view class="submitButton" @click="submitForm()">缴费￥{{registrationFormData.acPaid}}</view>
		<view>
			<!-- 对话框 -->
			<uni-popup ref="popupDialog" type="dialog">
				<uni-popup-dialog type="success" cancelText="关闭" confirmText="下一步" title="通知" content="缴费成功"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>

		</view>
	</view>

</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				baoming: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fregistraion%2Fbaoming.png',
				coupon: [],
				farm: [],
				registrationFormData: {
					userId: null,
					farmId: '',
					farmName: '',
					//活动价格
					orderPrice: 599,
					//优惠劵
					couponId: '',
					couponVaule: '',
					//实付金额
					acPaid: '',
				},
				eventData: {
					atPrice: '500',
					startTime: '2023-11-10',
					endTime: '2024-05-20',
				},
				rules: {
					farmName: {
						rules: [{
							required: true,
							errorMessage: '农场不能为空'
						}]
					}
				},
			};
		},

		onShow() {
			//获取活动信息
			this.getEvent()
			//获取选择得优惠劵和农场
			this.coupon = uni.getStorageSync('coupon')
			this.registrationFormData.couponVaule = this.coupon.couponValue
			this.registrationFormData.couponId = this.coupon.id
			this.farm = uni.getStorageSync('farm')
			this.registrationFormData.farmName = this.farm.farmName
			this.registrationFormData.farmId = this.farm.id

			this.registrationFormData.userId = uni.getStorageSync('userId')
			//计算订单实付金额
			this.registrationFormData.acPaid = this.registrationFormData.couponVaule ? (this.registrationFormData
				.orderPrice - this.registrationFormData.couponVaule) : this.registrationFormData.orderPrice
			console.log(this.registrationFormData.farmName)
		},
		onUnload() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		methods: {
			//获取活动信息
			async getEvent() {
				//发请求赋值
				const res = await my.getEvent()
				if (res.data.code === 200) {
					this.eventData = res.data.data
					this.registrationFormData.orderPrice = this.eventData.atPrice
				}
			},
			//点击缴费
			submitForm() {
				//对表单进行校验

				this.$refs.form.validate().then(res => {
					//发送请求发送报名表单，并返回订单id和订单code
					this.addOrder(this.registrationFormData)

				}).catch(err => {
					console.log('err', err);

				})

			},
			//生成订单
			async addOrder(registrationFormData) {
				console.log(registrationFormData)
				const res = await my.addOrder(registrationFormData)
				if (res.data.code === 200) {
					uni.setStorageSync('orderCode', res.data.data.orderCode)
					uni.setStorageSync('orderId', res.data.data.id)
					this.makePayment(res.data.data.id)
					//弹窗
					this.$refs.popupDialog.open()
				} else {
					uni.showToast({
						title: '报名失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},
			//点击关闭
			dialogClose() {
				this.clearForm()
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//点击下一步
			dialogConfirm() {
				this.clearForm()
				this.$refs.popupDialog.close()
				uni.navigateTo({
					url: '/pages/tutorial/tutorial'
				})

			},
			//选择优惠劵
			chooseCoupon() {
				uni.navigateTo({
					url: `/pages/discount_coupon/discount_coupon`,
				});
			},
			// 选择农场
			chooseFarm(entryState) {
				uni.setStorageSync('entryState', entryState);
				uni.navigateTo({
					url: `/pages/farm/farm`,
				});
			},
			//进行支付
			async makePayment(orderId) {
				let userId = uni.getStorageSync('userId')
				const res = await my.makePayment({
					id: orderId,
					userId: userId,
					state: '1'
				})
				if (res.data.code === 200) {
					this.$refs.popupDialog.open()
				}
			},
			//清空表单
			clearForm() {
				this.registrationFormData = []
			}
		}
	}
</script>


<style lang="scss">
	image {

		height: 1672rpx;
	}

	.box {
		position: relative;
		display: flex;
		width: 100%;
		height: auto;

	}

	.EventDetails {
		position: absolute;
		left: 224rpx;
		top: 88rpx;
		background-color: rgb(229, 247, 233, 0.6);
		padding: 20rpx;
		border-radius: 10px;
	}

	.name {
		font-size: 40rpx;
		font-weight: 700;
		margin-bottom: 40rpx;
		color: #01c22e;
		letter-spacing: 0.1em;
	}

	.price {
		font-size: 40rpx;
		color: red;
		font-weight: 700;
		margin-bottom: 40rpx;
	}

	.time {
		font-size: 28rpx;
		color: #888;
	}

	.selector {
		position: absolute;
		top: 544rpx;
		left: 32rpx;
	}

	.item {
		position: relative;
	}

	.item .button {
		position: absolute;
		top: -12rpx;
		right: -200rpx;
		width: 252rpx;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 36rpx;
		background-color: rgb(229, 247, 233, 0.5);
		opacity: 1;
		color: #01c22e;
		border-radius: 48rpx;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.item text {
		font-size: 40rpx;
		font-weight: 700;
	}

	.uni-input {
		display: inline-block;
		width: 240rpx;
		height: 72rpx;
		font-size: 36rpx;
		font-weight: 700;
		line-height: 72rpx;
		color: #01c22e;
	}

	.submitButton {
		position: absolute;
		top: 988rpx;
		left: 206rpx;
		width: 340rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 48rpx;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 32px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.title {
		position: absolute;
		left: 40rpx;
		top: 72rpx;
	}

	.content {
		position: absolute;
		left: 40rpx;
		top: 16rpx;
	}

	.title text {
		color: #ff0000;
		display: inline-block;
		font-size: 60rpx;
		font-weight: 700;
	}

	.content text {
		color: #fff;
		display: inline-block;
		font-size: 36rpx
	}
</style>
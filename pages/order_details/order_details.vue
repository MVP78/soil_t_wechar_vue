<template>
	<view>
		<view class="top">
			<view class="content" @click="nextStep(orderData.state)">
				<view class="title">
					{{title}}
				</view>
			</view>
		</view>

		<uni-card title="订单详情" :extra="orderData.orderTime">
			<view class="left">订单编号:
				<view class="right">
					{{orderData.orderCode}}
				</view>
			</view>
			<view class="left">土壤编号:
				<view class="right">
					{{orderData.id}}
				</view>
			</view>
			<view class="left">订单金额:
				<view class="price">
					￥{{orderData.orderPrice}}
				</view>
			</view>
			<view class="left">优惠劵金额:
				<view class="price" v-if="orderData.couponValue">
					￥{{orderData.couponValue}}
				</view>
				<view class="price" v-else>
					未使用优惠券
				</view>
			</view>
			<view class="left">实付金额:
				<view class="price">
					￥{{orderData.acPaid}}
				</view>
			</view>
		</uni-card>
		<uni-card title="个人信息">
			<view class="left">姓名：
				<view class="right">
					{{orderData.nickname}}
				</view>
			</view>
			<view class="left">电话：
				<view class="right">
					{{orderData.mobile}}
				</view>
			</view>
		</uni-card>
		<uni-card title="农场信息">

			<view class="left">农场名称：
				<view class="right">
					{{orderData.farmName}}
				</view>
			</view>
			<view class="left">农场尺寸：
				<view class="right">
					{{orderData.farmSize}}公亩
				</view>
			</view>
			<view class="left">农场作物:
				<view class="right">
					{{orderData.farmCrops}}
				</view>
			</view>
			<view class="left">农场地址:
				<view class="address">
					<text>{{orderData.farmAddress}}</text>
				</view>
			</view>
		</uni-card>
		<!-- 2345 -->
		<uni-card title="采土信息"
			v-if="orderData.state === '2' || orderData.state === '3' || orderData.state === '4'|| orderData.state === '5'">

			<view class="left">采土照片:</view>
			<view class="img">
				<image v-if="orderData.soilPhoto" :src="imgUrl"></image>
			</view>
			<view class="left">采土定位经度:
				<view class="right">
					{{orderData.longitude}}
				</view>
			</view>
			<view class="left">采土定位纬度:
				<view class="right">
					{{orderData.wildhood}}
				</view>
			</view>
			<view class="soilAddress">
				<image :src="dizhi" mode=""></image>{{orderData.dtAddress}}
			</view>
		</uni-card>
		<!-- 345 -->
		<uni-card title="寄土信息" v-if="orderData.state === '3' || orderData.state === '4' || orderData.state === '5'">
			<view class="left">寄土方式:
				<view class="right">
					{{orderData.deliveryMethod}}
				</view>
			</view>
			<view v-if="orderData.trackingNumber">
				<view class="left">快递单号:
					<view class="right">
						{{orderData.trackingNumber}}
					</view>
				</view>
			</view>
			<view v-else>
				<view class="left">预计到达时间:
					<view class="right">
						{{orderData.arrivalTime}}
					</view>
				</view>
			</view>
		</uni-card>

		<view class="button">
			<view class="buttonOne" v-if="orderData.state === '3'">等待机构检测</view>
			<view class="buttonOne" v-if="orderData.state === '4' ||orderData.state === '5'"
				@click="openFeedback(true)">
				查看检测报告</view>
			<view class="buttonTwo" v-if="orderData.state === '4'">等待专家配方</view>
			<view class="buttonTwo" v-if="orderData.state === '5'" @click="openFeedback(false)">查看专家配方</view>

		</view>
		<!-- 付费对话框 -->
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog type="success" cancelText="关闭" confirmText="下一步" title="通知" content="缴费成功"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				dizhi: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fdizhi.png',
				title: '',
				imgUrl: '',
				orderData: {
					orderCode: '',
					id: '123456',
					state: '0',
					nickname: 'xiaohong',
					mobile: '15521917952',
					farmName: '农场一号',
					farmSize: 18,
					farmCrops: '草莓',
					farmAddress: '地址地址',
					soilPhoto: '图片',
					longitude: 12.1521,
					wildhood: 82.1532,
					dtAddress: '详细地址详细地址',
					deliveryMethod: '快递',
					orderPrice: 500,
					couponValue: 100,
					acPaid: 400,
				},
				adviceData: {
					fertilizationAdvice: '施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议施肥建议',
					plantAdvice: '种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议种植建议',
					soilAdvice: '土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议土壤建议',
				},
				reportData: [{
					itemName: '有机质',
					itemValue: 10,
					itemUnit: 'kg',
				}, {
					itemName: '有机质',
					itemValue: 10,
					itemUnit: 'kg',
				}, {
					itemName: '有机质',
					itemValue: 10,
					itemUnit: 'kg',
				}, {
					itemName: '有机质',
					itemValue: 10,
					itemUnit: 'kg',
				}],
			}
		},
		onShow() {
			this.orderData.id = uni.getStorageSync('orderId')
			//请求查看订单详细信息
			this.getOrderdetail(this.orderData.id)
		},
		methods: {
			//点击标题跳转页面
			nextStep(state) {

				if (state === '0') {
					//待付款
					uni.setStorageSync('orderId', this.orderData.id)
					//请求付款
					this.makePayment(this.orderData.id)

				} else if (state === '1') {
					//待采土
					uni.setStorageSync('orderId', this.orderData.id)
					uni.navigateTo({
						url: "/pages/soil/soil"
					})


				} else if (state === '2') {
					//待寄土
					uni.setStorageSync('orderId', this.orderData.id)
					uni.navigateTo({
						url: "/pages/sending_soil/sending_soil"
					})

				}

			},
			//点击下一步
			dialogConfirm() {
				this.$refs.popupDialog.close()
				//付款完成进行采土
				uni.navigateTo({
					url: "/pages/soil/soil"
				})

			},
			//点击关闭
			dialogClose() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//获取订单详情
			async getOrderdetail(id) {
				console.log(id)
				const res = await my.getOrderdetail(id)
				if (res.data.code === 200) {
					this.orderData = res.data.data.data
					this.imgUrl = 'http://47.111.157.212:8787' + this.orderData.soilPhoto
					//判断状态
					if (this.orderData.state === '0') {
						this.title = '前往付款'
					} else if (this.orderData.state === '1') {
						this.title = '前往采土'
					} else if (this.orderData.state === '2') {
						this.title = '前往寄土'
					} else if (this.orderData.state === '3') {
						this.title = '等待报告'
					} else if (this.orderData.state === '4') {
						this.title = '等待配方'
					} else {
						this.title = '订单完成'
					}
				}
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
			//点击专家配方
			openFeedback(isReport) {
				uni.setStorageSync('isReport', isReport)
				uni.setStorageSync('orderId', this.orderData.id)
				uni.navigateTo({
					url: '/pages/feedback_details/feedback_details',
				});
			},


		}
	}
</script>

<style>
	.top {
		height: 104rpx;
		background-color: #01d332;
		margin-top: 20rpx;


	}

	.content {
		z-index: 10;
		color: #fff;
		width: 384rpx;
		height: 104rpx;
		font-size: 50rpx;
		font-weight: 700;
		margin-left: 366rpx;
		display: inline-block;
		background-color: #fbc000;
		border-top-left-radius: 76rpx;
		border-bottom-left-radius: 76rpx;
	}

	.title {
		width: 400rpx;
		margin-top: 16rpx;
		margin-left: 102rpx;
	}

	text {
		display: block;
		font-size: 36rpx;
		line-height: 36rpx;
	}

	.left {
		font-size: 32rpx;
		color: #888;
		margin: 20rpx 0;

	}

	.right {
		float: right;
		color: #000;
	}

	.price {
		float: right;
		color: red;
	}

	.address {
		float: right;
		color: #888;
		width: 332rpx;
	}

	.img image {
		width: 608rpx;
		display: inline-block;
		border-radius: 24rpx;
	}

	.soilAddress {
		vertical-align: middle;

	}

	.soilAddress image {
		vertical-align: middle;
		width: 56rpx;
		height: 56rpx;
		margin-right: 12rpx;
	}

	.address text {
		float: right;
		font-size: 33rpx
	}

	.button {
		padding: 20rpx;
	}

	.buttonOne,
	.buttonTwo {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 18rpx;
		letter-spacing: 0.3em;
		margin: 28rpx 8rpx;
	}

	.buttonOne {
		background-color: #01c22e;
	}

	.buttonTwo {
		background-color: #fbc000;
	}

	.popup-content {
		position: relative;
		padding-bottom: 120rpx;
		padding-top: 40rpx;
	}

	.popup-content .uni-card {
		width: 580rpx;
	}

	.close {
		position: absolute;
		display: inline-block;
		left: 260rpx;
		bottom: 20rpx;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.item {
		display: inline-block;
		width: 364rpx;
		margin-left: 8rpx;
		margin-bottom: 20rpx;
	}
</style>
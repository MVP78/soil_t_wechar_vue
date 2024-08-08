<template>
	<view class="body">
		<!-- 广告图 -->
		<view class="advertise">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="autoplay" :interval="true"
				:duration="500">
				<view class="swiper-item" v-for="(item,index) in couponEventDate" :key="index">
					<swiper-item @click="openApply(item)">
						<image :src="item.acPoster"></image>
					</swiper-item>
				</view>
			</swiper>
		</view>
		<view class="noticeBar">
			<uni-notice-bar show-icon scrollable text="广东省土壤检测配方活动火热进行中,点击前往查看详情.." @click="openSoilDetail()" />
		</view>

		<!-- 分类列表 -->
		<view class="category">
			<view class="item" @click="openRegistration()">
				<view class="box1">
					<image :src="baoming" mode=""></image>
					<text>报名</text>
				</view>

			</view>
			<view class="item" @click="openNotice()">
				<view class="box1">
					<image :src="gonggao" mode=""></image>
					<text>公告</text>
				</view>

			</view>
			<view class="item" @click="openOrder(1)">
				<view class="box1">
					<image :src="caitu" mode=""></image>
					<text>采土</text>
				</view>
			</view>
			<view class="item" @click="openOrder(2)">
				<view class="box1">
					<image :src="jitu" mode=""></image>
					<text>寄土</text>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="popup" type="center" class="popup" :mask-click="false">
		<view class="box">
			<image :src="huodong" mode=""></image>
			<view class="detailsButton" @click="openSoilDetail()"></view>
		</view>
		<view class="clearButton" @click="colsePopup()">X</view>
	</uni-popup>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				couponEventDate: [],
				huodong: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fhuodong.png',
				baoming: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fbaoming.png',
				gonggao: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fgonggao.png',
				caitu: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fcaitu.png',
				jitu: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ficon%2Fjitu.png',
			}
		},
		onShow() {
			this.getCouponEventList()
		},
		onLoad() {
			this.$refs.popup.open()
		},
		methods: {
			//点击海报申请优惠券
			openApply(item) {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('userData').nickname === '微信用户' || uni.getStorageSync('userData').mobile ===
						'') {
						//弹窗
						uni.showToast({
							title: '请先填写个人信息',
							duration: 1000,
							icon: 'error',
						});
					} else {
						//清除本地存储
						uni.removeStorageSync('applyInputData');
						uni.removeStorageSync('farm');
						uni.setStorageSync('couponEventData', item)
						//跳转报名页面
						uni.navigateTo({
							url: "/pages/apply_coupon/apply_coupon"
						})
					}
				} else {
					//弹窗
					uni.showToast({
						title: '请先登录',
						duration: 1000,
						icon: 'error',
					});
				}

			},
			//点击报名
			openRegistration() {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('userData').nickname === '微信用户' || uni.getStorageSync('userData').mobile ===
						'') {
						//弹窗
						uni.showToast({
							title: '请先填写个人信息',
							duration: 1000,
							icon: 'error',
						});
					} else {
						//清除本地存储选择的农场和优惠券
						uni.removeStorageSync('farm');
						uni.removeStorageSync('coupon');
						//跳转报名页面
						uni.navigateTo({
							url: "/pages/registration/registration"
						})
					}
				} else {
					//弹窗
					uni.showToast({
						title: '请先登录',
						duration: 1000,
						icon: 'error',
					});
				}

			},
			//点击寄土采土跳转对应订单列表
			openOrder(currentTab) {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('userData').nickname === '微信用户' || uni.getStorageSync('userData').mobile ===
						'') {
						//弹窗
						uni.showToast({
							title: '请先填写个人信息',
							duration: 1000,
							icon: 'error',
						});
					} else {
						uni.setStorageSync('currentTab', currentTab);
						uni.navigateTo({
							url: "/pages/order/order"
						})
					}
				} else {
					//弹窗
					uni.showToast({
						title: '请先登录',
						duration: 1000,
						icon: 'error',
					});
				}

			},
			//点击活动弹窗
			openSoilDetail() {
				uni.navigateTo({
					url: "/pages/event_details/event_details"
				})
			},
			//点击X
			colsePopup() {
				this.$refs.popup.close()
			},
			//点击公告
			openNotice() {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('userData').nickname === '微信用户' || uni.getStorageSync('userData').mobile ===
						'') {
						//弹窗
						uni.showToast({
							title: '请先填写个人信息',
							duration: 1000,
							icon: 'error',
						});
					} else {
						uni.navigateTo({
							url: "/pages/notice/notice"
						})
					}
				} else {
					//弹窗
					uni.showToast({
						title: '请先登录',
						duration: 1000,
						icon: 'error',
					});
				}

			},
			//获取优惠券活动列表
			async getCouponEventList() {
				const res = await my.getCouponEventList()
				if (res.data.code === 200) {
					let arr = res.data.rows.map(obj => {
						obj.acPoster = 'http://47.111.157.212:8787' + obj.acPoster
						return obj;
					});
					this.couponEventDate = arr
					//console.log(this.couponEventDate)
				}
			},
		},


	}
</script>

<style scoped lang="scss">
	.body {
		padding-bottom: 20rpx;
	}

	.advertise {
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.swiper {
		height: 480rpx;
		margin: 0 20rpx;
	}

	.swiper-item image {
		width: 100%;

		border-radius: 36rpx;
	}

	.noticeBar {
		padding: 0 20rpx;

	}

	.uni-noticebar {
		border-radius: 36rpx;
	}

	.category {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
		background-color: #fff;
		margin: 0 20rpx;
		border-radius: 36rpx;
		border-bottom: 4rpx solid #d6d6d6;
		border-right: 4rpx solid #d6d6d6;
	}

	.category image {
		width: 120rpx;
		height: 120rpx;
		display: block;
		margin: 10rpx auto 0;
	}

	.box1 {
		display: inline-block;
		background: #01c22e;
		border-bottom: 10rpx solid #d6d6d6;
		border-radius: 48rpx;
		border-right: 10rpx solid #d6d6d6;
		height: 224rpx;
		padding-top: 20rpx;
		text-align: center;
		width: 240rpx;
		margin: 40rpx 0;
	}

	.category .item {

		width: 50%;
		text-align: center;
	}

	.category .item text {
		display: block;
		font-size: 44rpx;
		//color: #02b42c;
		color: #fff;
		font-weight: 700;
		font-family: "Microsoft YaHei";
		letter-spacing: 0.4em;
	}

	.popup image {
		border-radius: 32rpx;
	}

	.box {
		position: relative;
	}

	.detailsButton {
		z-index: 10;
		position: absolute;
		top: 298rpx;
		left: 168rpx;
		width: 302rpx;
		height: 100rpx;


	}

	.clearButton {
		position: absolute;
		top: 8rpx;
		text-align: center;
		right: 10rpx;
		width: 32rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: #fff;
		background-color: #a9a4a4;
		padding: 12rpx;
		border-radius: 50%;
	}
</style>
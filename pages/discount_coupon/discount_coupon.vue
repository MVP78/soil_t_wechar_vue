<template>
	<view class="container">
		<view class="top">
			<view v-if="isExpire === false" class="coupon" @click="toggleExpire">
				历史优惠劵
			</view>
			<view v-else class="coupon" @click="toggleExpire">
				可用优惠劵
			</view>
		</view>
		<view class="contentNull" v-if="noUsedCouponNumber === 0 && isExpire===false">
			<image :src="textnull" mode=""></image>
			<view class="nullText">
				暂无可使用优惠券
			</view>
		</view>
		<view class="contentNull" v-if="usedCouponNumber === 0 && isExpire===true">
			<image :src="textnull" mode=""></image>
			<view class="nullText">
				暂无历史优惠券
			</view>
		</view>
		<view class="couponList">
			<view v-for="(item,index) in soil_coupon" :key="index">
				<!-- 可用优惠劵 -->
				<view class="item" v-if="item.isUsed==='0'  && isExpire===false">
					<view class="itemLeft">
						<image :src="yhq" mode=""></image>
					</view>
					<view class="itemCenter">
						<text>广东省土壤检测优惠券</text>
						<text class="time">到期时间：{{item.endTime}}</text>
					</view>
					<view class="itemRight" v-if="item.isUsed==='0' ">
						<text>￥{{item.couponValue}}</text>
						<view class="button" @tap="selectTap(item)">
							去使用
						</view>
					</view>
				</view>

				<!-- 历史优惠劵 -->
				<view class="item" v-if="isExpire===true && (item.isUsed==='1'||item.isUsed==='2')">
					<view class="itemLeft">
						<image :src="yhq" mode=""></image>
					</view>
					<view class="itemCenter">
						<text>广东省土壤检测优惠券</text>
						<text class="time">到期时间：{{item.endTime}}</text>
					</view>

					<view class="itemRight" v-if="item.isUsed==='1' ">
						<text>￥{{item.couponValue}}</text>
						<view class="button">
							已使用
						</view>
					</view>
					<view class="itemRight" v-if="item.isUsed==='2'">
						<text>￥{{item.couponValue}}</text>
						<view class="buttonend">
							已过期
						</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				yhq: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fyhq.png',
				userId: null,
				isExpire: false,
				soil_coupon: [],
				noUsedCouponNumber: 0,
				usedCouponNumber: 0,
				textnull: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/textnull.png',
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId')
			this.getCouponlist(this.userId)
		},

		methods: {
			//选择优惠劵
			selectTap(coupon) {
				uni.setStorageSync('coupon', coupon);
				uni.navigateTo({
					url: `/pages/registration/registration`,
				});
			},

			//切换可用和不可以优惠劵界面
			toggleExpire() {
				this.isExpire = !this.isExpire
			},

			//获取列表数据
			async getCouponlist(userId) {
				//请求列表数据
				const res = await my.getCoupon({
					userId: userId
				})
				if (res.data.code === 200) {
					this.soil_coupon = res.data.data
					let filterArr1 = []
					let filterArr2 = []
					this.soil_coupon.forEach((item) => {
						if (item.isUsed === '0') {
							filterArr1.push(item)
						} else {
							filterArr2.push(item)
						}
					})
					this.noUsedCouponNumber = filterArr1.length
					this.usedCouponNumber = filterArr2.length
				}

			},
		}
	}
</script>

<style>
	.top {
		margin-bottom: 20rpx;
		height: 96rpx;
		color: #989898;
		background-color: #fff;
		letter-spacing: 0.1em;
	}

	.contentNull {
		padding: 72rpx 0;
		margin-top: 0rpx;
		text-align: center;

		border-radius: 40rpx;
	}

	.nullText {
		font-size: 67rpx;
		font-weight: 700;
		color: #a8a8a8;
		margin-top: 56rpx;
	}

	.coupon {
		margin: 32rpx 25rpx 0 0;
		font-size: 26rpx;
		float: right;
	}

	.couponList {
		margin: 0 20rpx;

	}

	.item {
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-bottom: 4rpx solid #757575;
		border-right: 4rpx solid #757575;
		border-radius: 20rpx;
	}

	.item .itemLeft {
		display: inline-block;
		margin: 20rpx;
	}

	.item image {
		width: 120rpx;
		height: 120rpx;
		vertical-align: middle;
	}

	.item .itemCenter {
		display: inline-block;
		width: 384rpx;
		vertical-align: middle;
	}

	.item .itemCenter text {
		display: block;

	}

	.time {
		font-size: 24rpx;
		margin-top: 24rpx;
		color: #888;
	}

	.item .itemRight {
		display: inline-block;
		vertical-align: middle;

	}

	.item .itemRight text {
		display: inline-block;
		font-size: 36rpx;
		font-weight: 700;
		color: red;
		margin-bottom: 20rpx;
		margin-left: 16rpx;
	}

	.button {
		width: 142rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: red;
		color: #fff;
		border-radius: 32rpx;
	}

	.buttonend {
		width: 142rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #ff7b7b;
		color: #fff;
		border-radius: 32rpx;
	}
</style>
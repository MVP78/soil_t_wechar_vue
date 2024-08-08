<template>
	<view class="body">
		<view class="box1">
			<view class="banner">
				<image :src="src" mode=""></image>
			</view>
			<view class="box1_1">
				<view class="content">
					<view class="title">
						<text>{{eventData.atName}}</text>
					</view>
					<view class="main">
						<text>{{eventData.atDescription}}</text>
					</view>
				</view>
				<view class="footer">
					<view class="time">
						<text>报名截止时间:{{eventData.endTime}}</text>
					</view>
					<view class="price">
						<text>￥{{eventData.atPrice}}</text>
					</view>
				</view>

			</view>
		</view>
		<view class="box2">
			<uni-section title="活动流程" type="line" titleFontSize="20px" titleColor="#01c22e">
				<view class="box2_1">
					<view class="box2_1_1">
						<view class="numberA">
							1
						</view>
						<view class="textA">
							在活动期间申请测土活动
						</view>
					</view>
					<view class="box2_1_2">
						<view class="number">
							2
						</view>
						<view class="text">
							按要求完成采土，并上传打卡照片，需要用户进度定位授权
						</view>
					</view>
					<view class="box2_1_2">
						<view class="number">
							3
						</view>
						<view class="text">
							采土完成后进行土壤样本打包，需要标上土壤编号
						</view>
					</view>
					<view class="box2_1_2">
						<view class="number">
							4
						</view>
						<view class="text">
							根据自身情况选择寄土方式，线上方式需要填写快递单号，线下方式需要填写抵达时间
						</view>
					</view>
					<view class="box2_1_1">
						<view class="numberA">
							5
						</view>
						<view class="textA">
							等待消息，查看检测报告和专家建议
						</view>
					</view>

				</view>
			</uni-section>
		</view>
		<view class="box3">
			<view class="registration" @click="openRegistration()">
				<text>我要报名</text>
			</view>
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				eventData: {},
				src: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E6%B4%BB%E5%8A%A8%E5%9B%BE%E7%89%87%2F%E5%86%9C%E5%9C%BA%E5%9B%BE%E7%89%877.jpg',
			}
		},
		onShow() {
			//获取活动信息
			this.getEvent()
		},
		methods: {
			//获取活动信息
			async getEvent() {
				//发请求赋值
				const res = await my.getEvent()
				if (res.data.code === 200) {
					this.eventData = res.data.data
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

		}
	}
</script>

<style>
	.body {
		position: relative;
	}

	.banner {
		margin-top: 20rpx;
	}

	.banner image {
		width: 100%;
		border-radius: 48rpx;
	}

	.box1 {
		padding: 0 20rpx;
		background-color: #fff;
	}

	.box3 {
		position: relative;
		height: 120rpx;
		line-height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

		padding: 0 20rpx;
	}

	text {
		font-family: "Microsoft YaHei";

	}

	.box1_1 {
		margin: 0 10rpx;
	}

	.title text {
		font-size: 36rpx;
		font-weight: 700;
		line-height: 88rpx;
		letter-spacing: 0.1em;
	}

	.main text {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #9d9d9d;

		letter-spacing: 0.1em;
	}

	.footer {
		position: relative;
		margin: 20rpx 0;
		padding-bottom: 20rpx;
	}

	.time text {
		color: #01c22e;
		font-size: 28rpx;
		letter-spacing: 0.1em;
	}

	.price {
		position: absolute;
		top: 0;
		right: 0;
		color: red;
	}

	.registration {
		position: absolute;
		right: 72rpx;
		bottom: 20rpx;
		background-color: #01c22e;
		text-align: center;

		width: 342rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 56rpx;
	}

	.registration text {

		font-size: 40rpx;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.3em;

	}

	.box2_1 {
		margin: 20rpx;
		padding-bottom: 120rpx;
	}

	.box2_1_1 {
		height: 48rpx;

	}

	.box2_1_2 {
		position: relative;
		height: 96rpx;

	}

	.box2_1_1,
	.box2_1_2 {
		margin-bottom: 20rpx;
	}

	.number,
	.numberA {
		display: inline-block;
		font-size: 32rpx;
		text-align: center;
		width: 48rpx;
		height: 48rpx;
		line-height: 48rpx;
		color: #fff;
		background-color: #01c22e;
		border-radius: 48rpx;

	}

	.number {
		position: absolute;
		top: 50%;
		left: 22rpx;
		transform: translate(-50%, -50%);
	}

	.text,
	.textA {
		display: inline-block;
		width: 632rpx;
		height: 24rpx;
		line-height: 48rpx;
		font-size: 32rpx;
		color: #888;
	}

	.text {
		margin-left: 68rpx;
	}

	.textA {
		margin-left: 20rpx;
	}
</style>
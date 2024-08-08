<template>
	<view>
		<view class="top">
			<view class="content">
				<view class="title">
					{{title}}
				</view>
			</view>
		</view>
		<uni-card title="优惠券活动详情" :extra="applyData.endTime">

			<view class="left">活动名称：
				<view class="right">
					{{applyData.acName}}
				</view>
			</view>
			<view class="left">优惠券价格：
				<view class="price">
					￥{{applyData.couponValue}}
				</view>
			</view>
			<view class="left">活动内容:
				{{applyData.acContent}}
			</view>

		</uni-card>
		<uni-card title="申请详情">

			<view class="left">申请人：
				<view class="right">
					{{applyData.userName}}
				</view>
			</view>
			<view class="left">申请农场名称：
				<view class="right">
					{{applyData.farmName}}
				</view>
			</view>
			<view class="left">农场尺寸:
				<view class="right">
					{{applyData.farmSize}}/公亩
				</view>
			</view>
			<view class="left">农场作物:
				<view class="right">
					{{applyData.farmCrops}}
				</view>
			</view>
			<view class="left">农场地址:
				<view class="right">
					{{applyData.farmAddress}}
				</view>
			</view>
			<view class="left">申请理由:
				{{applyData.applyReason}}
			</view>
		</uni-card>

	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				applyId: null,
				applyData: {
					acContent: "199元优惠券",
					acName: "199元优惠券活动",
					acState: "0",
					applyReason: "用于节省土壤检测开支",
					couponUuid: 20231120085631,
					couponValue: 199,
					createBy: null,
					createTime: null,
					endTime: "2023-11-27 00:00:00",
					farmAddress: "河北省秦皇岛市山海关区",
					farmCrops: "草莓",
					farmName: "大溪花海农场",
					farmSize: 10,
					id: 17,
					remark: null,
					state: "3",
					updateBy: null,
					updateTime: null,
					userId: 3,
					userName: "方杰锋",
				}
			}
		},
		onShow() {
			this.applyId = uni.getStorageSync('applyId')
			this.getApplyDetails(this.applyId)
		},
		methods: {

			async getApplyDetails(id) {
				const res = await my.getApplyDetails(id)
				if (res.data.code === 200) {
					console.log(res.data)
					this.applyData = res.data.data
					if (this.applyData.state === '0') {
						this.title = '等待审核'
					} else if (this.applyData.state === '1') {
						this.title = '申请过期'
					} else if (this.applyData.state === '2') {
						this.title = '申请失败'
					} else {
						this.title = '申请成功'
					}
				}
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
</style>
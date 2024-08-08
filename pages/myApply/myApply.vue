<template>
	<view>
		<view class="order-list">
			<view v-for="(item, index) in applyList" :key="index">

				<view class="order-item" @click="openApplyDetails(item.id)">
					<view class="itemTop">
						<text class="id">{{item.acName}}</text>
						<text class="progress" v-if="item.acState === '1'">进行中</text>
						<text class="Ended" v-if="item.acState === '0'">已结束</text>
					</view>
					<view class="itemButtom">
						<text class="itemText">截止日期：{{item.endTime}}</text>
						<text class="itemContent">活动内容：：{{item.acContent}}</text>

					</view>
					<view class="price">
						￥{{item.couponValue}}
					</view>
					<view class="button" v-if="item.state === '0'">未审核</view>
					<view class="button" v-if="item.state === '1'">已过期</view>
					<view class="button" v-if="item.state === '2'">未通过</view>
					<view class="button" v-if="item.state === '3'">已通过</view>
				</view>

			</view>
		</view>
		<view class="contentNull" v-if="applyList.length === 0">
			<image :src="ordernull" mode=""></image>
			<view class="nullText">
				暂无申请
			</view>
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				applyList: [{
					id: 1,
					acName: '199元优惠券活动',
					acContent: '用于土壤检测活动的199元优惠券活动申请，土壤检测有助于分析土壤成分，并由专家发土壤配方，以帮助用户更科学地施肥，提高农作物产量和品质。',
					endTime: '2023-12-30 00:00:00',
					acState: '0',
					state: '0',
					price: '199',
				}, ],
				ordernull: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/ordernull.png',
			}
		},
		onShow() {
			this.getApplyList()
		},
		methods: {
			openApplyDetails(id) {
				uni.setStorageSync('applyId', id)
				uni.navigateTo({
					url: "/pages/apply_details/apply_details"
				})
			},
			async getApplyList() {
				let userId = uni.getStorageSync('userId')
				const res = await my.getApplyList({
					userId: userId
				})
				if (res.data.code === 200) {
					console.log(res.data.data)
					this.applyList = res.data.data
				}
			},
		}
	}
</script>

<style>
	.order-list {
		padding: 30rpx 20rpx;
	}

	.order-item {
		position: relative;
		border-radius: 20rpx;
		background-color: #fff;
		padding: 14rpx;
		margin-bottom: 30rpx;
		border-bottom: 4rpx solid #d6d6d6;
		border-right: 4rpx solid #d6d6d6;
	}

	.itemTop {
		position: relative;
		border-bottom: 2rpx solid #d6d6d6;
		align-items: center;
		padding: 30rpx 20rpx;

	}


	.itemTop .id {
		display: inline-block;
		font-size: 36rpx;
	}

	.Ended,
	.progress {
		position: absolute;
		right: 18rpx;
		top: 10rpx;
		display: inline-block;
		font-size: 30rpx;
		font-weight: 700;

		line-height: 80rpx;
		/* padding: 20rpx; */
		padding: 0 23rpx;

		border-top-left-radius: 76rpx;
		border-bottom-left-radius: 76rpx;
		letter-spacing: 0.1rem;
	}

	.Ended {
		color: #888;
	}

	.progress {
		color: #02b42c;
	}

	.itemButtom {
		padding: 20rpx;
	}

	.itemButtom .itemText {
		display: block;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #888;
		letter-spacing: 0.1em;
	}

	.itemButtom .itemContent {
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #888;
		letter-spacing: 0.1em;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 440rpx;
		height: 64rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.itemButtom .itemText:nth-child(3) {
		display: inline-block;
		width: 460rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price {
		position: absolute;
		top: 132rpx;
		right: 48rpx;
		font-size: 48rpx;
		font-weight: 700;
		color: red;
	}

	.button {
		position: absolute;
		width: 166rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 48rpx;
		bottom: 24rpx;
		right: 26rpx;
		background-color: #02b42c;
		color: #fff;
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
</style>
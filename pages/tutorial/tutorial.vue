<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<view class="swiper-item" v-for="(item,index) in swiperList" :key="index">
					<swiper-item>
						<image :src="item.src"></image>
					</swiper-item>
				</view>
			</swiper>
		</view>
		<view class="toSoil" @click="openSoil()">
			<text>以了解流程，我要采土</text>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				swiperList: [{
						src: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F1.png',
					},
					{
						src: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F2.png',
					},
					{
						src: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F3.png',
					},
					{
						src: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/%E9%87%87%E5%9C%9F%E6%95%99%E7%A8%8B%2F4.png',
					},
				]
			}
		},
		methods: {
			openSoil() {
				uni.navigateTo({
					url: "/pages/soil/soil"
				})
			},
		}
	}
</script>

<style>
	.swiper {
		position: relative;
		width: 750rpx;
		height: 1328rpx;
		text-align: center;

	}



	.swiper-item image {
		margin: 20rpx 0 10rpx 0;
		border-radius: 20rpx;
		width: 636rpx;
		height: 1400rpx;
	}

	.toSoil {
		position: fixed;
		bottom: 20rpx;
		left: 54rpx;
		width: 646rpx;
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
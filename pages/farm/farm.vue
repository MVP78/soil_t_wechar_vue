<template>
	<view class="container">
		<view class="address-list">
			<view class="a-address" v-for="(item,index) in soil_farm" :key="index">
				<view class="left-text" @tap="selectTap(item)">
					<view class="name-tel">
						<text>农场名称：{{item.farmName}}</text>
						<text style="font-size:12px;color: #888888;">农场尺寸：{{item.farmSize}}公亩</text>
						<text style="font-size:12px;color: #888888;">农场作物：{{item.farmCrops}}</text>
					</view>
					<view class="address-box">
						<text>
							农场地址：{{item.farmAddress}}
						</text>
					</view>
				</view>
				<view class="right-edit">
					<image :src="xiugai" @click="openPopup(item.id)"></image>
					<image :src="shanchu" @tap="deleteFarm(item.id)"></image>
				</view>
			</view>
		</view>
		<view class="contentNull" v-if="soil_farm.length === 0">
			<image :src="textnull" mode=""></image>
			<view class="nullText">
				暂无农场
			</view>
		</view>
		<view class="addButton" @click="openPopup('-1')">
			添加农场信息
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				xiugai: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fxiugai.png',
				shanchu: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fshanchu.png',
				userId: null,
				entryState: '0',
				title: '',
				content: '',
				soil_farm: [],
				textnull: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/textnull.png',
			}
		},
		onShow() {
			this.entryState = uni.getStorageSync('entryState');
			this.userId = uni.getStorageSync('userId')
			//刷新列表
			this.getSoilfarm(this.userId)
		},
		methods: {
			//选择农场
			selectTap(farm) {
				//选择的农场存入本地
				uni.setStorageSync('farm', farm);
				if (this.entryState === '1') {
					//报名农场选择页
					uni.navigateTo({
						url: `/pages/registration/registration`,
					});

				} else if (this.entryState === '2') {
					//优惠劵农场选择页
					uni.navigateTo({
						url: '/pages/apply_coupon/apply_coupon',
					});
				}

			},
			//打开新增或修改农场地址表单
			openPopup(openId) {
				uni.setStorageSync('openId', openId)
				uni.navigateTo({
					url: `/pages/farm_modify/farm_modify`,
				});
			},

			//删除农场
			deleteFarm(id) {
				uni.showModal({
					title: '确认删除',
					content: '您确定要删除该农场吗？',
					success: (res) => {
						if (res.confirm) {
							console.log(id)
							this.removeFarm(id)
						}
					},
				});
			},
			//重新获取数据
			async getSoilfarm(userId) {
				//发送请求
				const res = await my.getFarmlist({
					userId: userId
				})
				if (res.statusCode === 200) {
					this.soil_farm = res.data

				}
			},

			async removeFarm(id) {
				console.log(id)
				let userId = this.userId
				const res = await my.deleteFarm({
					userId: userId,
					id: id
				})
				if (res.data.code === 200) {
					//刷新
					this.getSoilfarm(this.userId)
					uni.showToast({
						title: '删除成功',
						duration: 1000,
						icon: 'success',
					});
				} else {
					uni.showToast({
						title: '删除失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},

		}
	}
</script>

<style>
	.container {
		padding: 10px;
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

	.address-list {
		width: 100%;
	}

	.address-list .a-address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		background-color: #fff;
		border-bottom: 2px solid #888888;
		border-right: 2px solid #888888;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.a-address .left-text {
		width: 476px;
		padding-left: 58rpx;
	}


	.a-address .left-text .name-tel {
		margin-bottom: 20upx;
	}

	.a-address .left-text .name-tel text {
		display: block;
		margin-bottom: 6px;
	}


	.a-address .left-text .address-box {
		width: 550rpx;
	}


	.a-address .left-text .address-box text {
		font-size: 24upx;
		color: #888888;
		line-height: 36upx;
		display: block;
		/* 		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
	}

	.a-address .right-edit {
		width: 45px;
		padding-top: 6px;
		margin-right: 22px;
		height: 100%;
	}

	.a-address .right-edit image {
		width: 25px;
		height: 25px;
		margin-bottom: 16px;

	}

	.addButton {
		position: fixed;
		bottom: 20rpx;
		left: 34rpx;
		width: 680rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 9px;
		letter-spacing: 0.3em;

	}
</style>
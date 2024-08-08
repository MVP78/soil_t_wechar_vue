<template>
	<view style="overflow-x:hidden">

		<view class="top-bj" v-if="isLogin">
			<view class="user-pic">
				<image :src="userData.avatarUrl" mode="" class="userImg"></image>
			</view>
			<view class="user-info">
				<view class="box4">
					<view class="content">
						{{userData.nickname}}
					</view>
					<view class="user-edit" @click="openMyInfo()">
						<view class="content">
							编辑信息
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="top-bj" v-else>
			<view class="user-pic">
				<uni-icons type="contact-filled" size="100"></uni-icons>
			</view>
			<view class="user-info">
				<view class="content">
				</view>
				<view class="user-edit" @click="wxLogin">
					<view class="content">
						点击登录
					</view>
				</view>
			</view>

		</view>

		<view class="menu-box">
			<uni-section title="个人管理" type="line">
				<uni-list>

					<view @click="chooseOrder(0)" hover-class="navigator-hover">
						<uni-list-item showArrow>
							<template v-slot:header>
								<view class="slot-box">
									<image class="slot-image" :src="dingdan" mode="widthFix">
									</image>
								</view>
							</template>
							<template v-slot:body>
								<text class="slot-box slot-text">订单管理</text>
							</template>
						</uni-list-item>
					</view>
					<view @click="chooseCoupon()" hover-class="navigator-hover">
						<uni-list-item showArrow>
							<template v-slot:header>
								<view class="slot-box">
									<image class="slot-image" :src="youhuiquan" mode="widthFix">
									</image>
								</view>
							</template>
							<template v-slot:body>
								<text class="slot-box slot-text">优惠券管理</text>
							</template>
						</uni-list-item>
					</view>


					<view @click="chooseFarm('0')" hover-class="navigator-hover">
						<uni-list-item showArrow>
							<template v-slot:header>
								<view class="slot-box">
									<image class="slot-image" :src="nongchang" mode="widthFix">
									</image>
								</view>
							</template>
							<template v-slot:body>
								<text class="slot-box slot-text">农场管理</text>
							</template>
						</uni-list-item>
					</view>
					<view @click="chooseApply()" hover-class="navigator-hover">
						<uni-list-item showArrow>
							<template v-slot:header>
								<view class="slot-box">
									<image class="slot-image" :src="myApply" mode="widthFix">
									</image>
								</view>
							</template>
							<template v-slot:body>
								<text class="slot-box slot-text">我的申请</text>
							</template>
						</uni-list-item>
					</view>
				</uni-list>
			</uni-section>
			<view class="customer">
				<button open-type="contact" plain="true">
					<image :src="kefu" mode=""></image>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				kefu: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fkefu.png',
				nongchang: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fnongchang.png',
				youhuiquan: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2Fyouhuiquan.png',
				dingdan: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fmy%2F31dingdan.png',
				myApply: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/myApply.png',
				isLogin: false,
				userId: null,
				userData: {
					avatarUrl: '',
					mobile: '',
					nickname: '',
				},
			}
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.getUserinfo()

			}
		},
		methods: {
			//点击登录
			wxLogin() {
				let _this = this
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function(loginRes) {
						console.log(loginRes);
						_this.toLogin(loginRes.code)
					}
				});
			},
			//登录
			async toLogin(code) {
				let _this = this
				const response = await my.login({
					appid: 'wxd56d534af754b002',
					code: code
				})
				//已登录过
				if (response.data.code === 200) {
					uni.setStorageSync('token', response.data.data.token);
					//获取用户信息
					uni.setStorageSync('userId', response.data.data.user.id)
					this.userData = response.data.data.user

					this.userData.avatarUrl = 'http://47.111.157.212:8787' + this.userData.avatarUrl

					uni.setStorageSync('userData', response.data.data.user)
					this.isLogin = true

				} else {
					//未登录过
					uni.showModal({
						title: '授权',
						content: '您确定授权登录该小程序吗？',
						success: (res) => {
							if (res.confirm) {
								uni.setStorageSync('token', response.data.data.token);
								//wx获取用户信息接口
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										//授权
										console.log('11111111111111')
										console.log(infoRes)
										_this.auth(infoRes.userInfo)
									}
								});
							}
						},
					});
				}
			},
			//授权
			async auth(userInfo) {
				const res = await my.postAuth({
					avatarUrl: userInfo.avatarUrl,
					nickname: userInfo.nickName
				})
				if (res.data.code === 200) {
					//用户id存入本地
					uni.setStorageSync('userId', res.data.data.userId)

					this.getUserinfo()
				}
			},
			//获取用户信息
			async getUserinfo() {
				let id = uni.getStorageSync('userId')
				const res = await my.getUser({
					userId: id
				})
				if (res.data.code === 200) {
					this.userData = res.data.data.soilUser
					//存入本地
					uni.setStorageSync('userData', res.data.data.soilUser)
					console.log('222222222222222222')
					console.log(this.userData)

					this.userData.avatarUrl = 'http://47.111.157.212:8787' + this.userData.avatarUrl

					this.isLogin = true
				}
			},
			//编辑个人信息	
			openMyInfo() {
				uni.removeStorageSync('myInfoInputData1');
				uni.removeStorageSync('myInfoInputData2');
				uni.removeStorageSync('imgFilePath');
				uni.navigateTo({
					url: '/pages/personal_details/personal_details',
				});
			},
			//打开优惠券
			chooseCoupon() {
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
							url: '/pages/discount_coupon/discount_coupon',
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
			//打开农场列表
			chooseFarm(entryState) {
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
						uni.setStorageSync('entryState', entryState);
						uni.navigateTo({
							url: `/pages/farm/farm`,
						});
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
			//打开订单列表
			chooseOrder(currentTab) {
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
							url: `/pages/order/order`,
						});
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
			//打开我的申请
			chooseApply() {
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
							url: '/pages/myApply/myApply',
						});
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
			contact() {
				wx.openCustomerServiceChat({
					extInfo: {
						url: ""
					},
					corpId: "",
					success(res) {},
					fail(error) {},
				});
			},

		}
	}
</script>

<style scoped lang="scss">
	.top-bj {
		position: relative;
		height: 279rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.user-pic {
		position: absolute;
		top: 50%;
		margin-top: -100rpx;
		margin-left: 20rpx;
		width: 200rpx;
		height: 200rpx;
	}

	.userImg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 18px;
	}

	.user-info {
		position: absolute;
		width: 488rpx;
		height: 172rpx;
		top: 50%;
		margin-top: -86rpx;
		margin-left: 234rpx;
	}

	.box4 {
		position: relative;
		color: #fff;
		width: 100%;
		height: 172rpx;
		font-size: 50rpx;
		font-weight: 700;
		display: inline-block;
		background-color: #fbc000;
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
	}



	.user-edit {
		position: absolute;
		top: 0;
		right: -28rpx;
		color: #fff;
		width: 280rpx;
		height: 172rpx;
		font-size: 50rpx;
		font-weight: 700;
		display: inline-block;
		background-color: #01d332;
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 100rpx;
	}

	.content {
		width: 404rpx;
		margin-top: 48rpx;
		margin-left: 48rpx;
	}

	.menu-box {
		margin-top: 20rpx;
	}



	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */

		width: 50rpx;
		height: 50rpx;
	}

	.slot-text {
		lex: 1;
		font-size: 16px;

		margin-left: 16px;

		font-family: "Microsoft YaHei";
		letter-spacing: 0.1em;
	}

	.customer {
		position: fixed;
		bottom: 0;
		right: 0;
	}

	.customer button[plain] {
		border: 0
	}

	.customer image {
		padding-top: 14px;
		width: 40px;
		height: 40px;
	}

	.customer {
		width: 68px;
		border-radius: 18px;
	}
</style>
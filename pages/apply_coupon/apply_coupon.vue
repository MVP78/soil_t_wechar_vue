<template>
	<view class="body">

		<image :src="shenqing" style="width: 750rpx;" class="bjImg"></image>
		<view class="boxText">
			<view class="time">
				截止时间：{{couponEventData.endTime}}
			</view>

		</view>
		<view class="box">
			<uni-forms ref="form" :modelValue="applyFormData" :rules="rules" class="form">
				<view class="item">
					<uni-forms-item label="我的名称:" required name="userName" label-width="200rpx" class="box1_1">
						<input class="uni-input" disabled v-model="applyFormData.userName" />
					</uni-forms-item>
				</view>
				<view class="item">
					<uni-forms-item label="我的农场:" required name="farmName" label-width="200rpx">
						<input class="uni-input" disabled v-model="applyFormData.farmName" />

						<view class="selectButton" @click="chooseFarm('2')">选择农场</view>

					</uni-forms-item>
				</view>
				<view class="item">
					<uni-forms-item label="申请理由:" required name="applyReason" label-width="200rpx">
						<uni-easyinput class="textareaInput" type="textarea" autoHeight
							style="{width: 200px;display: inline-block;}" v-model="applyFormData.applyReason"
							@input="onInput($event)" placeholder="请输入内容"></uni-easyinput>
					</uni-forms-item>
				</view>
			</uni-forms>
		</view>

		<view class="submitButton" @click="submitForm()">提交</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {

		data() {
			return {
				shenqing: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Fshenqing.png',
				inputData1: '',
				inputData2: '',
				applyFormData: {
					userId: '',
					userName: '',
					farmId: '',
					farmName: '',
					applyReason: '',
					tempOne: null,
				},
				couponEventData: {

				},
				rules: {
					userName: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					farmName: {
						rules: [{
							required: true,
							errorMessage: '农场不能为空'
						}]
					},
					applyReason: {
						rules: [{
							required: true,
							errorMessage: '理由不能为空'
						}]
					}

				},
			}

		},
		onUnload() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		onShow() {

			this.applyFormData.farmName = uni.getStorageSync('farm').farmName
			this.applyFormData.farmId = uni.getStorageSync('farm').id
			this.applyFormData.userId = uni.getStorageSync('userId')
			this.applyFormData.userName = uni.getStorageSync('userData').nickname
			this.applyFormData.applyReason = uni.getStorageSync('applyInputData')
			//获取活动详情
			this.couponEventData = uni.getStorageSync('couponEventData')
			this.applyFormData.tempOne = this.couponEventData.id
		},

		methods: {
			onInput(event) {
				console.log(event)
				uni.setStorageSync(`applyInputData`, event)
			},
			// 选择农场
			chooseFarm(entryState) {
				uni.setStorageSync('entryState', entryState)
				uni.navigateTo({
					url: '/pages/farm/farm',
				});
			},

			//点击提交
			submitForm() {
				//对表单进行校验				
				this.$refs.form.validate().then(res => {
					//发送请求，
					this.applyCoupon(this.applyFormData)

				}).catch(err => {
					console.log('err', err);
				})

			},
			//申请优惠券
			async applyCoupon(applyFormData) {
				const res = await my.applyCoupon(applyFormData)
				if (res.data.code === 200) {
					//提交成功
					this.clearForm()
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1000)

					//弹窗
					uni.showToast({
						title: '申请已发送',
						duration: 1000,
						icon: 'success',
					});
				} else {
					uni.showToast({
						title: '申请失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},
			clearForm() {
				this.applyFormData = []
			},

		}
	}
</script>


<style lang="scss">
	.body {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.bjImg {

		height: 1385rpx;
		display: initial;
		position: absolute;
	}


	.box,
	.boxText {
		position: relative;
		top: 0;
		left: 0;
	}

	.uni-forms {
		position: absolute;
		left: 84rpx;
		top: 766rpx;
	}

	.time {
		position: absolute;
		left: 140rpx;
		top: 132rpx;
		color: #01c22e;
	}

	.item text {
		font-size: 36rpx;
		font-weight: 700;
	}

	.uni-input {
		display: inline-block;
		width: 340rpx;
		height: 72rpx;
		font-size: 36rpx;
		font-weight: 700;
		line-height: 72rpx;
		color: #01c22e;
	}

	.selectButton {
		z-index: 10;
		position: absolute;
		left: 238rpx;
		width: 152rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		text-align: center;

		background-color: #01c22e;
		color: #fff;
		border-radius: 24px;
		top: 8rpx;
	}

	.submitButton {
		position: fixed;
		bottom: 20rpx;
		left: 32%;
		width: 256rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 56rpx;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 32px;
		font-weight: 700;
		margin-bottom: 20rpx;
		letter-spacing: 0.1em;
	}
</style>
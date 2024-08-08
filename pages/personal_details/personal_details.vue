<template>
	<view style="overflow-x:hidden">


		<view class="body">
			<view class="form">
				<uni-forms ref="form" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="姓名" name="nickname" label-width="90px">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.nickname"
							@input="onInput(1,$event)" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="手机号" name="mobile" label-width="90px">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.mobile"
							@input="onInput(2,$event)" placeholder="请输入手机号" />
					</uni-forms-item>
					<uni-forms-item label="我的头像" name="image" label-width="80px">
						<view class="uimg">
							<image v-if="imageUrl" :src="imageUrl">
								<view v-if="imageUrl" class="clear-button" @tap="clearImage">X</view>
							</image>
							<text v-else @tap="chooseImage">+</text>
						</view>
					</uni-forms-item>
				</uni-forms>

			</view>
			<view class="addButton" @click="submitForm()">
				上传个人信息
			</view>
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				isChange: false,
				imageUrl: '',
				valiFormData: {
					userId: null,
					nickname: '',
					mobile: '',
				},
				rules: {
					mobile: {
						rules: [{
								format: 'number',
								errorMessage: '请输入数字'
							},
							{
								pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
								message: "请输入正确的手机号码",
							},
						]
					},
				},

			}
		},
		onShow() {

			this.valiFormData = uni.getStorageSync('userData')

			this.valiFormData.avatarUrl = 'http://47.111.157.212:8787' + this.valiFormData.avatarUrl

			let nickname = uni.getStorageSync('myInfoInputData1')
			let mobile = uni.getStorageSync('myInfoInputData2')
			if (nickname) {
				this.valiFormData.nickname = nickname
			}

			if (mobile) {
				this.valiFormData.mobile = mobile
			}
			if (uni.getStorageSync('imgFilePath')) {
				this.imageUrl = uni.getStorageSync('imgFilePath')
			} else {
				this.imageUrl = this.valiFormData.avatarUrl
			}
			this.valiFormData.userId = uni.getStorageSync('userId')

		},
		methods: {
			onInput(inputNumber, event) {
				uni.setStorageSync(`myInfoInputData${inputNumber}`, event)
			},
			submitForm() {
				//对表单进行校验
				this.$refs.form.validate().then(res => {
					if (this.imageUrl && this.isChange === true) {
						this.processRequest()
					} else {
						this.updateUserInfo(this.valiFormData)
					}

				}).catch(err => {
					console.log('err', err);
				})



			},
			//选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res)
						const tempFilePaths = res.tempFilePaths;
						uni.setStorageSync('imgFilePath', tempFilePaths[0])
						this.imageUrl = tempFilePaths[0]
						this.isChange = true

					},
					fail: (err) => {
						console.error(err.errMsg);
					},
				});
			},
			//上传图片
			async uploadImage(filePath) {
				let userId = uni.getStorageSync('userId')
				const res = await api.uploadImage(filePath, {
					userId: userId
				})
				if (res.statusCode === 200) {
					let temp = JSON.parse(res.data);
					// this.formData.avatarUrl = temp.data.url
				}
			},
			//修改用户信息
			async updateUserInfo(valiFormData) {
				console.log(valiFormData)
				const res = await my.updateUser(valiFormData)
				if (res.data.code === 200) {
					uni.showToast({
						title: '上传成功',
						duration: 1000,
						icon: 'success',
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/my/my'
						});
					}, 1000)

				} else if (res.data.msg === '该手机号码已被注册') {
					//弹窗
					uni.showToast({
						title: '手机号已被注册',
						duration: 1000,
						icon: 'error',
					});
				} else {
					uni.showToast({
						title: '上传失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},
			//顺序处理两个请求
			async processRequest() {
				try {
					// 发起第一个请求
					const response1 = await this.uploadImage(this.imageUrl);

					// 发起第二个请求
					const response2 = await this.updateUserInfo(this.valiFormData)

				} catch (error) {
					// 捕捉可能的错误
					console.error('请求发生错误', error);
				}
			},
			clearImage() {
				this.imageUrl = '';
			},

		}
	}
</script>

<style>
	.body {
		padding: 30px 10px 10px 10px;

	}

	.form {
		position: relative;
		background-color: #fff;
		padding-top: 22px;
		border-bottom: 2px solid #888888;
		border-right: 2px solid #888888;
		border-radius: 10px;
	}

	.uni-forms-item {
		margin: 0 15px;
		border-bottom: 1px solid #e5e5e5;

	}

	.uni-forms-item:nth-child(3) {
		border-bottom: 0;
	}

	.uimg {
		display: block;
		text-align: center;
	}



	.uimg image {
		position: relative;
		width: 200px;
		height: 200px;
		border-radius: 5%;
		display: inline-block;
	}

	.uimg text {
		display: inline-block;
		width: 200px;
		height: 200px;
		line-height: 180px;
		font-size: 200px;
		color: #eaeaea;
		border: 2px solid #eaeaea;
		border-radius: 5%;
	}

	.clear-button {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 14px;
		color: #fff;
		background-color: #757575;
		/* 按钮背景颜色，可以根据需要修改 */
		padding: 6px;
		border-radius: 50%;
		cursor: pointer;
	}

	.addButton {
		position: fixed;
		bottom: 20rpx;
		left: 20rpx;
		width: 704rpx;
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
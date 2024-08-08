<template>
	<view class="body">
		<view class="form">
			<uni-forms ref="form" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="农场名称" required name="farmName" label-width="220rpx">
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.farmName"
						placeholder="请输入农场名称" />
				</uni-forms-item>
				<uni-forms-item label="农场作物" required name="farmCrops" label-width="220rpx">
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.farmCrops"
						placeholder="请输入农场作物" />
				</uni-forms-item>
				<uni-forms-item label="农场尺寸/公亩" required name="farmSize" label-width="220rpx">
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.farmSize"
						placeholder="请输入农场尺寸" />
				</uni-forms-item>
				<uni-forms-item label="农场地址" required name="farmAddress" label-width="220rpx">
					<uni-easyinput :inputBorder="false" :clearable="false" v-model="valiFormData.farmAddress"
						placeholder="请选择农场地址" />
				</uni-forms-item>
				<view class="address" @click="openAddress">
					<image :src="dizhi"></image>
				</view>
			</uni-forms>

			<view class="addButton" @click="submitForm()">
				提交{{title}}信息
			</view>
		</view>

	</view>
	<liu-customize-sel ref="scroll" @change='chooseSuccess'></liu-customize-sel>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				dizhi: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/soil-img-all%2F%E7%B4%A0%E6%9D%90%2Ffarm%2Fdizhi.png',
				title: '',
				openId: null,
				showModal: true,
				valiFormData: {
					// id: null,
					// userId: '',
					// farmName: '小',
					// farmCrops: '10010',
					// farmSize: 10,
					// farmAddress: '北京市海淀区植物园',
				},
				rules: {
					farmName: {
						rules: [{
							required: true,
							errorMessage: '农场名称不能为空'
						}]
					},
					farmCrops: {
						rules: [{
							required: true,
							errorMessage: '农场作物不能为空'
						}]
					},
					farmSize: {
						rules: [{
							required: true,
							errorMessage: '农场大小不能为空'
						}, {
							format: 'number',
							errorMessage: '请输入数字'
						}]
					},
					farmAddress: {
						rules: [{
							required: true,
							errorMessage: '农场地址不能为空'
						}]
					},
				}
			}
		},

		onShow() {
			this.openId = uni.getStorageSync('openId')

			if (this.openId === '-1') {
				this.title = '新增农场'
			} else {
				this.title = '修改农场'
				//请求回填数据
				this.getFarmByid()
			}
		},

		methods: {
			//回显表单信息
			async getFarmByid() {
				const res = await my.getFarmByid(this.openId)
				if (res.data.code === 200) {
					this.valiFormData = res.data.data
					console.log(this.valiFormData)
				}
			},

			//打开地址选择器
			openAddress() {
				this.$refs.scroll.open()
			},

			//地址选择成功
			chooseSuccess(e) {
				console.log('所选择的地址信息:', e.value[0].label)
				this.valiFormData.farmAddress = e.value[0].label + e.value[1].label + e.value[2].label
			},

			//提交表单
			submitForm() {
				this.valiFormData.userId = uni.getStorageSync('userId')
				//对整个表单进行校验
				this.$refs.form.validate().then(res => {
					//根据打开页面时传入的id进行判断是新增还是修改
					if (this.openId === '-1') {
						//添加农场
						this.addFarm(this.valiFormData)

					} else {
						//修改
						this.valiFormData.id = uni.getStorageSync('openId')
						this.updateFarm(this.valiFormData)
					}

					this.clearForm()

				}).catch(err => {
					console.log('err', err);
				})
			},
			async addFarm(valiFormData) {
				//新增用户发送请求
				const res = await my.addFarm(valiFormData)
				if (res.data.code === 200) {

					setTimeout(function() {
						uni.navigateBack({
							delta: 1,
						})
					}, 1000)
					uni.showToast({
						title: '添加成功',
						duration: 1000,
						icon: 'success',
					});
				} else {
					uni.showToast({
						title: '添加失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},
			//修改农场
			async updateFarm(valiFormData) {
				const res = await my.updateFarm(valiFormData)
				if (res.data.code === 200) {
					//返回上一页
					setTimeout(function() {
						uni.navigateBack({
							delta: 1,
						})
					}, 1000)
					uni.showToast({
						title: '修改成功',
						duration: 1000,
						icon: 'success',
					});
				} else {
					uni.showToast({
						title: '修改失败',
						duration: 1000,
						icon: 'error',
					});
				}
			},
			clearForm() {
				this.valiFormData = []
			},
		}
	}
</script>

<style>
	.body {
		padding: 60rpx 20rpx 20rpx 20rpx;

	}

	.form {
		position: relative;
		background-color: #fff;
		padding-top: 44rpx;
		border-bottom: 4rpx solid #888888;
		border-right: 4rpx solid #888888;
		border-radius: 20rpx;
	}

	.uni-forms-item {
		margin: 0 30rpx;
		border-bottom: 2px solid #e5e5e5;

	}

	.addButton {
		position: fixed;
		bottom: 10px;
		left: 30rpx;
		width: 680rpx;
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		text-align: center;
		background-color: #01c22e;
		color: #fff;
		border-radius: 9px;
		letter-spacing: 0.3em;

	}

	.a-address {
		z-index: 10;
	}

	.address image {
		z-index: 10;
		width: 30px;
		height: 30px;
		position: absolute;
		bottom: 30px;
		right: 20px;
	}
</style>
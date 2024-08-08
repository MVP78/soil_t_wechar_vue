<template>
	<view class="body">
		<view v-if="isReport === true">
			<uni-card title="报告检测项详情">
				<view v-for="(item,index) in reportData">
					<view class="left">{{item.itemName}}:
						<view class="right">
							<view class="box">
								{{item.itemValue+item.itemUnit}}
								<view class="level1" v-if="item.itemLevel==='偏低'">
									{{item.itemLevel}}
								</view>
								<view class="level2" v-if="item.itemLevel==='标准'">
									{{item.itemLevel}}
								</view>
								<view class="level3" v-if="item.itemLevel==='偏高'">
									{{item.itemLevel}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-card>
		</view>

		<view v-else>
			<uni-card title="施肥建议">
				<text class="uni-body">{{adviceData.fertilizationAdvice}}</text>
			</uni-card>
			<uni-card title="种植建议">
				<text class="uni-body">{{adviceData.plantAdvice}}</text>
			</uni-card>
			<uni-card title="土壤建议">
				<text class="uni-body">{{adviceData.soilAdvice}}</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				isReport: '',
				reportData: [],
				adviceData: {}
			}
		},
		onShow() {
			this.isReport = uni.getStorageSync('isReport')
			this.getAdvice()
			this.getReport()
		},
		methods: {
			//查看专家配方
			async getAdvice() {
				let id = uni.getStorageSync('orderId')
				const res = await my.getAdvice(id)
				if (res.data.code === 200) {
					this.adviceData = res.data.data
				}

			},
			//查看检测报告
			async getReport() {
				let id = uni.getStorageSync('orderId')
				const res = await my.getReport(id)
				if (res.data.code === 200) {
					this.reportData = res.data.data
				}

			},
		}
	}
</script>

<style>
	.body {
		padding-bottom: 20px;
	}

	text {
		display: block;
		font-size: 18px;

	}

	.uni-body {
		line-height: 26px;
		letter-spacing: 0.05em;
	}

	.left {
		font-size: 16px;
		color: #888;
		margin: 10px 0;
		border-top-left-radius: ;
	}

	.right {
		width: 156px;
		float: right;
		color: #000;
	}

	.box {
		display: inline-block;

		float: right;
	}

	.level1,
	.level2,
	.level3 {
		display: inline-block;
		margin-left: 10px;
	}

	.level1 {
		color: #fbc000;
	}

	.level2 {
		color: #00aaff;
	}

	.level3 {
		color: #ff5050;
	}
</style>
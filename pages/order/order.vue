<template>
	<view>
		<!-- 顶部选项卡 -->
		<view class="tab-bar">
			<uni-segmented-control :current="currentTab" @clickItem="onClickItem" :values="tabOptions" styleType="text"
				activeColor="#01c22e" />
		</view>



		<!-- 订单列表 -->
		<view class="order-list">
			<!-- 待支付 -->
			<view v-if="currentTab === 0 ">
				<view v-for="(item, index) in order" :key="index">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '0' " class="order-item" @click="openDetailedorder(item)">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button" @click.stop="dialogToggle(item.id)">前往支付
						</view>

					</view>
				</view>
				<view class="contentNull" v-if="nub0.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
			<!-- 待采土 -->
			<view v-if="currentTab === 1 ">
				<view v-for="(item, index) in order" :key="index">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '1' " class="order-item" @click="openDetailedorder(item)">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button" @click.stop="openSoil(item)">
							前往采土
						</view>

					</view>
				</view>
				<view class="contentNull" v-if="nub1.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
			<!-- 待寄土 -->
			<view v-if="currentTab === 2 ">
				<view v-for="(item, index) in order" :key="index" @click="openDetailedorder(item)">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '2' " class="order-item">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button" @click.stop="openSendsoil(item)">前往寄土
						</view>

					</view>
				</view>
				<view class="contentNull" v-if="nub2.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
			<!-- 等待报告 -->
			<view v-if="currentTab === 3 ">
				<view v-for="(item, index) in order" :key="index" @click="openDetailedorder(item)">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '3' " class="order-item">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button">查看反馈</view>
					</view>
				</view>
				<view class="contentNull" v-if="nub3.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
			<!-- 等待配方 -->
			<view v-if="currentTab === 4 ">
				<view v-for="(item, index) in order" :key="index">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '4' " class="order-item" @click.stop="openDetailedorder(item)">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button">查看反馈</view>
					</view>
				</view>
				<view class="contentNull" v-if="nub4.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
			<!-- 已完成 -->
			<view v-if="currentTab === 5 ">
				<view v-for="(item, index) in order" :key="index">
					<!-- 订单项内容，与前面的示例相似 -->
					<view v-if="item.state === '5' " class="order-item" @click.stop="openDetailedorder(item)">
						<view class="itemTop">
							<text class="id">单号：{{item.orderCode}}</text>
							<text class="time">{{item.orderTime}}</text>
						</view>
						<view class="itemButtom">
							<text class="itemText">农场名称：{{item.farmName}}</text>
							<text class="itemText">农场作物：{{item.farmCrops}}</text>
							<text class="itemText">农场地址：{{item.farmAddress}}</text>
						</view>
						<view class="price">
							￥{{item.acPaid}}
						</view>
						<view class="button">查看反馈</view>
					</view>
				</view>
				<view class="contentNull" v-if="nub5.length === 0">
					<image :src="ordernull" mode=""></image>
					<view class="nullText">
						暂无相关订单
					</view>
				</view>
			</view>
		</view>

		<!-- 对话框 -->
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog type="success" cancelText="关闭" confirmText="下一步" title="通知" content="缴费成功"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				userId: null,
				currentTab: 0,
				nub0: [],
				nub1: [],
				nub2: [],
				nub3: [],
				nub4: [],
				nub5: [],
				tabOptions: ['待支付', '未采土', '未寄土', '待报告', '待配方', '已完成'],
				order: [],
				orderNull: 'https://soil-1316427759.cos.ap-guangzhou.myqcloud.com/ordernull.png',
			};
		},
		onShow() {
			this.currentTab = uni.getStorageSync('currentTab')
			this.userId = uni.getStorageSync('userId')

			this.getOrderlist(this.userId)
		},
		methods: {
			onClickItem(e) {
				if (this.currentTab != e.currentIndex) {
					this.currentTab = e.currentIndex;
				}
			},
			//点击缴费
			dialogToggle(orderId) {
				//发送请求进行付款
				this.makePayment(orderId)

			},
			//点击下一步跳转采土打卡
			dialogConfirm() {
				//当前订单id存入本地
				uni.setStorageSync('orderId', orderId)
				uni.navigateTo({
					url: "/pages/soil/soil"
				})

			},
			//点击关闭
			dialogClose() {
				//刷新列表
				this.getOrderlist(this.userId)
			},
			//点击前往采土
			openSoil(order) {
				uni.setStorageSync('orderId', order.id)
				uni.setStorageSync('orderCode', order.orderCode)
				uni.navigateTo({
					url: "/pages/tutorial/tutorial"
				})
			},
			//点击前往寄土
			openSendsoil(order) {
				uni.setStorageSync('orderId', order.id)
				uni.setStorageSync('orderCode', order.orderCode)
				uni.navigateTo({
					url: "/pages/sending_soil/sending_soil"
				})
			},
			//打开订单详情
			openDetailedorder(order) {
				uni.setStorageSync('orderId', order.id)
				uni.setStorageSync('orderCode', order.orderCode)
				uni.navigateTo({
					url: "/pages/order_details/order_details"
				})
			},
			//获取用户订单列表	
			async getOrderlist(userId) {
				const res = await my.getOrderlist({
					userId: userId
				})
				if (res.data.code === 200) {
					this.order = res.data.data
					this.order.forEach((item) => {
						if (item.state === '0') {
							this.nub0.push(item)
						} else if (item.state === '1') {
							this.nub1.push(item)
						} else if (item.state === '2') {
							this.nub2.push(item)
						} else if (item.state === '3') {
							this.nub3.push(item)
						} else if (item.state === '4') {
							this.nub4.push(item)
						} else if (item.state === '5') {
							this.nub5.push(item)
						}
					})
				}
			},
			//进行支付
			async makePayment(orderId) {
				const res = await my.makePayment({
					id: orderId,
					userId: this.userId,
					state: '1'
				})
				if (res.data.code === 200) {
					this.$refs.popupDialog.open()
				}
			}
		},
	};
</script>

<style scoped>
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

	text {
		font-family: "Microsoft YaHei";
	}

	.tab-bar {

		background-color: #fff;
		margin-bottom: 10px;
	}

	.order-list {
		padding: 0 10px 20px 10px;
	}

	.title {
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}

	.order-item {
		position: relative;
		border-radius: 10px;
		background-color: #fff;
		padding: 10rpx;
		margin-bottom: 15px;
		border-bottom: 2px solid #d6d6d6;
		border-right: 2px solid #d6d6d6;
	}

	.itemTop {
		border-bottom: 1px solid #d6d6d6;
		align-items: center;
		padding: 10px;
	}


	.itemTop .id {
		display: inline-block;
		font-size: 14px;
	}

	.itemTop .time {
		display: inline-block;
		font-size: 10px;
		margin-left: 58px;
		line-height: 19px;
	}

	.itemButtom {
		padding: 10px;
	}

	.itemButtom .itemText {
		display: block;
		margin-bottom: 10px;
		font-size: 12px;
		color: #888;
		letter-spacing: 0.1em;
	}

	.itemButtom .itemText:nth-child(3) {
		display: inline-block;
		width: 230px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price {
		position: absolute;
		top: 63px;
		right: 29px;
		font-size: 24px;
		font-weight: 700;
		color: red;
	}

	.button {
		position: absolute;
		width: 94px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 24px;
		bottom: 18px;
		right: 10px;
		background-color: #02b42c;
		color: #fff;
	}
</style>
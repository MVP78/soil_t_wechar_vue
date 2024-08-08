<template>
	<view class="body">

		<uni-list v-for="(item,index) in messageList" :key="index">
			<view @click="openMessage(item.id)">
				<uni-list-item ellipsis="1" :title="item.content" :rightText="item.createdAt" showArrow
					:show-badge="item.isRead" badge-text="!" />
			</view>
		</uni-list>
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog type="success" cancelText="关闭" title="消息" :content="content"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				userId: null,
				content: '',
				messageList: [],
				stateData: {},
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId')
			this.getMassage(this.userId)
		},
		methods: {
			async getMassage(id) {
				const res = await my.getMessageList({
					userId: id
				})
				if (res.data.code === 200) {
					let dataArr = res.data.data
					let arr = dataArr.map(obj => {
						if (obj.state === '0') {
							obj.isRead = true
						} else if (obj.state === '1') {
							obj.isRead = false
						}
						const date = new Date(obj.createdAt);
						// 获取年月日
						const year = date.getFullYear();
						const month = (date.getMonth() + 1).toString().padStart(2, '0');
						const day = date.getDate().toString().padStart(2, '0');

						// 拼接成 yyyy-MM-dd 格式
						const formattedDate = `${year}-${month}-${day}`;
						obj.createdAt = formattedDate
						return obj;
					});
					this.messageList = arr
				}
			},
			async openMessage(id) {
				const res = await my.getMessage(id)
				if (res.data.code === 200) {
					this.content = res.data.data.content
					if (res.data.data.state === '0') {
						this.stateData.id = id
						this.stateData.userId = this.userId
						this.updateState(this.stateData)
					}
					this.$refs.popupDialog.open()
				}
			},

			async updateState(stateData) {
				const res = await my.updateState(stateData)
				if (res.data.code === 200) {

					this.getMassage(this.userId)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.body {
		margin-top: 10px;
	}

	.message {
		width: 200px;
		height: 200px;
		background-color: #fff;
	}
</style>
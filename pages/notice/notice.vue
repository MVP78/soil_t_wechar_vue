<template>
	<view>
		<!-- 顶部选项卡 -->
		<view class="tab-bar">
			<uni-segmented-control :current="currentTab" @clickItem="onClickItem" :values="tabOptions" styleType="text"
				activeColor="#01c22e" />
		</view>
		<!-- 公告列表 -->
		<view class="order-list">
			<!-- 公告 -->
			<view v-if="currentTab === 0 ">
				<uni-list v-for="(item,index) in noticeListData" :key="index">
					<view v-if="item.noticeType === '2'" @click="openNotice(item.noticeId)">
						<uni-list-item ellipsis="1" :title="item.noticeTitle" showArrow />
					</view>
				</uni-list>
			</view>
			<!-- 通知 -->
			<view v-if="currentTab === 1 ">
				<uni-list v-for="(item,index) in noticeListData" :key="index">
					<view v-if="item.noticeType === '1'" @click="openNotice(item.noticeId)">
						<uni-list-item ellipsis="1" :title="item.noticeTitle" showArrow />
					</view>
				</uni-list>
			</view>
		</view>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<uni-card :title="noticeData.noticeTitle" :extra="noticeData.createTime">
					<text class="uni-body">{{noticeData.noticeContent}}</text>
				</uni-card>
				<button class="close" @click="closePopup">关闭</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import my from '../../api/my.js'
	export default {
		data() {
			return {
				currentTab: 0,
				tabOptions: ['公告', '通知', ],
				noticeListData: [],
				noticeData: {},

			}
		},
		onShow() {
			this.getNoticeList()
		},
		methods: {
			onClickItem(e) {
				if (this.currentTab != e.currentIndex) {
					this.currentTab = e.currentIndex;
				}
			},
			async getNoticeList() {
				const res = await my.getNoticeList()
				if (res.data.code === 200) {
					this.noticeListData = res.data.data
				}
			},
			async openNotice(noticeId) {
				const res = await my.getNotice(noticeId)
				if (res.data.code === 200) {
					this.noticeData = res.data.data
					const date = new Date(res.data.data.createTime);

					// 获取年月日
					const year = date.getFullYear();
					const month = (date.getMonth() + 1).toString().padStart(2, '0');
					const day = date.getDate().toString().padStart(2, '0');

					// 拼接成 yyyy-MM-dd 格式
					const formattedDate = `${year}-${month}-${day}`;
					this.noticeData.createTime = formattedDate
					this.noticeData.noticeContent = this.noticeData.noticeContent.replace(/<[^>]+>/g, "");
					this.$refs.popup.open()
				}
			},
			closePopup() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.tab-bar {
		background-color: #fff;
		margin: 10px 0;
	}

	.popup-content {
		position: relative;
		width: 330px;
		height: 300px;
	}

	.close {
		position: absolute;
		display: inline-block;
		left: 114px;
		bottom: 10px;
		width: 100px;
		height: 40px;
		line-height: 40px;
	}
</style>
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<div>
			<childComponent></childComponent>
		</div>
		<button type="default" @click="gotoPage">点我去page2</button>
		<button type="primary" @click="gotoPage1('../page4/page4')">传递中文</button>
		<button type="warn" @click="gotoPage1('/pages/builtIn/builtIn')">点我去获取内置地址</button>
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @click="forceEach">微信小程序看到我，强制触发</button>
		<!-- #endif -->
		
		
		<button type="primary" @click="$Router.push({name:'nvue1'})">去nvue1测试页</button>
	</view>
</template>

<script>
	import childComponent from '../../common/com/com.vue'
	export default {
		components:{
			childComponent
		},
		data() {	
			return {
				title: 'Hello'
			}
		},
		onTabItemTap(){
			console.log('onTabItemTap')
		},
		created(){
			console.log('index-----created')
		},
		mounted(){
			console.log('index-----mounted')
		},
		onLoad() {
			console.log('index-----onload')
		},
		onShow() {
			console.log('index-----onShow')
		},
		methods: {
			forceEach(){
				this.$Router.forceGuardEach();
			},
			gotoPage1(url='/pages/page4/page4'){
				uni.navigateTo({
					url:`${url}?msg=的挥洒U盾好撒第三大厦发的撒321312*（￥#%4`,
					success:()=>{
						console.log('跳转成功')
					},
				})
			},
			gotoPage(){
				// this.$Router.push({
				// 	path:'/pages/404/404',
				// 	query:{
				// 		status:true,
				// 		list:[
				// 			{
				// 				id:1
				// 			},
				// 		]
				// 	}
				// })
				
				this.$Router.push({
					name:'page2',
					params:{
						id:6666
					}
				})
				
				// this.$Router.push({
				// 	success:()=>{
				// 		console.log('跳转成功')
				// 	},
				// 	complete:()=>{
				// 		console.log('跳转结束')
				// 	},
				// 	fail:()=>{
				// 		console.log('跳转失败')
				// 	},
				// 	name:'page2',
				// 	params:{
				// 		id:12
				// 	}
				// })
				// uni.navigateTo({
				// 	url:'/pages/navigate/navigate?id=555&name=hhyang',
				// 	success:()=>{
				// 		console.log('跳转成功')
				// 	},
				// })
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

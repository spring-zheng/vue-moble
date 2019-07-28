<template>
  <div class="app-container">
    <!-- 顶部，header区域 -->
    <mt-header fixed title="黑马程序员">
      <div slot="left" v-if="isShow">
        <mt-button icon="back" @click="prev">返回</mt-button>
      </div>
    </mt-header>

    <!-- 中间，路由区域 -->

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 footer区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
import mui from './lib/dist/js/mui.js'
	export default {
		data() {
			// 由于这里需要频繁的改变“返回键”的显示和隐藏，所以这里考虑用v-show， 	
			return {
				isShow: false,
			}
		},
		created() {	
			// 刷新页面时返回按钮不消失
			this.isShow = this.$route.path === '/home'? false : true
		},
		// 解决添加 图片分类的滚动条后出现的tabbar不能正常切换的问题
		mounted() {
    		mui("header, nav").on("tap", "a", function() {
      			mui.openWindow({url: this.href})
    		})
		},
		methods: {
			// 返回上一目录用到的是 this.$router.go(-1);
			prev(){
				this.$router.go(-1)
			}
		},
		// 当返回到首页时，将返回按钮隐藏掉，避免一直返回，
		// 触发isShow 的值改变的事件应该是当前页面路由地址的改变，并且这里需要使用watch完成监控：
		watch:{
  			$route( newval, oldval ){     //监控路由变换，控制返回按钮的显示
     			if(newval.path == "/home"){
            		this.isShow = false;
     			} else{
         			this.isShow = true;
     			}
			}
			
			
		}
	}

</script>
<style lang="css" scoped>
.mint-header {
  z-index: 999;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow: hidden;
  height: 100%;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mint-header {
	background-color: #5bc0de;
}
.mui-bar-tab .mui-tab-item.mui-active {
	color: #5bc0de;
}


/* 在解决添加 图片分类的滚动条后出现的tabbar不能正常切换的问题，可以采用修改mui-tab-item类名的方法，并且要把样式都重新写一遍，也可以采用上面script标签内的方法 */
/* .mui-bar-tab .mui-tab-item-aa {
		display: table-cell;
  		overflow: hidden;
  		width: 1%;
  		height: 50px;
  		text-align: center;
  		vertical-align: middle;
  		white-space: nowrap;
  		text-overflow: ellipsis;
  		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-aa .mui-icon {
    	top: 3px;
    	width: 24px;
    	height: 24px;
    	padding-top: 0;
    	padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-aa .mui-icon~.mui-tab-label {
    	font-size: 11px;
    	display: block;
    	overflow: hidden;
    	text-overflow: ellipsis;
	}
	.mui-bar-tab .mui-tab-item-aa.mui-active {
		color: #007aff;
	} */

	
</style>
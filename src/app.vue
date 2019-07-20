<template>
  <div class="app-container">
      <!-- 顶部，header区域 -->
      <mt-header fixed title="黑马程序员"></mt-header>



      <!-- 中间，路由区域 -->
   
		<transition>
			<router-view></router-view>
		</transition>
    


    <!-- 底部 footer区域 -->
    		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-aa" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-aa" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-aa" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"> <span class="mui-badge">0</span> </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-aa" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    
  </div>
</template>
<script>


</script>
<style lang="css" scoped>
    .app-container {
      padding-top: 40px;
	  padding-bottom: 50px;
      overflow-x: hidden;
    }
	
	.v-enter,
	.v-leave-to {
		opacity: 0;
	}

	.v-enter {
		transform: translateX(100%)
	}
	.v-leave-to {
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active {
		transition: all .5s ease;
	}

	.mui-bar-tab .mui-tab-item-aa {
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
	}


</style>
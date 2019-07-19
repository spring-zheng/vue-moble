<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lbtList" :key="item.id">
          <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 六宫格 -->
    <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../imsges/menu1.png" alt="">
		                    <div class="mui-media-body">Home</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../imsges/menu2.png" alt="">
		                    <div class="mui-media-body">Email</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../../imsges/menu3.png" alt="">
		                    <div class="mui-media-body">Chat</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../imsges/menu4.png" alt="">
		                    <div class="mui-media-body">location</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../../imsges/menu5.png" alt="">
		                    <div class="mui-media-body">Search</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../imsges/menu6.png" alt="">
		                    <div class="mui-media-body">Phone</div></a></li>

		        </ul> 
		</div>
  </div>
</template>

<script>

    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                lbtList: [],
            }
        },
        created() {
            this.getLBT();
        },
        methods: {
            getLBT() {
                this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(result => {
                    console.log(result)
                    if(result.body.status ===  0) {
                        this.lbtList = result.body.message;
                        Toast("图片加载成功~")
                    } else {{
                        Toast("图片加载失败~")
                    }}
                })
            }
        }
    }
</script>

<style>
    .mint-swipe {
        height: 200px;
    }
    .mint-swipe img {
        width: 100%;
        height: 100%;
    }
</style>
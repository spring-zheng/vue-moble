<template>
  <div class="app-content">
    <!-- 轮播图 -->
    <swiper :swipertList="lunbotuList" :isfull="true"></swiper>
    <!-- 六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../imsges/menu1.png" alt />
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photoList">
            <img src="../../imsges/menu2.png" alt />
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodsList">
            <img src="../../imsges/menu3.png" alt />
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../imsges/menu4.png" alt />
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../imsges/menu5.png" alt />
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <img src="../../imsges/menu6.png" alt />
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 引入轮播图组件
import swiper from "../subComponents/swiper.vue";

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLBT();
  },
  methods: {
    getLBT() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          // console.log(result);
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message;
            // Toast("图片加载成功~");
          } else {
            {
              Toast("图片加载失败~");
            }
          }
        });
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>
.mui-content > .mui-table-view:first-child {
  margin: 0;
}
.mui-table-view.mui-grid-view {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 img {
  width: 60px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
  padding: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>
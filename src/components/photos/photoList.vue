<template>
  <div>
    <!-- 图片分类 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active': '' ]"
            v-for="item in getphotos"
            :key="item.id" @tap="getPhotosList(item.id)">{{item.title}}</a>
            <!-- 这里使用的tap来添加事件，因为tap在手机调试时不会有bug，而click是有bug的 -->
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul class="photo-list">
       <router-link
         v-for="item in list"
         :key="item.id"
         :to="'/home/photoInfo/' + item.id"
         tag="li"
       >
       <!-- 以上标签中的tag指定将router-link渲染成什么标 -->
         <img v-lazy="item.img_url" />
         <div class="info">
           <h2 class="info-title">{{ item.title }}</h2>
           <div class="info-body">{{ item.zhaiyao }}</div>
         </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
import mui from "../../lib/dist/js/mui.js";
import { toast } from "mint-ui";
export default {
  data() {
    return {
      getphotos: [],
      list: []
    };
  },
  created() {
    this.getPhotos();
    this.getPhotosList(0) //页面一进来。默认显示全部图片
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    // 获取图片分类
    getPhotos() {
      this.$http.get("api/getimgcategory").then(res => {
        // console.log(res)
        if (res.body.status === 0) {
          // 因为在后端请求回来的数据里面没有"全部"这一项，需要手动使用数组的unshift方法添加到res.body.message中，然后再将整个数组赋值给getphotos数组
          res.body.message.unshift({ title: "全部", id: 0 });
          this.getphotos = res.body.message;
        } else {
          toast("分类获取失败~");
        }
      });
    },

    // 获取图片列表
    getPhotosList(listId) {
      this.$http.get('api/getimages/' + listId).then(res => {
        // console.log(res);
        if(res.body.status == 0) {
          this.list = res.body.message
        } else {
          toast("图片加载失败~");
        }
      })
    }
  }
};
</script>

<style scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}

.photo-list li {
  width: 100%;
  margin: 0 auto 10px;
  text-align: center;
  box-shadow: 0 0 8px #999;
  position: relative;
  overflow: hidden;
}
.photo-list img {
  width: 100%;
  vertical-align: middle;
}
.photo-list img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list .info {
  color: #fff;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 84px;
}
.photo-list .info .info-title {
  font-size: 14px;
}
.photo-list .info .info-body {
  font-size: 10px;
  padding: 0 5px;
  font-family: "微软雅黑";
}

</style>
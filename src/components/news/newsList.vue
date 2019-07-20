<template>
  <div>
    <ul class="mui-table-view" v-for="item in newsList" :key="item.id">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsInfo/' + item.id" class>
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class="mui-ellipsis">
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {  toast } from 'mint-ui';
export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get("api/getnewslist").then(res => {
                // console.log(res);            
                if(res.body.status === 0) {
                    this.newsList = res.body.message
                } else {
                    toast("加载失败~")
                }
            })
        }
    }
};
</script>

<style scoped>
    .mui-table-view h3 {
        font-size: 14px;
        color: #666;
    }
    .mui-table-view p {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: #26a2ff;
    }
</style>


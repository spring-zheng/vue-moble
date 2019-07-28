<template>
  <div>
    <mt-swipe :auto="4000">
        <!-- 这里的swipertList与props中的属性相同，是通过父组件属性传过来的值 -->
      <mt-swipe-item v-for="item in swipertList" :key="item.id">
        <img :src="item.img" :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    // 轮播图需要用到父组件像子组件传值，并且是属性传值，这里是子组件中的接收父组件传值的属性，并将此属性用到组件中的循环中
    props: ["swipertList", "isfull"] 
};
</script>

<style  scoped>
    .mint-swipe {
      height: 200px;
      text-align: center;
    }
    .mint-swipe img {
      /* width: 100%; */
      height: 100%;
    }
    .full {
      width: 100%;
    }
</style>
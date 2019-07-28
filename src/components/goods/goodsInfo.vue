<template>
    <div class="goodsinfo-container">
        <!-- 加入到购物车时出现的小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品 图片轮播 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swipertList="lunbotuList" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：
                        <span class="now_price">￥{{ goodsInfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量：
                        <numbox @getcount="getCount" :max="goodsInfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                        <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
                        <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的          商品数量值-->
                        <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                        <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方          法 -->
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }} 件</p>
                    <p>上架时间: {{ goodsInfo.add_time }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getGoodsDesc(goodsInfo.id)">图文 介绍 </mt-button>
                <mt-button type="danger" size="large" plain @click="getGoodsCommtens(goodsInfo.id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../subComponents/swiper.vue";

import numbox from "../subComponents/goodsInfo-numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: {},
      ballFlag: false,
      selectcount: 1 //保存用户选择的商品数量。默认为1
    };
  },
  created() {
    this.getLBT();
    this.getGoodsInfo();
  },
  methods: {
    getLBT() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result);
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.goodsInfo = res.body.message[0];
        }
      });
    },
    getGoodsDesc(id) {
      this.$router.push({ name: "goodsDesc", params: { id } });
    },
    getGoodsCommtens(id) {
      this.$router.push({ name: "goodsComments", params: { id } });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
       // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      let goodsinfo = {
        id: this.id,
        count: this.selectcount,
        price: this.goodsInfo.sell_price,
        selected: true
      };
      
      this.$store.commit("addToCar", goodsinfo )
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计 算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差，x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 使用domObject.getBoundingClientRect()获取元素在页面中的位置

      // 小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      // 购物车徽标的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .6s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getCount(count) {
        this.selectcount = count;
        console.log(this.selectcount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style  scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
.now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 15px 0;
}
.ball {
  position: absolute;
  top: 390px;
  left: 150px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  z-index:999;
}
</style>
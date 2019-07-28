<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <ul id="OA_task_1" class="mui-table-view">
            <li class="mui-table-view-cell">
              <div class="mui-slider-right mui-disabled">
                <a class="mui-btn mui-btn-red">删除</a>
              </div>
              <div class="mui-slider-handle">
                <div class="mui-card-content-inner">
                  <mt-switch></mt-switch>
                  <img :src="item.thumb_path" />
                  <div class="info">
                    <h1>{{ item.title }}</h1>
                    <p>
                      <span class="price">￥{{ item.sell_price }}</span>
                      <numbox></numbox>
                      <!-- 问题：如何从购物车中获取商品的数量呢 -->
                      <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 结算区 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">5</span> 件， 总价
              <span class="red">￥8889</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subComponents/goodsInfo-numbox.vue";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getCarList();
  },
  methods: {
    getCarList() {
      // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
      let idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));

      // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length < 0) return;

      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(res => {
          // console.log(res);
          if (res.body.status == 0) {
            this.goodslist = res.body.message;
          }
        });
    }
  },
  components: {
    numbox
  }
};
</script>

<style scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  height: 100%;
}

.goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
  padding: 0px;
}
.shopcar-container .goods-list img {
  width: 60px;
  margin-left: 12px;
}
.shopcar-container .goods-list h1 {
  font-size: 13px;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shopcar-container .goods-list .info {
  width: 60%;
  margin-left: 18px ;
}
.shopcar-container .goods-list .price {
  color: red;
  font-weight: bold;
  margin-right: 5px;
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jiesuan .red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.shopcar-container .mui-numbox {
  height: 25px;
  /* padding-left: 30px;
  padding-right: 30px; */
}
.goods-list .info span {
    display: flex;
    flex-direction: column;
    padding:  6px;

}
/* .shopcar-container .mui-numbox [class*="btn-numbox"],
.shopcar-container .mui-numbox [class*="numbox-btn"] {
  width: 30px !important;
} */
</style>
<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @tap="getDetail(item.id)">
      <img
        :src="item.img_url"
        alt
      />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
   <mt-button type="danger" size="large" @click="getMore" v-show="flag = flag">加载更多</mt-button>
  </div>
</template>

<script>
    import { toast } from 'mint-ui'
    export default {
      data() {
        return {
          pageIndex: 1,
          goodsList: [],
          flag : true
        }
      },
      created() {
        this.getGoodsList();
      },
      methods: {
        getGoodsList() {
          this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(res => {
            // console.log(res);
            if(res.body.status == 0) {
              this.goodsList = this.goodsList.concat(res.body.message);
            } else {
              toast('加载失败~')
            }
            if(res.body.message.length < 10) {
              this.flag = false;
            }
          }) 
        }, 
        getMore() {
          this.pageIndex ++;
          this.getGoodsList()
        },
        getDetail(id) {
          // 1.0 从列表页的商品信息，跳转到对应的详情页
          this.$router.push({ name: 'goodsInfo', params:{id: id}})
        }
      }
    }

</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
}
.goods-list .goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  margin: 4px 0;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 293px;
}
.goods-list .goods-item img {
  width: 100%;
}
.goods-list .goods-item .title {
  font-size: 14px;
}

.goods-list .goods-item .info {
  background-color: #eee;
}
.goods-list .goods-item p {
  margin: 0;
  padding: 5px;
}
.goods-item .price .now {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.goods-item .price .old {
  text-decoration: line-through;
  font-size: 12px;
  margin-left: 10px;
}
.goods-item .sell {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
</style>


<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr />

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.info = res.body.message[0];
        }
      });
    }
  }
};
</script>

<style>
    .goodsdesc-container {
        padding: 5px;
        /* width: 100%; */
    }
    .goodsdesc-container h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    
    .goodsdesc-container .content .gomeImgLoad {
        width: 100%;
        margin: 0;
    }
    .content p {
        text-indent: 0;
    }
    .content p:first-child {
        text-indent: 2em;
    }
    .content p:last-child {
        margin: 0 5px;
    }

</style>
<template>
    <div class="newsInfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subTitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content">
        </div>

        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
    import comment from '../subComponents/comment.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                // 将$route.params.id挂载到this身上，方便后面的调用，$route.params是为了获取对应新闻资讯的列表id
                newsinfo: {},
            }
        },
        created() {
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo() {
                this.$http.get('api/getnew/' + this.id).then(res => {
                    // console.log(res);
                    if(res.body.status == 0) {
                        this.newsinfo = res.body.message[0];
                    } else {
                        toast("加载失败")
                    }
                })
            }
        },
        components: {
            // 用来注册子组件的节点
            "comment-box": comment,
        }

    }

</script>

<style >
    .newsInfo-container {
        padding: 0 15px;
        
    }
    .newsInfo-container>.title {
        font-size: 16px;
        text-align: center;
        color: #333;
        padding-top: 5px;
    }
    .newsInfo-container>.subTitle {
        text-align: center;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #26a2ff;
        margin: 10px 10px 0 10px;
    }
    .content p {
        font-size: 12px;
        margin-top: 0;
        margin-bottom: 10px;
        color: #333;
        text-indent: 1em;
    }
</style>

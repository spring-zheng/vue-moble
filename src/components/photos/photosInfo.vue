<template>
    <div class="photoInfo-container">
        <h3>标题</h3>
        <p class="subtitle">
            <span>发表时间：{{ PhotoInfo.add_time | dateFormat }}</span>
            <span>点击： {{ PhotoInfo.click }}次</span>
        </p>

        <hr>
        <!-- 缩略图 -->
        <div class="thumimg-box">
        <!--预览-->
        <!-- :slides="thumimgs" 后面存的是数组图片 -->
            <vue-preview :slides="thumimgs" class="preview"></vue-preview>
        </div>

        <!-- 描述 -->
        <div class="content" v-html="PhotoInfo.content"></div>
        <!-- 放置以设置好的评论子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import comment from '../subComponents/comment.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                PhotoInfo: {},
                thumimgs: []
            }
        },
        created() {
            this.getPhotoInfo();
            this.getThumimgs()
        },
        methods: {
            getPhotoInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then(res  => {
                    // console.log(res)
                    if(res.body.status == 0) {
                        this.PhotoInfo = res.body.message[0]
                    }
                })
            },

            // 缩略图
            getThumimgs() {
                this.$http.get('api/getthumimages/' + this.id).then(res => {
                    // console.log(res)
                    if(res.body.status == 0) {
                        res.body.message.forEach(img => {
                            img.msrc = img.src;
                            img.w = 400;//这是大图的宽
                            img.h = 400;
                        });
                        this.thumimgs = res.body.message;
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
    .photoInfo-container {
        margin: 15px;
    }
    .photoInfo-container .subtitle {
        display: flex;
        justify-content: space-between;
    }

    .photoInfo-container .content {
        text-indent: 2em;
        font-size: 14px;
        line-height: 25px;
    }

    .thumimg-box {
        overflow: hidden;
    }
    .preview figure {
        float: left;
        width: 30%;
        height:calc(30vw - 0px);
        margin: 1.5%;
    }

    .preview figure img {
        width: 100%;
    }
</style>
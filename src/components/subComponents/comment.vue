<template>
  <div class="cmt-container">
      <!-- <hr /> -->
    <h3>评论专区</h3>
    
    <textarea name placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
    <div id="button">
        <mt-button type="primary" size="small" @click="postComments" class="mui-pull-right">发表评论</mt-button>
    </div>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in comments" :key="i">
            <div class="cmt-title">
                第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
            <div class="cmt-body">
                {{ item.content == 'undefined' ? '此用户很懒，嘛都没说': item.content }}
            </div>
        </div>
    </div>
    <div class="getMore">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click="getMore">加载更多</button>
    </div>
  </div>
</template>
<script>
    import { toast } from 'mint-ui'

    export default {
        data() {
            return {
                pageIndex: 1, // 默认展示第一页数据
                comments: [],
                msg: ""
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
                this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                .then( res => {
                    // console.log(res.body)
                    if(res.body.status === 0) {
                        // this.comments = res.body.message;
                        // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                        this.comments = this.comments.concat(res.body.message)
                    } else {
                        toast("加载失败")
                    }
                })
            },
            getMore() {
                this.pageIndex++;
                this.getComments()
            },
            postComments(){
                this.$http.post('api/postcomment/' + this.$route.params.id , {content: this.msg.trim()})
                .then(res => {
                    if(res.body.status == 0) {
                        let cmt = {
                            user_name: "匿名",
                            add_time: Date.now(),
                            content: this.msg.trim()
                        }
                        this.comments.unshift(cmt);
                        this.msg = ""
                    }
                })
            }
        },
        props: ['id'],
    };

</script>

<style scoped>
    .cmt-container h3 {
        font-size: 16px;
        /* font-weight: normal; */
        margin-top: 15px;
    }

    .cmt-container textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }   

    .cmt-container .cmt-list {
        margin: 5px 0;
    }
    .cmt-container .cmt-item {
        font-size: 12px;
        color: #666;
    }
    .cmt-container .cmt-title {
        line-height: 30px;
        border-bottom: 1px solid #eee;
        
    }   
    .cmt-container .cmt-body {
        line-height: 35px;
        text-indent: 2em;
    }
    .cmt-container #button {
        height: 50px;
    }
    .mui-btn-blue, .mui-btn-primary, input {
        width: 100%;
    }
</style>

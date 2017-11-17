<template>
    <div class='article-comment-field'>
        <div class='article-post'>
            <br v-if='comments.length == 0' />
            <button class='btn btn-default' v-if='(!hidePost && $store.state.isLogin)' @click='hidePost = !hidePost'>Comment</button>
            <Result-View class='pull-right' ref='resultView'></Result-View>
            <Edit-Post v-show='hidePost' style='width:100%' :preLoads='editLoads'>
                <div class='row'>
                    <div class='col-md-12'>
                        <input class='form-control margintopmedium' placeholder="Enter link to source or further reading" v-model='replyLink' />
                    </div>
                </div>
            </Edit-Post>
        </div>
        <div class='article-comment-title'>
            <span class='h4'>Comments</span>
        </div>
        <div class='article-comments' v-for='(comment,index) in comments' v-bind:data='(comment,index)'' v-bind:key='(comment,index).text'>
            <div>
                <a class='pull-right' @click='remove(comment._id)' v-if='$store.state.isLogin' title='Delete comment'><i class='fa fa-times'></i></a>
                <h3>{{comment.title}}</h3>
            </div>
            <h6>
                <i class='fa fa-user marginrightsmall'></i><span v-html='$scms.showReplierAnchor(comment.fullname, comment.uniqnameslug)'></span>
                <i class='fa fa-calendar marginleftmedium marginrightsmall'></i>
                {{$scms.showDate(comment._id)}}
                <i class='fa fa-clock-o marginleftmedium marginrightsmall'></i>
                {{$scms.showTime(comment._id)}}
                <a href='javascript:void(0)' v-if='$store.state.isLogin' @click='star(comment._id,index)'></a><i class="fa fa-star-o marginleftmedium marginrightsmall"></i>{{comment.stars.num}}
            </h6>
            <div class='article-comment-content' v-html='$scms.toFullHtml(comment.content)'></div>
            <div class='article-comment-content' v-if='$scms.showSourceLink(comment.sourcelink != undefined ? comment.sourcelink : "") !=""' v-html='$scms.showSourceLink(comment.sourcelink != undefined ? comment.sourcelink : "")'></div>
            <div>
                <button class='btn btn-default btn-sm marginrightsmall' v-if='$store.state.isLogin' @click='star(comment._id,index)'>{{ !comment.stars.starred ? "Star":"Unstar"}}</button>
                <span class="dropdown">
                    <button class='btn btn-default btn-sm' v-if='$store.state.isLogin' @click='toggleReply(index)'>Reply</button>
                    <div class="dropdown-menu" style='padding:0;width:500px;'>
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" @click='toggleReply(index)'>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="modal-title">Short reply to comment by {{comment.fullname}}</h5>

                            </div>
                            <div class="modal-body">
                                <input class='form-control' placeholder="For more options: Write a full comment" v-model='replyContent' />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click='reply(comment._id)'>Publish</button>
                                <button type="button" class="btn btn-secondary" @click='toggleReply(index)'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </span>
            </div><br />
            <div class='article-subcomments' v-for='(sub,subid) in comment.comments' v-bind:data='(sub,subid)' v-bind:key='(sub,subid).text'>
                <div class='article-subcomment'>
                    <h6>
                        <a class='pull-right' @click='removeSub(comment._id,subid)' v-if='$store.state.isLogin' title='Delete sub-comment'><i class='fa fa-times'></i></a>
                        <i class='fa fa-user marginrightsmall'></i><span v-html='$scms.showReplierAnchor(sub.fullname, sub.uniqnameslug)'></span>
                        <i class='fa fa-calendar marginleftmedium marginrightsmall'></i>
                        {{$scms.showDate(subid)}}
                        <i class='fa fa-clock-o marginleftmedium marginrightsmall'></i>{{$scms.showTime(subid)}}
                        <a href='javascript:void(0)' v-if='$store.state.isLogin' @click='replystar(comment._id,index,subid)'><i class='fa fa-star-o marginleftmedium marginrightsmall'></i>{{sub.stars.num}}</a>
                    </h6>
                    <div class='article-comment-content'>{{sub.content}}</div>
                    <div>
                    <button class='btn btn-default btn-sm' v-if='$store.state.isLogin' @click='replystar(comment._id,index,subid)'>{{ !sub.stars.starred ? "Star":"Unstar"}}</button>&nbsp;&nbsp;
                    </div><br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data(){
            return{
                hidePost:false,
                editLoads:{
                    hasCategory:false,
                    submit:this.submit,
                    cancel:this.cancel
                },
                replyContent:"",
                replyLink:"",
            }
        },
        props:[
            'comments'
        ],
        methods:{
            submit(data,onResult){
                const sourcelink = this.replyLink;
                const username = this.$store.state.user.username;
                const usermail = this.$store.state.user.email;
                const userlg = this.$store.state.user.lg;
                const fullname = this.$store.state.user.fullname;
                const fullnameslug = this.$store.state.user.fullnameslug;
                const uniqnameslug = this.$store.state.user.fullnameslug + "-" + this.$store.state.user.username;
                let postData = data;
                postData.id = this.$parent.article._id;
                postData.sourcelink = sourcelink;
                postData.username = username;
                postData.usermail = usermail;
                postData.userlg = userlg;
                postData.fullname = fullname;
                postData.fullnameslug = fullnameslug;
                postData.uniqnameslug = uniqnameslug;

                $.ajax({
                    url: `/post/${postData.id}/comments`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: result => {
                        location.reload();
                    },
                    error: err => {
                        onResult(err.responseJSON.content,"error");
                    }
                });
            },
            cancel(){
                this.hidePost = !this.hidePost;
            },
            remove(id){
                this.$parent.$refs.confirmView.getAction("Whether to delete the comment?",function() {
                    $.ajax({
                        url: `/post/${this.$parent.article._id}/comments/${id}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            this.$parent.$refs.confirmView.onResult(err.responseJSON.content,"error");
                        }      
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            showDate(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
                const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
                const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();

                return [year,month,day].join('/')
            },
            showTime(id){
                const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
                
                return [date.getHours(),date.getMinutes(),date.getSeconds()].join(":")
            },
            removeSub(id,subid){
                this.$parent.$refs.confirmView.getAction("Do you want to delete sub comment?",function() {
                    $.ajax({
                        url: `/post/${this.$parent.article._id}/comments/${id}/subcomments/${subid}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            this.$parent.$refs.confirmView.onResult(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            reply(id){
                const sourcelink = this.replyLink;
                const username = this.$store.state.user.username;
                const usermail = this.$store.state.user.email;
                const userlg = this.$store.state.user.lg;
                const fullname = this.$store.state.user.fullname;
                const fullnameslug = this.$store.state.user.fullnameslug;
                const uniqnameslug = this.$store.state.user.fullnameslug + "-" + this.$store.state.user.username;
                const postData = {
                    id,
                    username,
                    usermail,
                    userlg,
                    fullname,
                    fullnameslug,
                    uniqnameslug,
                    sourcelink,
                    content:this.replyContent
                }

                $.ajax({
                    url: `/post/${this.$parent.article._id}/comments/${id}/`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: result => {
                        location.reload();
                    },
                    error: err =>{
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            },
            toggleReply(index){
                $(".dropdown-menu").eq(index+2).toggle();
            },
            star(id,index){
                $.ajax({
                    url: `/post/${this.$parent.article._id}/comments/${id}/stars`,
                    type:'PUT',
                    contentType: "application/json",
                    success: (result)=>{
                        if (this.$parent.article.comments[index].stars.starred){
                            this.$refs.resultView.sendMsg("Unstarred","success");
                            this.$parent.article.comments[index].stars.num -= 1;
                        }else{
                            this.$refs.resultView.sendMsg("Starred","success");
                            this.$parent.article.comments[index].stars.num += 1;
                        }
                        this.$parent.article.comments[index].stars.starred = !this.$parent.article.comments[index].stars.starred;
                    },
                    error: err =>{
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            },
            replystar(commentid,index,subcommentid){
                $.ajax({
                    url: `/post/${this.$parent.article._id}/comments/${commentid}/subcomments/${subcommentid}/stars`,
                    type:'PUT',
                    contentType: "application/json",
                    success: (result)=>{
                        if (this.$parent.article.comments[index].comments[subcommentid].stars.starred){
                            this.$parent.article.comments[index].comments[subcommentid].stars.num -= 1;
                        }else{
                            this.$parent.article.comments[index].comments[subcommentid].stars.num += 1;
                        }
                        this.$parent.article.comments[index].comments[subcommentid].stars.starred = !this.$parent.article.comments[index].comments[subcommentid].stars.starred;
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            }
        },
        components:{
            EditPost,
            ResultView
        }
    }
</script>
<template>
    <div>
        <table class="table table-striped"> 
            <thead>
                <tr>
                    <th>Article title</th>
                    <th>Article date</th>
                    <th>Website</th>
                    <th class='text-center'>Number of hits</th>
                    <th class='text-center'>Number of comments</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='(article,index) in articles.currentArticles' v-bind:data='(article,index)' v-bind:key='(article,index).text'>
                    <th><a href='javascript:void(0)' @click='modify(index)'>{{$scms.showShortTitle(article.title,20)}}</a></th>
                    <th>{{$scms.showDate(article._id)}} | {{$scms.showTime(article._id)}}</th>
                    <th>{{article.category}}</th>
                    <th class='text-center'>{{article.hits}}</th>
                    <th class='text-center'><a href='javascript:void(0)' @click='modify(index,"comments")'>{{ $scms.showCommentNumber(article.comments) }}</a></th>
                    <th class='text-center'><a href='javascript:void(0)'  @click='modify(index,"article")'>Edit</a></th>
                    <th class='text-center'><a href='javascript:void(0)'  @click='deleteArticle(index)'>Delete</a></th>
                </tr>
            </tbody>
        </table>
        <div>
            <ul class="pagination" style='margin:0 auto;'>
                <li v-if='articles.hasFst' @click='toFirst'><a href="javascript:void(0)" class='fa fa-angle-double-left'></a></li>
                <li v-if='articles.hasLast' @click='lastPage'><a href="javascript:void(0)" class='fa fa-angle-left'></a></li>
                <li><span href="javascript:void(0)" style='color:#069;'>This is page {{$route.params.pgNum}}</span></li>
                <li v-if='articles.hasNxt' @click='nxtPage'><a href="javascript:void(0)" class='fa fa-angle-right'></a></li>
                <li v-if='articles.hasLst' @click='toLast'><a href="javascript:void(0)" class='fa fa-angle-double-right'></a></li>
            </ul>
        </div><br />
        <Modal-View ref='modalView'>
            <div class='scms-modal-body'>
                <ul class="nav nav-tabs">
                    <li :class='{active:showArticle}'>
                        <a href='javascript:void(0)' @click='enableArticle'>Article content</a>
                    </li>
                    <li :class='{active:showComments}'>
                        <a href='javascript:void(0)' @click='enableComments' v-if='this.editLoads.article !== undefined'>Comment</a>
                    </li>
                </ul>
                <Edit-Post :preLoads='editLoads' v-if='showArticle'>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" v-model='modifyingArticle.allowcomments'/>Allow comment
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                            <input type="checkbox" v-model='modifyingArticle.allowsubcomments'/>Allow sub comment
                        </label>
                    </div>
                </Edit-Post>
                <div v-if='showComments'>
                    <div class='container-fluid'>
                        <table class='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th class='text-center'>Content</th>
                                    <th class='text-center'>Number of stars</th>
                                    <th class='text-center'>Sub comment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='(comment,index) in modifyingArticleComments.comments' v-bind:data='(comment,index)' v-bind:key='(comment,index).text'>
                                    <th>{{ $scms.showShortTitle(comment.title,5) }}</th>
                                    <th class='text-center'>
                                        <div class="dropdown">
                                            <a href='javascript:void(0)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class='fa fa-info-circle'></i></a>
                                            <div class='dropdown-menu'>
                                                <div class='container-fluid'>
                                                    <div v-html='$scms.toFullHtml(comment.content)'></div>
                                                </div>
                                            </div>
                                        </div>     
                                    </th>
                                    <th class='text-center'>{{ comment.stars.num }}</th>
                                    <th class='text-center'>
                                        <div class="dropdown" v-if='Object.keys(comment.comments).length > 0'>
                                            <a href='javascript:void(0)' @click='openSub(index)'>{{ Object.keys(comment.comments).length }}</a>
                                            <div class='dropdown-menu' style='width:400px;' :id='"comment" + index.toString()'>
                                                <div class="modal-header">
                                                    <span>Sub commentary</span>
                                                    <button type="button" class="close" @click='closeSub(index)'>
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <table class='table table-striped'>
                                                        <thead>
                                                            <tr>
                                                                <th class='text-center'>Content</th>
                                                                <th class='text-center'>Number of stars</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for='(sub,subid) in comment.comments' v-bind:data='(sub,subid)' v-bind:key='(sub,subid).text'>
                                                                <th class='text-center'>
                                                                    <div class="dropdown">
                                                                        <a href='javascript:void(0)' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class='fa fa-info-circle'></i></a>
                                                                        <div class='dropdown-menu'>
                                                                            <div class='container-fluid'>
                                                                                <div v-html='$scms.toFullHtml(sub.content)'></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>     
                                                                </th>
                                                                <th class='text-center'>{{ sub.stars.num }}</th>
                                                                <th class='text-center'><a href='javascript:void(0)' @click='deleteSubComment(comment._id,subid)'>Delete</a></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary" @click='closeSub(index)'>OK</button>
                                                    <button class='btn btn-danger' @click='clearSubComments(comment._id)'>Empty comments</button>
                                                </div>
                                            </div>
                                        </div> 
                                        <span v-else>0</span>
                                    </th>
                                    <th class='text-center'><a href='javascript:void(0)' @click='deleteComment(comment._id)'>Delete</a></th>
                                </tr>
                            </tbody>
                        </table>
                        <div class='pull-right'>
                            <button class='btn btn-danger' @click='clearComments'>Empty comments</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal-View>
        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' @click='add'>Add an article</button>&nbsp;&nbsp;
            </span>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>


<script>

    import ModalView from "~components/minorcomponents/scmsmodal.vue";
    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ResultView from "~components/minorcomponents/resultview.vue";
    import ConfirmView from "~components/minorcomponents/confirmview.vue";

    export default {
        async data({req,route,store}){
            if (req){
                return {
                    articles:req.preLoad.articles,
                    editLoads:{
                        hasCategory:true,
                        categoryList:store.state.postCategories,
                        documenttypeList:store.state.postDocumenttypes,
                        languageList:store.state.postLanguages
                    },
                    modifyingArticle:{
                        allowcomments:true,
                        allowsubcomments:true
                    },
                    modifyingArticleComments:{
                        comments:[]
                    },
                    showArticle:true,
                    showComments:false
                }
            }else{
                const {result} = await $.get(`/admin/articles/pages/${route.params.pgNum}/client`);
                return {
                    articles:result,
                    editLoads:{
                        hasCategory:true,
                        categoryList:store.state.postCategories,
                        documenttypeList:store.state.postDocumenttypes,
                        languageList:store.state.postLanguages
                    },
                    modifyingArticle:{},
                    modifyingArticleComments:{
                        comments:[]
                    },
                    showArticle:true,
                    showComments:false
                }
            }
        },
        created(){
            this.editLoads.submit = this.save;
            this.editLoads.cancel = this.cancel;
        },
        methods:{
            enableArticle(){
                this.showArticle = true;
                this.showComments = false;
            },
            enableComments(index){
                this.modifyingArticleComments = {
                    comments:this.editLoads.article.comments
                };
                this.showArticle = false;
                this.showComments = true;                
            },
            modify(index,modifyType){
                this.$refs.modalView.toggle();
                this.editLoads.article = this.articles.currentArticles[index];
                if (modifyType == "comments"){
                    this.showArticle = false;
                    this.showComments = true;
                    this.modifyingArticleComments = {
                        comments:this.articles.currentArticles[index].comments
                    }
                }else{
                    //modify article content
                    this.showArticle = true;
                    this.modifyingArticle = {
                        id:this.articles.currentArticles[index]._id,
                        allowcomments:this.articles.currentArticles[index].allowcomments,
                        allowsubcomments:this.articles.currentArticles[index].allowsubcomments
                    }
                }
            },
            cancel(){
                this.$refs.modalView.toggle();
            },
            add(){
                this.editLoads = {
                    hasCategory:true,
                    documenttypeList:this.$store.state.postDocumenttypes,
                    categoryList:this.$store.state.postCategories,
                    languageList:this.$store.state.postLanguages,
                    submit:this.addArticle,
                    cancel:this.cancel
                }
                this.modifyingArticle = {
                    allowcomments:true,
                    allowsubcomments:true
                }
                this.showArticle = true;
                this.showComments = false;
                this.$refs.modalView.toggle();

            },
            addArticle(data,onResult){
                const postData = Object.assign(data,this.modifyingArticle);

                $.ajax({
                    url: `/post/`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        location.reload();
                    },
                    error: err => {
                        this.$refs.modalView.toggle();
                        this.$refs.resultView.sendMsg(result.content,"error");                        
                    }
                });
            },
            save(data) {

                const postData = Object.assign(data,this.modifyingArticle);

                $.ajax({
                    url: `/post/`,
                    type:'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        this.$refs.modalView.toggle();
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(result.content,"error");
                    }
                });
            },  
            deleteArticle(index){
                const sendMsg = this.$refs.resultView.sendMsg;
                const id = this.articles.currentArticles[index]._id;
                this.$refs.confirmView.getAction("Whether to delete the article?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }               
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            toFirst(){
                window.scrollTo(0,0);
                this.$emit('switch',1);
            },
            lastPage(){
                window.scrollTo(0,0);
                const newPg = Number(this.pg) - 1;
                this.$emit('switch',newPg);                
            },
            nxtPage(){
                window.scrollTo(0,0);
                const newPg = Number(this.pg) + 1;
                this.$emit('switch',newPg);
            },
            toLast(){
                window.scrollTo(0,0);
                this.$emit('switch',this.data.lastPg);
            },
            toTop(){
                window.scrollTo(0,0);
            },
            deleteComment(id){
                const sendMsg = this.$refs.resultView.sendMsg;
                const _id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("Whether to delete the comment?",() => {
                    $.ajax({
                        url: `/post/${_id}/comments/${id}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }      
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            deleteSubComment(id,subid){
                const sendMsg = this.$refs.resultView.sendMsg;
                const _id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("Do you want to delete sub comment?", () => {
                    $.ajax({
                        url: `/post/${_id}/comments/${id}/subcomments/${subid}`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            openSub(index){
                $(`#comment${index}`).show();
            },
            closeSub(index){
                $(`#comment${index}`).hide();
            },
            clearSubComments(commentid){
                const sendMsg = this.$refs.resultView.sendMsg;
                const id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("Did you empty the comment in the comment?", () => {
                    $.ajax({
                        url: `/post/${id}/all/comments/${commentid}/subcomments/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            clearComments(){
                const sendMsg = this.$refs.resultView.sendMsg;
                const id = this.editLoads.article._id;
                this.$refs.confirmView.getAction("Did you empty the comment in that article?", () => {
                    $.ajax({
                        url: `/post/${id}/all/comments/`,
                        type:'DELETE',
                        success: result => {
                            location.reload();
                        },
                        error: err => {
                            sendMsg(err.responseJSON.content,"error");
                        }              
                    });
                });
                $("#confirmMsg").modal('toggle');
            }
        },
        components:{
            ModalView,
            EditPost,
            ResultView,
            ConfirmView
        }
    }
</script>
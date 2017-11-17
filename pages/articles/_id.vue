<template>
    <div class='panel panel-default mevn-content'>
        <div class='panel-body'>
            <div class='panel panel-info'>
                <div class='panel-body'>
                    <div v-if='!isEditing'>
                        <br />
                        <div class='article-title'>
                            <b>{{article.title}}</b>
                        </div>
                        <div class='article-info'>
                            <span v-html="articleAuthor"></span><br />
                            <span><i class='fa fa-folder-open-o'></i>&nbsp; <a v-bind:href="catLink">{{ article.category }}</a></span><br />
                            <span v-show="articleTags !== ''" v-html="articleTagsLinks"></span>
                            <span><i class='fa fa-calendar'></i>&nbsp; <a href='javascript:void(0)'>{{ $scms.showDate(article._id) }}</a></span><br />
                            <span><i class='fa fa-clock-o'></i>&nbsp; {{ $scms.showTime(article._id) }}</span>
                            <span><i class='fa fa-eye'></i>&nbsp; {{ article.hits }}</span>
                        </div>
                        <div class='article-content' v-html='$scms.toFullHtml(article.content)'></div>
                        <div class='article-content' v-if='article.sourcelink !== ""' v-html="articleSource"></div>
                    </div>
                    <div class='article-content' v-if='isEditing' style='padding:0'>
                        <Edit-Post :preLoads='editLoads'>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model='article.allowcomments'/>Allow comment
                                </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <label>
                                    <input type="checkbox" v-model='article.allowsubcomments'/>Allow sub comment
                                </label>
                            </div>
                        </Edit-Post>
                    </div><br />
                    <div class='article-btns'>
                        <div class='article-btns-right pull-right'>
                            <span v-if='$store.state.isLogin && ($store.state.user.username == article.username || $store.state.user.usertype == 1)'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='modify article from id'><i class='fa fa-edit' @click='editorModify'></i></a></span>
                            <span v-if='$store.state.isLogin && $store.state.user.usertype == 1'>&nbsp; &nbsp;&nbsp;<a class='article-btns-right-a' title='Delete the article'><i class='fa fa-trash' @click='deleteArticle(article._id)'></i></a></span>
                            <span class="marginleftmedium marginrightsmall"><i class="fa fa-share-alt" style="font-size:16px;"></i></span><span v-html="shareFacebook" class="marginrightsmall"></span><span v-html="shareTwitter" class="marginleftsmall marginrightsmall"></span><span v-html="shareGoogleplus" class="marginleftsmall marginrightsmall"></span><span v-html="shareReddit" class="marginleftsmall marginrightsmall"></span><span v-html="shareHackernews" class="marginleftsmall marginrightsmall"></span><span v-html="shareLinkedin" class="marginleftsmall"></span>
                       </div>
                    </div><br />
                    <Comments :comments='article.comments'></Comments>
                    <br />
                    <div class='article-lastandnext'>
                        <span>&nbsp;
                            <nuxt-link v-if='lastArticle != "No Result"' :to="{path:`/articles/${lastArticle._id}`}" active-class='admin-sidebar-active'><i class='fa fa-chevron-left'></i>&nbsp; {{$scms.showShortTitle(lastArticle.title,10)}}</nuxt-link>
                        </span>
                        <span>
                            <nuxt-link :to="{path:`/articles/${nextArticle._id}`}" active-class='admin-sidebar-active' v-if='nextArticle != "No Result"' class='pull-right'>
                                {{$scms.showShortTitle(nextArticle.title,10)}}&nbsp;
                                <i class='fa fa-chevron-right'></i>
                            </nuxt-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>
    import Comments from "~components/minorcomponents/comments.vue";
    import EditPost from "~components/minorcomponents/posteditor.vue";
    import ConfirmView from "~components/minorcomponents/confirmview.vue";
    import ShareView from "~components/minorcomponents/sharearticle.vue";

    export default {
        async data({store,route,req,redirect}){

            if (req !== undefined){
                if (route.params.id !== undefined){
                    return {
                            article:req.article.article,
                            isEditing:route.query.isediting !== undefined && store.state.isLogin ? true:false,
                            lastArticle:req.article.lstArticle,
                            nextArticle:req.article.nxtArticle,
                            editLoads:{
                                article:req.article.article,
                                hasCategory:true,
                                categoryList:store.state.postCategories,
                                documenttypeList:store.state.postDocumenttypes,
                                languageList:store.state.postLanguages
                            }
                        }
                }else{
                    redirect('/');
                }
            }else{
                const { data } = await $.get(`/articles/${route.params.id}/client`);
                return {
                    article:data.article,
                    isEditing:route.query.isediting !== undefined && store.state.isLogin ? true:false,
                    lastArticle:data.lstArticle,
                    nextArticle:data.nxtArticle,
                    editLoads:{
                        article:data.article,
                        hasCategory:true,
                        categoryList:store.state.postCategories,
                        documenttypeList:store.state.postDocumenttypes,
                        languageList:store.state.postLanguages
                    }
                }
            }

        },
        methods:{
            deleteArticle(id){
                this.$refs.confirmView.getAction("Whether to delete the article?",function() {
                    $.ajax({
                        url: `/post/${id}/`,
                        type:'DELETE',
                        success: result => {
                            $("#confirmMsgField").modal('toggle');
                            this.$router.push('/pages/1');
                        },
                        error: err => {
                            alert(err.responseJSON.content);
                        }         
                    });
                });
                $("#confirmMsg").modal('toggle');
            },
            editorModify(){
                this.isEditing = !this.isEditing;
            },
            editorSubmit(data,onResult) {
                const postData = data;
                postData.id = this.article._id;
                postData.allowcomments = this.article.allowcomments;
                postData.allowsubcomments = this.article.allowsubcomments;

                $.ajax({
                    url: `/post/`,
                    type:'PUT',
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: result => {
                        location.href = this.$route.path;
                    },
                    error: err => {
                        onResult(err.responseJSON.content,"error");
                    }
                });
            }

        },
        computed: {
            articleSource() {
                    return '<span class="marginrightsmall">More info:</span><a href="' + this.article.sourcelink + '" target=_"blank">' + this.article.sourcelink + '</a>'
            },
            articleAuthor() {
                    return '<i class="fa fa-user"></i>&nbsp;<a href=/author/' + this.article.uniqnameslug + '>' + this.article.fullname + '</a>'
            },
            articleTags() {
                    return this.article.tags === undefined || this.article.tags === "" ? "" : '<i class="fa fa-tags"></i>&nbsp;' + this.article.tags
            },
            articleTagsLinks() {
                    let tags = this.article.tags == undefined ? '' : this.article.tags.charAt(0).toUpperCase() + this.article.tags.slice(1);
                    let tagsSlug = this.article.tags == undefined ? '' : this.article.tagsslug;
                    let tagslist = tags.indexOf(',') === -1  ? [tags] : tags.split(',');
                    let tagslistSlug = tagsSlug.indexOf(',') === -1  ? [tagsSlug] : tagsSlug.split(',');
                    let tagslistLinks = [];
                    for (let index = 0; index < tagslist.length; ++index) {
                        tagslistLinks[index] = '<a href="/tags/' + tagslistSlug[index].trim() + '">' + tagslist[index].trim() + '</a>';
                    };
                    return '<i class="fa fa-tags"></i>&nbsp;' + tagslistLinks.join(', ');
            },
            articleCategory() {
                    return this.article.category
            },
            articleDocumenttype() {
                    return this.article.documenttype
            },
            articleID() {
                    return this.article._id
            },
            articleTitle() {
                    return this.article.title
            },
            catLink() {
                return '/category/' + this.article.categoryslug + '/pages/1';
            },
            dtLink() {
                return '/documenttype/' + this.article.documenttypeslug + '/pages/1';
            },
            shareHackernews(articleID, articleTitle) {
                return '<a href="http://news.ycombinator.com/submitlink?u=https://articles/' + this.articleID + '&t=' + this.articleTitle + '\" target="_blank" title="Hacker News" class="hackernews"><i class="fa fa-hacker-news marginleftsmall marginrightsmall"></i>Hacker News</a>'
            },
            shareReddit(articleID, articleTitle) {
                return '<a href="http://www.reddit.com/submit?url=https://articles/' + this.articleID + '\" target="_blank" title="Reddit" class="reddit"><i class="fa fa-reddit marginleftsmall marginrightsmall"></i>Reddit</a>'
            },
            shareLinkedin(articleID, articleTitle) {
                return '<a href="http://www.linkedin.com/shareArticle?mini=true&url=https://articles/' + this.articleID + '&title=' + this.articleTitle + '&source=https://udvandrerne.dk\" target="_blank" title="LinkedIn" class="linkedin"><i class="fa fa-linkedin-square marginleftsmall marginrightsmall"></i>LinkedIn</a>'
            },
            shareGoogleplus(articleID, articleTitle) {
                return '<a href="https://plus.google.com/share?url=https://articles/' + this.articleID + '\" target="_blank" title="Google+" class="googleplus"><i class="fa fa-google-plus-square marginleftsmall marginrightsmall"></i>Google+</a>'
            },
            shareFacebook(articleID, articleTitle) {
                return '<a href="https://www.facebook.com/sharer/sharer.php?u=https://articles/' + this.articleID + '\" target="_blank" title="Facebook" class="facebook"><i class="fa fa-facebook-square marginleftsmall marginrightsmall"></i>Facebook</a>'
            },
            shareTwitter(articleID, articleTitle) {
                return '<a href="https://twitter.com/intent/tweet?status=' + this.articleTitle + '-https://articles/' + this.articleID + '\" target="_blank" title="Twitter" class="twitter"><i class="fa fa-twitter-square marginleftsmall marginrightsmall"></i>Twitter</a>'
            }
        },
        components:{
            Comments,
            EditPost,
            ConfirmView,
            ShareView
        }
    }
</script>
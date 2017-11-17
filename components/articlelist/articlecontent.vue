<template>
    <div class='panel panel-default mevn-content'>
        <div class='panel-body'>
            <div class='panel panel-info article-body' v-for='article in $store.state.articles' v-bind:data='article' v-bind:key='article.text'>
                <div class='panel-body'>
                        <span v-if='$store.state.isLogin && ($store.state.user.username == article.username || $store.state.user.usertype == 1)'>
                            <a class='article-btns-right-a pull-right' title='Modify articles'>
                                <i class='fa fa-edit marginleftmedium' @click='modify(article)'></i>
                            </a>
                        </span>
                        <span v-if='$store.state.isLogin && $store.state.user.usertype == 1' @click=''>
                            <a class='article-btns-right-a pull-right' title='Delete the article'>
                                <i class='fa fa-trash marginleftmedium' @click='deleteArticle(article._id)'></i>
                            </a>
                        </span>
                    <div class='article-title'>
                        <nuxt-link :to="{path:`/permlink/${article.permlink}`}">
                            {{ $scms.showShortTitle(article.title,20) }}
                        </nuxt-link>
                    </div>
                    <div class='article-content' v-html='$scms.showShortArticle(article.content,article._id)'>
                    </div>
                    <div class='article-btns'>
                        <span>
                            <i class='fa fa-file-o marginrightmedium'></i>
                            <span v-html='$scms.showDocumenttypeAnchor(article.documenttype, article.documenttypeslug)'></span>
                        </span><br />
                        <span>
                            <i class='fa fa-folder-open-o marginrightsmall'></i>
                            <span v-html='$scms.showCategoryAnchor(article.category, article.categoryslug)'></span>
                        </span><br />
                        <span v-html='$scms.showTagsAnchor(article.tags, article.tagsslug)'></span>
                        <div class='article-btns-right pull-right'>
                            <span>
                                <i class='fa fa-user marginrightmedium'></i>
                                <span v-html='$scms.showAuthorAnchor(article.fullname, article.uniqnameslug)'></span>
                            </span><br />
                            <span>
                                <i class='fa fa-calendar marginrightsmall'></i>
                                <a href='javascript:void(0)' :title='$scms.showTime(article._id)' @click='toDate(article._id)'>{{ $scms.showDate(article._id) }}</a>
                            </span><br />
                            <span>
                                <i class='fa fa-eye marginrightsmall'></i>{{ article.hits }}</span><br />
                        </div>
                    </div>
                </div>
            </div>
            <Switch-Page v-if='$store.state.articleNum>5'></Switch-Page>
        </div>

        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

import ShareView from "~components/minorcomponents/sharearticle.vue";
import SwitchPage from "~components/articlelist/switchpage.vue";
import ResultView from "~components/minorcomponents/resultview.vue";
import ConfirmView from "~components/minorcomponents/confirmview.vue";

export default {
    props: ["pg"],
    data() {
        return {

        }
    },
    methods: {
        articleDetail(article) {
            this.$router.push({ path: `/articles/${article._id}` });
        },
        modify(article) {
            this.$store.commit('loadArticleDetail', article);
            this.$router.push({ path: `/articles/${article._id}`, query: { isediting: true } })
        },
        toDate(id) {
            const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
            const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString() : date.getDate().toString();
            const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1) : (Number(date.getMonth()) + 1).toString();
            const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString() : date.getFullYear().toString();
            const postDate = [day, month, year].join('-');
            this.$router.push(`/date/${postDate}/pages/1`);
        },
        deleteArticle(id) {
            this.$refs.confirmView.getAction("Whether to delete the article?", function() {
                $.ajax({
                    url: `/post/${id}/`,
                    type: 'DELETE',
                    success: result => {
                        location.reload();
                    },
                    error: result => {
                        alert(result.responseJSON.content);
                    }
                });
            });
            $("#confirmMsg").modal('toggle');
        }
    },
    components: {
        ResultView,
        SwitchPage,
        ConfirmView,
        ShareView
    }
}
</script>

<style>

</style>
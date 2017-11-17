<template>
    <div class='panel panel-default mevn-content'>
        <div class='panel-body'>
            <div class='category-title'>
                <h3>
                    <b>Posts {{ titlePrep}} <u> {{ titleFromSlug }} </u></b>
                </h3>
            </div>
            <div class='panel panel-info article-body' v-for='article in data.currentArticles' v-bind:data='article' v-bind:key='article.text' v-if='data.currentArticles.length != 0'>
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
            <div class='panel panel-info' v-if='data.currentArticles.length == 0'>
                <div class='panel-body'>
                    <br />
                    <div class='article-title'>
                        <a href='javascript:void(0)'> 404 !!!!!</a>
                    </div>
                    <div class='article-content'>
                        There is no content in this category！
                    </div>
                </div>
            </div>

            <div>
                <ul class="pagination" style='margin:0 auto;'>
                    <li v-if='data.hasFst' @click='toFirst'>
                        <a href="javascript:void(0)" class='fa fa-angle-double-left'></a>
                    </li>
                    <li v-if='data.hasLast' @click='lastPage'>
                        <a href="javascript:void(0)" class='fa fa-angle-left'></a>
                    </li>
                    <li>
                        <span href="javascript:void(0)">This is page {{pg}}</span>
                    </li>
                    <li v-if='data.hasNxt' @click='nxtPage'>
                        <a href="javascript:void(0)" class='fa fa-angle-right'></a>
                    </li>
                    <li v-if='data.hasLst' @click='toLast'>
                        <a href="javascript:void(0)" class='fa fa-angle-double-right'></a>
                    </li>
                </ul>
                <div class='pull-right'>
                    <button class='btn btn-default' style='border-color:#069;color:#069' @click='toTop'>
                        <i class='fa fa-arrow-up'></i>
                    </button>
                </div>
            </div>
        </div>
        <Confirm-View ref='confirmView'></Confirm-View>
    </div>
</template>

<script>

import ConfirmView from "~components/minorcomponents/confirmview.vue";
import ShareView from "~components/minorcomponents/sharearticle.vue";

export default {
    props: [
        "data", "pg", "title"
    ],
    methods: {
        articleDetail(article) {
            this.$store.commit('loadArticleDetail', article);
            this.$router.push({ path: `/articles/${article._id}`, params: article });
        },
        toDate(id) {
            const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
            const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString() : date.getDate().toString();
            const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1) : (Number(date.getMonth()) + 1).toString();
            const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString() : date.getFullYear().toString();
            const postDate = [day, month, year].join('-');
            this.$router.push(`/date/${postDate}/pages/1`);
        },
        modify(article) {
            this.$store.commit('loadArticleDetail', article);
            this.$router.push({ path: `/articles/${article._id}`, query: { isediting: true } })
        },
        deleteArticle(id) {
            this.$refs.confirmView.getAction("Whether to delete the article?", () => {
                $.ajax({
                    url: `/post/${id}/`,
                    type: 'DELETE',
                    success: function(result) {
                        location.reload();
                    },
                    error: result => {
                        alert(result.responseJSON.content);
                    }
                });
            });
            $("#confirmMsg").modal('toggle');
        },
        toFirst() {
            window.scrollTo(0, 0);
            this.$emit('switch', 1);
        },
        lastPage() {
            window.scrollTo(0, 0);
            const newPg = Number(this.pg) - 1;
            this.$emit('switch', newPg);
        },
        nxtPage() {
            window.scrollTo(0, 0);
            const newPg = Number(this.pg) + 1;
            this.$emit('switch', newPg);
        },
        toLast() {
            window.scrollTo(0, 0);
            this.$emit('switch', this.data.lastPg);
        },
        toTop() {
            window.scrollTo(0, 0);
        }
    },
    computed: {
        thisRoute() {
            return this.$route.path.split('/')[1];
        },
        titlePrep() {
            let temp = 'about';
            if (this.thisRoute == 'documenttype') {
                temp = 'of type';
            } else if (this.thisRoute == 'category') {
                temp = 'from website';
            } else if (this.thisRoute == 'tags') {
                temp = 'about';
            } else if (this.thisRoute == 'date') {
                temp = 'dated';
            } else if (this.thisRoute == 'author') {
                temp = 'written by';
            } else if (this.thisRoute == 'replier') {
                temp = 'with replies by';
            } else {
                temp = 'containing the following word(s):';
            };
            return temp;
        },
        titleFromSlug() {
            let tempTitle0 = this.title.replace(/\-/g, ' ').toLowerCase().trim()
                .replace(/\ae/g, 'æ')
                .replace(/\oe/g, 'ø')
                .replace(/\aa/g, 'å');
            let tempTitleArray0 = tempTitle0.split(' ');
            let truncateUnits = tempTitleArray0.length;
            if (this.thisRoute == 'author' || this.thisRoute == 'replier') {
                truncateUnits = truncateUnits-1;
            };
            let tempTitleArray = tempTitleArray0.slice(0, truncateUnits);
            let tempTitle = tempTitleArray.join(' ');
            let tempTemp = '';
            if (this.thisRoute == 'date') {
                tempTitle = this.title.replace(/\s/g, '-');
            } else if (this.thisRoute == 'author' || this.thisRoute == 'replier') {
                tempTitle.split(' ').forEach(element => {
                    tempTemp = tempTemp + ' ' + element.charAt(0).toUpperCase() + element.slice(1);
                });
                tempTitle = tempTemp;
            };
            return tempTitle.trim();
        },
    },
    components: {
        ConfirmView,
        ShareView
    }
}    
</script>
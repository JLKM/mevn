<template>
    <Filtered-Articles :data='tagsArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.tags'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    tagsArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/tags/${params.tags}/pages/${params.pgNum}/client`);
                return {
                    tagsArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/tags/${this.$route.params.tags}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
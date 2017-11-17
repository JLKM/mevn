<template>
    <Filtered-Articles :data='replierArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.replier'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    replierArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/replier/${params.replier}/pages/${params.pgNum}/client`);
                return {
                    replierArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/replier/${this.$route.params.replier}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
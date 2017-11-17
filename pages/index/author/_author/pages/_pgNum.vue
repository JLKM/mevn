<template>
    <Filtered-Articles :data='authorArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.author'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    authorArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/author/${params.author}/pages/${params.pgNum}/client`);
                return {
                    authorArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/author/${this.$route.params.author}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
<template>
    <Filtered-Articles :data='searchArticles' :pg='pgNum' v-on:switch='switchPg' :title='" " + $scms.showShortTitle($route.params.search.replace("+"," "),10)'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    searchArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/search/${params.search}/pages/${params.pgNum}/client`);
                return {
                    searchArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/search/${this.$route.params.search}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
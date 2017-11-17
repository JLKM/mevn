<template>
    <Filtered-Articles :data='documenttypeArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.documenttype'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    documenttypeArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/documenttypes/${params.documenttype}/pages/${params.pgNum}/client`);
                return {
                    documenttypeArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/documenttype/${this.$route.params.documenttype}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
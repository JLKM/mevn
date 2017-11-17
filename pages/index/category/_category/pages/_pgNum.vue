<template>
    <Filtered-Articles :data='categoryArticles' :pg='pgNum' v-on:switch='switchPg' :title='$route.params.category'></Filtered-Articles>
</template>

<script>

    import FilteredArticles from "~components/filteredarticlelist/articlecontent.vue";

    export default {
        async data({store,req,params,route}){
            if (req){
                return {
                    categoryArticles:req.preLoad.articles,
                    pgNum:params.pgNum
                }
            }else{
                const {result} = await $.get(`/category/${params.category}/pages/${params.pgNum}/client`);
                return {
                    categoryArticles:result,
                    pgNum:params.pgNum
                }
            }
        },
        methods:{
            switchPg(pg){
                this.$router.push(`/category/${this.$route.params.category}/pages/${pg}`);
            },
        },
        components:{
            FilteredArticles
        }
    }
</script>
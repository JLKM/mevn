<template>
        <Main-Content :pg='pgNum'></Main-Content>
</template>

<script>
    import MainContent from "~components/articlelist/articlecontent.vue";

    export default {
        async data ({store,req,params}) {
            if (req){
                //Home article list Get already savedstore/index.js file
            }else{
                const { result } = await $.get(`/post/page/${params.pgNum}`);
                store.commit('getArticleNum',result);
            }

            return {
                pgNum:params.pgNum === undefined ? 1:params.pgNum,
            }
        },
        components:{
            MainContent
        }
    }
</script>
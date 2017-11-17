<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (req){
            }
            if (route.params.tags !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/tags/${route.params.tags}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>
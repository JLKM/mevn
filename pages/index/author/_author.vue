<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (req){
            }
            if (route.params.author !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/author/${route.params.author}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>
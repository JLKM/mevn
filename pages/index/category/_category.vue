<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (req){
            }
            if (route.params.category !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/category/${route.params.category}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>
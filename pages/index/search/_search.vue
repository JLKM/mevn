<template>
    <nuxt-child></nuxt-child>
</template>

<script>
    export default {
        fetch({redirect,route,store,req}){
            if (route.params.search !== undefined){
                if (route.params.pgNum === undefined){
                    redirect(`/search/${route.params.search}/pages/1`);
                }
            }else{
                redirect(`/pages/1`);
            }
        }
    }
</script>
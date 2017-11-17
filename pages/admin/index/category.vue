<template>
    <div class='panel panel-default'>
        <div><h3><b>Classification management</b></h3></div><br />
        <ul class="nav nav-tabs admin-tabs">
            <li :class='{active:$route.path == "/admin/category" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category'}">
                    Main navigation
                </nuxt-link>
            </li>
            <li :class='{active:$route.path == "/admin/category/sidebar" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category/sidebar'}">
                    Side of the shortcut bar
                </nuxt-link>
            </li>
            <li :class='{active:$route.path == "/admin/category/articles" ? true:false}'>
                <nuxt-link :to="{path:'/admin/category/articles'}">
                    Website
                </nuxt-link>
            </li>
        </ul>
        <nuxt-child></nuxt-child>
    </div>
</template>

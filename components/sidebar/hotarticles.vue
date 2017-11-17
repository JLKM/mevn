<template>
    <div>
        <div class='panel panel-default'>
            <div class='panel-heading' v-if='$store.state.sideBarComps.HotPosts.showTitle'>
                 What is this?
            </div>
            <div class='panel-body'>
                 <div class='self-intro-content-name'>
                    {{ $store.state.aboutTitle }}
                </div>
                <div>
                    {{ $store.state.aboutText }}
                    <div v-html="aboutLinkHTML"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            aboutLinkEN() {
                return this.$store.state.aboutLinkEN
            },
            aboutLinkHTML() {
                return '<span class="marginrightsmall"><i class="fa fa-link marginrightsmall"></i>More info:</span><a href="' + this.aboutLinkEN + '" target=_"blank">First MEVN stack in Denmark?</a>'
            }
        }
    }
</script>
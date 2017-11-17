<template>
    <div class='panel panel-default'>
        <div class='panel-heading' v-if='$store.state.sideBarComps.SelfIntro.showTitle'>
            {{$store.state.sideBarComps.SelfIntro.title}}
        </div>
        <div class='panel-body'>
                <div class='self-intro-content-name'>
                    {{ $store.state.profileTitle }}
                </div>
                <div v-if='$store.state.sideBarComps.SelfIntro.showIntros'>
                    {{ $store.state.profileText }}
                </div>
            <div class='self-intro-content'>
                                <div v-if='$store.state.sideBarComps.SelfIntro.showEmail'>
                    <i class='fa fa-envelope-o'></i><span><a href="mailto:info@jlkm.dk">info@jlkm.dk</a></span>
                </div>
                <div v-if='$store.state.sideBarComps.SelfIntro.showLocation'>
                    <i class='fa fa-drivers-license-o'></i><span>Aarhus, Denmark</span>
                </div>
            <div class='self-intro-contact-btns'>
                <a href="https://jlkm.dk" target="_blank">Website&nbsp;<i class='fa fa-link'></i></a>
                <a href="https://dk.linkedin.com/pub/jan-larsen/98/a7b/11b" target="_blank">Linkedin&nbsp;<i class='fa fa-linkedin-square'></i></a>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {

            }
        },
        computed:{
            sendEmail(){
                const sendEmail = `mailto:${this.$store.state.sideBarComps.SelfIntro.email}`;
                return sendEmail
            }
        }
    }
</script>

<style>


</style>
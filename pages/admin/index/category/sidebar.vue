<template>
    <div class='container-fluid'>
        <br />
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Navigation name</th>
                <th class='text-center'>Navigation visible</th>
                <th class='text-center'>Title visible</th>
                <th>Title name</th>
                <th class='text-center'>Visitors are not visible</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Mood with words</th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.showTitle' /></th>
                    <th><input class='form-control' v-model='SelfMotto.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfMotto.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("SelfMotto")'>Edit</button></th>
                </tr>
                <tr>
                    <th>Profile</th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.showTitle' /></th>
                    <th><input class='form-control' v-model='SelfIntro.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='SelfIntro.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("SelfIntro")'>Edit</button></th>
                </tr>
                <tr>
                    <th>Popular articles</th>
                    <th class='text-center'><input type='checkbox' v-model='HotPosts.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='HotPosts.showTitle' /></th>
                    <th><input class='form-control' v-model='HotPosts.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='HotPosts.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("HotPosts")'>Edit</button></th>
                </tr>
                <tr>
                    <th>Shortcut keys</th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.display' /></th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.showTitle' /></th>
                    <th><input class='form-control' v-model='QuickBtns.title' style='margin-top:-3px;' /></th>
                    <th class='text-center'><input type='checkbox' v-model='QuickBtns.onlyAdmin' /></th>
                    <th class='text-center'><button class='btn btn-default' style='margin-top:-3px;' @click='modify("QuickBtns")'>Edit</button></th>
                </tr>
            </tbody>
        </table>

        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' onclick='window.location.reload();' title='Reset the shortcut bar'>Reset</button>&nbsp;&nbsp;
                <button class='btn btn-default' @click='save' title='Save the shortcut bar'>Save</button>
            </span>
        </div>

        <Modal-View ref='modalView'>
            <template scope='props'>
                <div class='scms-modal-header'>
                    <span>{{modifyingName}}</span>
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body'>

                    <div v-if='modifyingName === "Mood with words"'>
                        <label>Content</label>
                        <input v-model='SelfMotto.content' class='form-control' />
                    </div>

                    <div v-if='modifyingName === "Self introduction"'>
                        <div class="input-group">
                            <span class="input-group-addon">
                                Display the name
                                <input type="checkbox" v-model='SelfIntro.showName'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.name'>
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                Show emails
                                <input type="checkbox" v-model='SelfIntro.showEmail'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.email'>
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                Show area
                                <input type="checkbox" v-model='SelfIntro.showLocation'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.location'>
                        </div><br />
                        <div>
                            <span>Display introduction</span>&nbsp;&nbsp;
                            <input type="checkbox" v-model='SelfIntro.showIntros' /><br />
                            <textarea v-model='SelfIntro.intros' class='form-control' style='max-width:580px'></textarea>
                        </div>

                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model='SelfIntro.showQQ'>
                                Enable QQ two-dimensional code
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" v-model='SelfIntro.showWechat'>
                                Enable WeChat two-dimensional code
                            </label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon">
                                Enable microblogging
                                <input type="checkbox" v-model='SelfIntro.showWeibo'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.weiboLink' placeholder="Weibo address">
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                Enabled Facebook
                                <input type="checkbox" v-model='SelfIntro.showFacebook'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.facebookLink' placeholder="Facebook address">
                        </div><br />
                        <div class="input-group">
                            <span class="input-group-addon">
                                Enabled Linkedin
                                <input type="checkbox" v-model='SelfIntro.showLinkedin'>
                            </span>
                            <input type="text" class="form-control" v-model='SelfIntro.linkedinLink' placeholder="Linkedin address">
                        </div><br />
                    </div>

                    <div v-if='modifyingName === "Shortcut keys"'>
                        <span v-if='$store.state.isLogin'>
                            New post&nbsp;&nbsp;
                            <input type="checkbox" v-model='QuickBtns.quickPost'>
                        </span>
                    </div>
                </div>
                <div class='scms-modal-footer'>
                    <div class='scms-modal-footer-buttons'>
                        <button class='btn btn-primary' @click='props.toggle'>OK</button>
                    </div>
                </div>
            </template>
        </Modal-View>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";
    import ModalView from "~components/minorcomponents/scmsmodal.vue";

    export default {
        data({store}){
            return {
                SelfMotto:store.state.sideBarComps.SelfMotto,
                SelfIntro:store.state.sideBarComps.SelfIntro,
                QuickBtns:store.state.sideBarComps.QuickBtns,
                HotPosts:store.state.sideBarComps.HotPosts,
                modifyingName:"",
            }
        },
        methods:{
            modify(modifyType){
                if (modifyType == "SelfMotto"){
                    this.modifyingName = "Mood with words"
                }else if (modifyType == "SelfIntro"){
                    this.modifyingName = "Profile"
                }else{
                    this.modifyingName = "Shortcut keys"
                }
                this.$refs.modalView.toggle();
            },
            save(){
                const data = {
                    SelfMotto:this.SelfMotto,
                    SelfIntro:this.SelfIntro,
                    QuickBtns:this.QuickBtns,
                    HotPosts:this.HotPosts
                };
                $.ajax({
                    url: `/admin/nav/sidebar`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: result => {
                        this.$store.commit('updateSidebar',data);
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        components:{
            ResultView,
            ModalView
        }
    }
</script>
<template>
    <div>
        <div v-if='$store.state.isLogin' class='panel panel-default'>
            <div class='panel-heading' v-if='$store.state.sideBarComps.QuickBtns.showTitle'>
                {{$store.state.sideBarComps.QuickBtns.title}}&nbsp;/&nbsp;{{ $store.state.user.username }}&nbsp;/&nbsp;{{ $store.state.user.fullname }}
            </div>
            <div class='quick-btns' v-if='$store.state.sideBarComps.QuickBtns.quickPost'>
                <button class='btn btn-default' data-toggle="modal" data-target="#quickPostField">New post</button>
             <button class='btn btn-default marginleftmedium' @click='toAdmin' v-if='$store.state.user.usertype == 1'><i class='fa fa-gear'></i>&nbsp;Admin</button>
             <button class='btn btn-default marginleftmedium' onclick="window.location='/user/logout';"><i class='fa fa-sign-out'></i></button>
             </div>
        </div>
        <div v-if='!$store.state.isLogin' class='panel panel-default'>
            <div class='panel-heading'>
                {{$store.state.sideBarComps.QuickBtns.loginTitle}}
            </div>
            <div class='quick-btns'>
                 <button class='btn btn-default' data-toggle="modal" data-target="#settingField"><i class='fa fa-gear'></i></button>
                 {{$store.state.sideBarComps.QuickBtns.loginHint}}
            </div>
        </div>
        <div class="modal fade" id="quickPostField" tabindex="-1" role="dialog" aria-labelledby="quickPostFieldLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <Post-Editor :submit='submit' :preLoads='editLoads'>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model='allowcomments'/>Allow comment
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" v-model='allowsubcomments'/>Allow sub comment
                            </label>
                        </div>
                    </Post-Editor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostEditor from "../minorcomponents/posteditor.vue";

    export default {
        data(){
            return {
                editLoads:{
                    hasCategory:true,
                    categoryList:this.$store.state.postCategories,
                    documenttypeList:this.$store.state.postDocumenttypes,
                    languageList:this.$store.state.postLanguages,
                    submit:this.submit,
                    cancel:this.cancel
                },
                allowcomments:true,
                allowsubcomments:true
            }
        },
        components:{
            PostEditor
        },
        methods:{
            toAdmin(){
                location.href = "/admin/general";
            },
            submit(data,onResult){
                const postData = Object.assign(data,{
                    allowcomments:this.allowcomments,
                    allowsubcomments:this.allowsubcomments
                });
                $.ajax({
                    url: `/post/`,
                    type:'POST',
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: (result)=>{
                        if (result.status == "ok"){
                            onResult(result.content,"success");
                            location.href = "/pages/1";
                        }else{
                            onResult(result.content,"error");
                        }
                    }
                });
            },
            cancel(){
                $("#quickPostField").modal('hide');
            }
        }
    }
</script>
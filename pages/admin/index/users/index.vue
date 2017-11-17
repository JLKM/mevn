<template>
    <div class='admin-users-general'>
        <br />
        <div class='container-fluid'>
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowReg' />Open user registration
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            If you close the user registration will allow the user to customize the name when the user comments.
                            </span>
                        </div>
                    </span>&nbsp;&nbsp;
                </label>
                <button type="button" class="close" v-if='allowReg && !showRegSettings' @click='showRegSettings = !showRegSettings'>
                    <i class='fa fa-gear'></i>
                </button>
            </div><br />
            <div class='admin-reg-settings' v-if='showRegSettings'>
                <div class='container-fluid'>
                    <div class='panel panel-info'>
                        <div class="panel-heading">User registration settings
                            <button type="button" class="close" @click='showRegSettings = !showRegSettings'>
                                <i class='fa fa-chevron-up'></i>
                            </button>
                        </div>
                        <div class='panel-body'>
                            <div class='form-group'>
                                <label>IP - Number of registered users per day:</label>
                                <input type='number' class='form-control' v-model='serverUsersControl.regPerDay'/> 
                            </div>
                            <div class='form-group'>
                                <label>The following IP registrations are prohibited (One IP address per line):</label>
                                <textarea class='form-control' v-model='serverUsersControl.disallowedIP' rows='4'></textarea>
                            </div>
                            <div class='form-group'>
                                <label>The following user names are prohibited (Separate each keyword with a comma):</label>
                                <textarea class='form-control' v-model='serverUsersControl.disallowedIP' rows='2'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowNonUserViewArticle' />Allow non-users to browse articles
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            Users need to register to view blog posts.
                            </span>
                        </div>
                    </span>
                </label>
            </div><br />
            <div class="checkbox">
                <label>
                    <input type='checkbox'  v-model='allowNonUserComment' />Allow non-user comments
                    <span class='dropdown'>
                        <a class='fa fa-info-circle'></a>
                        <div class='dropdown-content panel-default'>
                            <span>
                            Non-user reviews are displayed as visitors.
                            </span>
                        </div>
                    </span>
                </label>
            </div>
        </div>
        <br /><br />
        <div class='admin-control-buttons'>
            <br />
            <div style='width:25%;'>
                <Result-View ref='resultView'></Result-View>    
            </div><br />
            <button class='btn btn-default' @click='save'>Save</button>
        </div>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data({store}){
            return {
                allowReg:store.state.usersControl.allowReg,
                showRegSettings:store.state.usersControl.allowReg ? true:false,
                allowNonUserViewArticle : store.state.usersControl.allowNonUserViewArticle,
                allowNonUserComment : store.state.usersControl.allowNonUserComment,
                serverUsersControl:{
                    regPerDay:1,
                    disallowedIP:""
                }
            }
        },
        methods:{
            save(){
                const data = {
                    allowReg:this.allowReg,
                    allowNonUserViewArticle:this.allowNonUserViewArticle,
                    allowNonUserComment:this.allowNonUserComment
                }

                $.ajax({
                    url: `/admin/users/gs`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        this.$store.commit('updateUsersControl',data);
                        this.$refs.resultView.sendMsg(result.content,"success");
                    },
                    error: err => {
                        this.$refs.resultView.sendMsg(err.responseJSON.content,"error");
                    }
                });
            }
        },
        components:{
            ResultView
        }
    }
</script>
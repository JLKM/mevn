<template>
    <div class='admin-user-profile-field'>
        <div class='container-fluid'>
            <br />
            <div class='input-group'>
                <label>
                    Username:
            <input class='form-control' v-model='username'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    Fullname:
            <input class='form-control' v-model='fullname'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    Password:
            <input type='password' class='form-control' v-model='password'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    Email:
            <input type='email' class='form-control' v-model='email'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    User description:
            <textarea placeholder="Enter content" class='form-control' id='editorArea' v-model='userdescription'></textarea>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    Link to external description:
            <input class='form-control' v-model='userlink'/>
                </label>
            </div>
            <div class='input-group'>
                <label>
                    User rights:
                    <select class="form-control" v-model='usertype'>
                        <option value='1'>Administrator</option>
                        <option value='2'>General user</option>
                    </select>
                </label>
            </div>
        </div><br />
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
        async data( {req,route,redirect} ){
            if (req) {
                if (req.preLoad.user.status != "err"){
                    return {
                        username:req.preLoad.user.username,
                        password:req.preLoad.user.password,
                        fullname:req.preLoad.user.fullname,
                        fullnameslug:req.preLoad.user.fullnameslug,
                        email:req.preLoad.user.email,
                        lg:req.preLoad.user.lg,
                        userdescription:req.preLoad.user.userdescription,
                        userlink:req.preLoad.user.userlink,
                        usertype:req.preLoad.user.usertype
                    }
                }else{
                    redirect("/error");
                }

            }else{
                const { result } = await $.get(`/admin/users/profile/${route.params.user}/client`);

                return {
                    username:result.username,
                    password:result.password,
                    fullname:result.fullname,
                    fullnameslug:result.fullnameslug,
                    email:result.email,
                    lg:result.lg,
                    userdescription:result.userdescription,
                    userlink:result.userlink,
                    usertype:result.usertype
                }
            }
        },
        computed:{
            string2Slug(){
                return this.fullname.toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with - 
                    .replace(/\ß/g, 'ss')
                    .replace(/\ü/g, 'ue')
                    .replace(/\ä/g, 'ae')
                    .replace(/\æ/g, 'ae')
                    .replace(/\ö/g, 'oe')
                    .replace(/\ø/g, 'oe')
                    .replace(/\å/g, 'aa') // Must execute before diacritics-strip, which also strips æ, ø and å
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text               
                }
            },
        methods:{
            save(){
                const data = {
                    id:this.$route.params.user,
                    username:this.username,
                    password:this.password,
                    fullname:this.fullname,
                    fullnameslug:this.string2Slug,
                    email:this.email,
                    lg:'da',
                    userdescription:this.userdescription,
                    userlink:this.userlink,
                    usertype:this.usertype
                };

                $.ajax({
                    url: `/admin/users/profile/${this.$route.params.user}`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
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
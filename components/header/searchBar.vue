<template>
    <div class='header_search'>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" v-model='kyWrds'>
            <span class="input-group-btn">
                <button class="btn btn-default" v-if='removeBtn ' type="button" @click='clear'><i class="fa fa-remove"></i></button>
                <button class="btn btn-default" type="button" @click='search'><i class="fa fa-search"></i></button>
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                kyWrds:'',
                schAlert:'',
                schAlertHid:false,
                removeBtn:false,
                users:[]
            }
        },
        methods:{
            search(){
                if (this.kyWrds != ""){
                    const search = this.kyWrds.replace(" ","+");
                    this.$router.push(`/search/${search}/pages/1`);
                }else{
                    alert("Please enter your search terms");
                }
            },
            clear(){
                this.kyWrds = "";
            }
        },
        watch:{ 
            kyWrds(){
                if (this.kyWrds.length != 0){
                    this.removeBtn = true;
                }else{
                    this.removeBtn = false;
                }
            }
        }
    }
</script>

<style>

</style>
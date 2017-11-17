<template>
    <div class='panel panel-default'>
        <div><h3><b>Site Information</b></h3></div><br />
        <label>Site title:<input class='form-control' v-model='mevnTitle' /></label><br /><br />
        <label>Site subtitle:<input class='form-control' v-model='mevnSubTitle' /></label><br /><br />
        <label>Site author:<input class='form-control' v-model='mevnAuthor' /></label><br /><br />
        <label>Site description:<input class='form-control' v-model='mevnDescription' style='width:300px' /></label><br /><br />
        <label>
            Site keywords
            <span class='dropdown'>
                <a class='fa fa-info-circle'></a>
                <div class='dropdown-content panel-default'>
                    <span>
                    Common delimiters: <br /> <br /> "-" (Horizontal line)  <br /> "_" (Underline)  <br /> "|" (Vertical line)  <br />"," (Comma)
                    </span>
                </div>
            </span>
            <input class='form-control' v-model='mevnKyWrds' style='width:500px' />
        </label><br /><br />
        <div style='width:25%;'>
            <Result-View ref='resultView'></Result-View>    
        </div><br />
        <button class='btn btn-default' @click='save'>Save</button>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data({store}){
            return {
                mevnTitle:store.state.mevnTitle,
                mevnSubTitle:store.state.mevnSubTitle,
                mevnDescription:store.state.mevnDescription,
                mevnKyWrds:store.state.mevnKyWrds,
                mevnAuthor:store.state.mevnAuthor
            }  
        },
        methods:{
            save(){
                const data = {
                    title:this.mevnTitle,
                    subTitle:this.mevnSubTitle,
                    description:this.mevnDescription,
                    keywords:this.mevnKyWrds,
                    author:this.mevnAuthor
                }

                $.ajax({
                    url: `/admin/gs`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: (result)=>{
                        this.$store.commit('updateGeneralSetting',data);
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
<template>
    <div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Classification id</th>
                <th>Category Name</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(cg,index) in categories' v-bind:data='(cg,index)' v-bind:key='(cg,index)'>
                <td><input v-model='cg.id' class='form-control'/></td>
                <td><input v-model='cg.name' class='form-control' /></td>
                <td class='text-center'><button class='btn btn-default' @click='remove(index)'><i class='fa fa-times'></i></button></td>
            </tr>
            </tbody>
        </table>

        <div class='admin-category-controls'>
            <br />
            <Result-View ref='resultView'></Result-View>
            <span class='pull-right'>
                <button class='btn btn-default' @click='addCategory'>Add navigation</button>&nbsp;&nbsp;
                <button class='btn btn-default' onclick='window.location.reload();'>Reset navigation</button>&nbsp;&nbsp;
                <button class='btn btn-default' @click='saveCategory'>Save navigation</button>
            </span>
        </div>
    </div>
</template>

<script>

    import ResultView from "~components/minorcomponents/resultview.vue";

    export default {
        data({store}){
            return {
                categories:store.state.postCategories,
                documenttypes:store.state.postDocumenttypes,
                languages:store.state.postLanguages
            }
        },
        methods:{
            remove(index){
                this.categories.splice(index,1);
            },
            addCategory(){
                this.categories.push({
                    id:this.categories.length + 1,
                    name:""
                })
            },
            saveCategory(){
                const data = {
                    categories:this.categories
                };
                $.ajax({
                    url: `/admin/nav/cg`,
                    type:"PUT",
                    contentType: "application/json",
                    data: JSON.stringify(this.categories),
                    success: (result)=>{
                        this.$store.commit('updateCategories',data);
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
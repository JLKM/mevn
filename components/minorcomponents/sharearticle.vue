<template>
    <span>
        &nbsp;&nbsp;&nbsp;
        <a><i class='fa fa-share-alt' @click='shareArticle' style='font-size:20px;cursor:pointer'></i></a>
        <Modal-View ref='modalView'>
            <template scope='props'>
                <div class='scms-modal-header'>
                    <span>Share this article</span>
                    <button type="button" class='close' @click='props.toggle'>
                        <span>&times;</span>
                    </button>
                </div>
                <div class='scms-modal-body'>
                    <ul class="nav nav-tabs">
                            <li class="nav-item active">
                                <a class="nav-link" href="javascript:void(0)"><i class='fa fa-hacker-news'></i></a>
                            </li>
                        <li class="nav-item">
                            <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-reddit'></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-linkedin-square'></i></a>
                        </li>
                            <li class="nav-item">
                                <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-google-plus-square'></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link share-btns" href="javascript:void(0)"><i class='fa fa-facebook'></i></a>
                            </li>
                    </ul>
                    <br />
                    <div>
                        <label>
                            Copy the address of this article:
                        </label>&nbsp;
                        <input :value='url' class='form-control' readonly/>
                    </div>
                </div>
                <div class='scms-modal-footer'>
                    <div class='scms-modal-footer-buttons'>
                        <button class='btn btn-primary' @click='props.toggle'>OK</button>
                    </div>
                </div>
            </template>
        </Modal-View>
    </span>

</template>

<script>
    import ModalView from "~components/minorcomponents/scmsmodal.vue";

    export default {
        props:[
            "id"  
        ],
        computed:{
            url(){
                return `http://${location.host}/articles/${this.id}`
            }
        },
        methods:{
            shareArticle(){
                this.$refs.modalView.toggle();
            }
        },
        components:{
            ModalView
        }
    }
</script>
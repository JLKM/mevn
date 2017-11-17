<template>
    <div class='post-editor'>
        <div v-if='isEditing'>
            <input placeholder="Enter title - editable after save" class='form-control' v-model='postTitle'>
            <slot></slot>
            <div class='post-content-editor-btns'>
                <div class="dropdown" v-if='hasCategory'>
                    <button class="btn btn-default dropdown-toggle btn-sm btnboldtxt" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{documenttype}}
                        <span class="caret" v-if='documenttype === "Documenttype"'></span>
                    </button>&nbsp;
                   <ul class="dropdown-menu">
                        <li @click='selectDocumenttypes(documenttype.name, documenttype.slug, documenttype.id)' v-for='documenttype in documenttypeList' v-bind:data='documenttype' v-bind:key='documenttype.text'>
                            <a href="javascript:void(0)">{{documenttype.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown" v-if='hasCategory'>
                    <button class="btn btn-default dropdown-toggle btn-sm btnboldtxt" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{category}}
                        <span class="caret" v-if='category === "Website"'></span>
                    </button>&nbsp;
                    <ul class="dropdown-menu">
                        <li @click='selectCategories(category.name, category.id)' v-for='category in categoryList' v-bind:data='category' v-bind:key='category.text'>
                            <a href="javascript:void(0)">{{category.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown" v-if='hasCategory'>
                    <button class="btn btn-default dropdown-toggle btn-sm btnboldtxt" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{language}}
                        <span class="caret" v-if='language === "Language"'></span>
                    </button>&nbsp;
                   <ul class="dropdown-menu">
                        <li @click='selectLanguages(language.name, language.id)' v-for='language in languageList' v-bind:data='language' v-bind:key='language.text'>
                            <a href="javascript:void(0)">{{language.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Font size
                    </button>
                    <ul class="dropdown-menu">
                        <li @click='addFontSize("90%")'>
                            <a href="javascript:void(0)">90%</a>
                        </li>
                        <li @click='addFontSize("110%")'>
                            <a href="javascript:void(0)">110%</a>
                        </li>
                        <li @click='addFontSize("120%")'>
                            <a href="javascript:void(0)">120%</a>
                        </li>
                        <li @click='addFontSize("130%")'>
                            <a href="javascript:void(0)">130%</a>
                        </li>
                        <li @click='addFontSize("140%")'>
                            <a href="javascript:void(0)">140%</a>
                        </li>
                        <li @click='addFontSize("150%")'>
                            <a href="javascript:void(0)">150%</a>
                        </li>
                        <li @click='addFontSize("custom")'>
                            <a href="javascript:void(0)">Customize</a>
                        </li>
                    </ul>
                </div>&nbsp;

                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Colour
                    </button>
                    <ul class="dropdown-menu">
                        <li style='background-color:#808080;' @click='addColor("#808080")'>
                            <a href="javascript:void(0)" style='color:#fff;'>Gray</a>
                        </li>
                        <li style='background-color:#FFFF00;' @click='addColor("#FFFF00")'>
                            <a href="javascript:void(0)">Yellow</a>
                        </li>
                        <li style='background-color:#FF0000;' @click='addColor("#FF0000")'>
                            <a href="javascript:void(0)" style='color:#fff;'>Red</a>
                        </li>
                        <li style='background-color:#008000;' @click='addColor("#008000")'>
                            <a href="javascript:void(0)" style='color:#fff;'>Green</a>
                        </li>
                        <li style='background-color:#0000FF;' @click='addColor("#0000FF")'>
                            <a href="javascript:void(0)" style='color:#fff;'>Blue</a>
                        </li>
                        <li style='background-color:#800080;' @click='addColor("#800080")'>
                            <a href="javascript:void(0)" style='color:#fff;'>Purple</a>
                        </li>
                        <li @click='addColor("custom")'>
                            <a href="javascript:void(0)">Customize</a>
                        </li>
                    </ul>
                </div>&nbsp;

                <button class='btn btn-default btn-sm' @click='addBold'>
                    <i class='fa fa-bold'></i>
                </button>&nbsp;
                <button class='btn btn-default btn-sm' @click='addItalic'>
                    <i class='fa fa-italic'></i>
                </button>&nbsp;
                <button class='btn btn-default btn-sm' @click='addUnderLine'>
                    <i class='fa fa-underline'></i>
                </button>&nbsp;
                <div class="dropdown">
                    <button class='btn btn-default btn-sm' @click='openUrlDropDown'>
                        <i class='fa fa-link'></i>
                    </button>
                    <div id='urlInput' class='dropdown-menu' v-if='showUrlInput' style='display:block'>
                        <div><br />
                            <input placeholder="Link text" class='form-control marginbottommedium' v-model='urlText'>
                            <input placeholder="Linkaddress" class='form-control marginbottommedium' v-model='urlLink'>
                            <button class='btn btn-default btn-sm' @click='addUrl'>Confirm</button>&nbsp;
                            <button class='btn btn-default btn-sm' @click='openUrlDropDown'>Cancel</button>
                        </div>
                        <br />
                    </div>
                </div>&nbsp;
                <button class='btn btn-default btn-sm' @click='addCode'>
                    <i class='fa fa-code'></i>
                </button>&nbsp;
                <button class='btn btn-default btn-sm' @click='addQuote'>
                    <i class='fa fa-quote-left'></i>
                </button>&nbsp;
                                       <div class="dropdown">
                    <button class='btn btn-default btn-sm' @click='openImgDropDown'><i class='fa fa-file-image-o'></i></button>
                    <div id='imgInput' class='dropdown-menu' v-if='showImgInput' style='display:block'>
                        <div><br />
                            <input placeholder="Image description" class='form-control' v-model='imgAlt'>
                            <input placeholder="Image link" class='form-control' v-model='imgLink'>
                            <input class='form-control' placeholder="Width" style='width:30%;' v-model='imgWidth'><input class='form-control' placeholder='Length' style='width:30%;' v-model='imgHeight'>
                            <button class='btn btn-default btn-sm' @click='addImg'>Confirm</button>&nbsp;
                            <button class='btn btn-default btn-sm' @click='openImgDropDown'>Cancel</button>
                        </div>
                        <br />
                    </div>
                </div>&nbsp;
                <button class='btn btn-default btn-sm' @click='preview()'>Preview</button>
            </div>


            <textarea placeholder="Enter content - editable after save" class='form-control' id='editorArea' v-model='postContent'></textarea>
            <input placeholder="Enter link to source or further reading" class='form-control marginbottommedium' v-model='sourcelink' v-if='hasCategory'>
            <input placeholder="Enter tags - separate with comma" class='form-control marginbottommedium' v-model='tags' v-if='hasCategory'>
            <input placeholder="Internal note to webmaster - never published" class='form-control marginbottommedium' v-model='note' v-if='hasCategory'>
            <Attachments :preload='previewImgs'></Attachments>
            <div class='post-btns'>
                <span style='float:left'>
                    <Result-View ref='resultView'></Result-View>
                </span>
                <button class='btn btn-default' @click='submitPost'>{{ preLoads.article !== undefined ? "Save":"Publish" }}</button>&nbsp;
                <button class='btn btn-default' @click='cancel'>Cancel</button>&nbsp;
                <button class='btn btn-default' @click='clear'>Clear</button>
            </div>
        </div>
        <div>
            <Preview v-if='isPreviewing' :title='postTitle' :content='postContent'></Preview>
            <div class='post-btns' v-if='isPreviewing'>
                <button class='btn btn-default' @click='preview'>Cancel</button>&nbsp;
                <button class='btn btn-default' @click='cancel'>Revoked</button>
            </div>
        </div>
    </div>
</template>

<script>

import ResultView from "./resultview.vue";
import Preview from "./preview.vue";
import Attachments from "./postuploads.vue";
import ImageUpload from "~components/minorcomponents/imageupload.vue";

export default {
    props: [
        'preLoads', 'categoryNeeded', 'preData'
    ],
    data() {
        return {
            categoryList: this.preLoads === undefined ? [] : this.preLoads.categoryList,
            documenttypeList: this.documenttypeList === undefined ? [] : this.documenttypeList[0].name,
            languageList: this.languageList === undefined ? [] : this.languageList[0].name,
            postTitle: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.title,
            postContent: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.content,
            language: this.preLoads === undefined ? "Language" : this.preLoads.article === undefined ? "Language" : this.preLoads.article.language,
            lg: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.lg,
            documenttype: this.preLoads === undefined ? "Documenttype" : this.preLoads.article === undefined ? "Documenttype" : this.preLoads.article.documenttype,
            documenttypeslug: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.documenttypeslug,
            documenttypeid: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.documenttypeid,
            sourcelink: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.sourcelink,
            tags: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.tags,
            category: this.preLoads === undefined ? "Website" : this.preLoads.article === undefined ? "Website" : this.preLoads.article.category,
            hasCategory: this.preLoads === undefined ? false : this.preLoads.hasCategory,
            note: this.preLoads === undefined ? "" : this.preLoads.article === undefined ? "" : this.preLoads.article.note,
            postCoverImg: true,
            coverUploadPreloads: {
                getImg: this.getCoverImg,
                multiple: false,
                accepts: 'image/*'
            },
            previewImgs: {
                existingImgs: [],
                newImgs: []
            },
            optionContent: "",
            selectionStart: 0,
            selectionEnd: 0,
            urlText: "",
            urlLink: "",
            imgAlt: "",
            imgLink: "",
            imgWidth: "",
            imgHeight: "",
            showUrlInput: false,
            showImgInput: false,
            isEditing: true,
            isPreviewing: false,
            resultMsg: "",
            hasMsg: false,
            errMsg: false,
            successMsg: false,
        }
    },
    computed: {
        userUniq() {
            let userId16 = this.$store.state.user._id.substring(8);
            let userIdArray = userId16.split("");
            let userUniqextern = this.$store.state.user.useruniqextern;
            let userUniqexternArray = userUniqextern.split("");
            let sequence = 0;
            let result = '';
            for (var i = 0; i < 16; i++)
                {
                    sequence = Number(userIdArray[i].replace("a", "10").replace("b", "11").replace("c", "12").replace("d", "13").replace("e", "14").replace("f", "15"));
                    result = result + userUniqexternArray[sequence];
                };
                return result
        },
        titleSlug() {
            return this.postTitle.toLowerCase()
                .replace(/\ß/g, 'ss')
                .replace(/\ü/g, 'ue')
                .replace(/\ä/g, 'ae')
                .replace(/\æ/g, 'ae')
                .replace(/\ö/g, 'oe')
                .replace(/\ø/g, 'oe')
                .replace(/\å/g, 'aa') // Must execute before diacritics-strip, which also strips æ, ø and å
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                .replace(/(\b(\w{1,3})\b(\W|$))/g,'') // Remove all words shorter than 4 characters
                .replace(/\s+/g, '-')           // Replace spaces with dash
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text               
        },
        tagsTrim() {
            let tempTags = this.tags.toLowerCase()
                .replace(/\s+/g, ' ')           // Replace multiple spaces with single spaces
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/\s,/g, ',')         // Comma trim
                .replace(/\,\s/g, ',')         // Comma trim
                .replace(/\,/g, ', ')         // Comma expand
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text 
            if (tempTags == '') {
                tempTags = 'generelt';
            };
            return tempTags;
        },
        mainTag() {
            let tagsArray = this.tagsTrim.split(', ');
            if (this.tagsTrim !== '') {
                var longestTag = tagsArray.reduce(function(a, b) { return a.length > b.length ? a : b; });
            }
            return longestTag.charAt(0).toUpperCase() + longestTag.slice(1);
        },
        tagsSlug() {
            let tempTagsSlug = this.tags.toLowerCase()
                .replace(/\s+/g, ' ')           // Replace multiple spaces with single spaces
                .replace(/\ß/g, 'ss')
                .replace(/\ü/g, 'ue')
                .replace(/\ä/g, 'ae')
                .replace(/\æ/g, 'ae')
                .replace(/\ö/g, 'oe')
                .replace(/\ø/g, 'oe')
                .replace(/\å/g, 'aa') // Must execute before diacritics-strip, which also strips æ, ø and å
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                .replace(/\s,/g, ',')         // Comma trim
                .replace(/\,\s/g, ',')         // Comma trim
                .replace(/\s/g, '-')           // Separator in multiword tags
                .replace(/\,/g, ', ')         // Comma expand
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text    
            if (tempTagsSlug == '') {
                tempTagsSlug = 'generelt';
            };
            return tempTagsSlug;           
        },
        mainTagSlug() {
            let tagsSlugArray = this.tagsSlug.split(', ');
            if (this.tagsTrim !== '') {
                var longestTagSlug = tagsSlugArray.reduce(function(a, b) { return a.length > b.length ? a : b; });
            }
            return longestTagSlug;
        },
        mainWordsSlug() {
            let tempWordsSlug = this.postContent.toLowerCase()
                .replace(/\[.*?\]/g, '')        // Remove all square brackets incl. content with regex
                .replace(/\s+/g, ' ')           // Replace multiple spaces with single spaces
                .replace(/\ß/g, 'ss')
                .replace(/\ü/g, 'ue')
                .replace(/\ä/g, 'ae')
                .replace(/\æ/g, 'ae')
                .replace(/\ö/g, 'oe')
                .replace(/\ø/g, 'oe')
                .replace(/\å/g, 'aa') // Must execute before diacritics-strip, which also strips æ, ø and å
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Strips accents and diacritics
                .replace(/[^\w\-]+/g, ' ')       // Remove all non-word chars
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text 
            let tempWordsSlugArray = tempWordsSlug.split(' ');
            let longestWordSlug = tempWordsSlugArray.reduce(function(a, b) { return a.length > b.length ? a : b; }); 
            let tempSecondWordsSlugArray = tempWordsSlugArray.filter(function(e) { return e !== longestWordSlug });
            let secondLongestWordSlug = tempSecondWordsSlugArray.reduce(function(a, b) { return a.length > b.length ? a : b; });
            let tempThirdWordsSlugArray = tempSecondWordsSlugArray.filter(function(e) { return e !== secondLongestWordSlug });
            let thirdLongestWordSlug = tempThirdWordsSlugArray.reduce(function(a, b) { return a.length > b.length ? a : b; });
            return longestWordSlug + "-" + secondLongestWordSlug + "-" + thirdLongestWordSlug
        },
        permLink() {
            let tempArray = (this.titleSlug + "-" + this.mainWordsSlug).split('-');
            let uniqueArray = tempArray.filter((el, i, a) => i === a.indexOf(el));
            return this.categorySlug + '/' + this.mainTagSlug + '/' + uniqueArray.join('-');
        }
    },
    methods: {
        selectCategories(categoryname, categoryslug) {
            this.category = categoryname;
            this.categoryslug = categoryslug;
        },
        selectLanguages(languagename, languageid) {
            this.language = languagename;
            this.lg = languageid;
        },
        selectDocumenttypes(documenttypename, documenttypeslug, documenttypeid) {
            this.documenttype = documenttypename;
            this.documenttypeslug = documenttypeslug;
            this.documenttypeid = documenttypeid;
        },
        cancel() {
            const cancelPost = this.preLoads.cancel === undefined ? this.$parent.editorCancel : this.preLoads.cancel;
            cancelPost();
        },
        clear() {
            this.postTitle = "",
            this.postContent = "";
        },
        preview() {
            this.isEditing = !this.isEditing;
            this.isPreviewing = !this.isPreviewing;
        },
        contentOnchange(str) {
            this.postContent = str;
        },
        submitPost() {
            if (this.hasCategory && this.category == "Website") {
                this.$refs.resultView.sendMsg("Select website", "error");
            } else if (this.documenttype == "Documenttype") {
                this.$refs.resultView.sendMsg("Select documenttype", "error");
            } else if (this.language == "Language") {
                this.$refs.resultView.sendMsg("Select language", "error");
            } else if (this.postContent == "") {
                this.$refs.resultView.sendMsg("Enter content", "error");
            } else if (this.postContent.length < 25){
                this.$refs.resultView.sendMsg("This is very short. Please, write a little bit more.", "error");
            } else if (this.postTitle == "") {
                this.$refs.resultView.sendMsg("Enter title", "error");
            } else if (this.postTitle.length < 12){
                this.$refs.resultView.sendMsg("A longer title is required to describe your post", "error");
            } else if (this.postTitle.indexOf(' ') == -1){
                this.$refs.resultView.sendMsg("A title has to contain more than one word", "error");
            } else {
                const postData = this.hasCategory ? {
                    title: this.postTitle,
                    titleslug: this.titleSlug,
                    permlink: this.permLink,
                    content: this.postContent,
                    documenttype: this.documenttype,
                    documenttypeslug: this.documenttypeslug,
                    documenttypeid: this.documenttypeid,
                    category: this.category,
                    categoryslug: this.categoryslug,
                    language: this.language,
                    lg: this.lg,
                    sourcelink: this.sourcelink,
                    tags: this.tagsTrim,
                    tagsslug: this.tagsSlug,
                    maintag: this.mainTag,
                    maintagslug: this.mainTagSlug,
                    username: this.$store.state.user.username,
                    usermail: this.$store.state.user.email,
                    userlg: this.$store.state.user.lg,
                    fullname: this.$store.state.user.fullname,
                    fullnameslug: this.$store.state.user.fullnameslug,
                    uniqnameslug: this.$store.state.user.fullnameslug + "-" + this.userUniq,
                    note: this.note
                } : {
                        title: this.postTitle,
                        titleslug: this.titleSlug,
                        sourcelink: this.sourcelink,
                        tags: this.tags,
                        content: this.postContent,
                        username: this.$store.state.user.username,
                        usermail: this.$store.state.user.email,
                        userlg: this.$store.state.user.lg,
                        fullname: this.$store.state.user.fullname,
                        fullnameslug: this.$store.state.user.fullnameslug,
                        uniqnameslug: this.$store.state.user.fullnameslug + "-" + this.userUniq
                    }
                const submit = this.preLoads.submit === undefined ? this.$parent.editorSubmit : this.preLoads.submit;
                submit(postData, this.$refs.resultView.sendMsg);            }
        },
        addFontSize(size) {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            if (size != "custom") {
                this.postContent = this.postContent.substring(0, selectionStart)
                    + `[s='${size}']` + this.postContent.substring(selectionStart, selectionEnd)
                    + '[/s]' + this.postContent.substring(selectionEnd);
            } else {
                const customSize = prompt('Enter font size', '100% or 10px');
                this.postContent = this.postContent.substring(0, selectionStart)
                    + `[s='${customSize}']` + this.postContent.substring(selectionStart, selectionEnd)
                    + '[/s]' + this.postContent.substring(selectionEnd);
            }
        },
        addColor(color) {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            if (color != "custom") {
                this.postContent = this.postContent.substring(0, selectionStart)
                    + `[c='${color}']` + this.postContent.substring(selectionStart, selectionEnd)
                    + '[/c]' + this.postContent.substring(selectionEnd);
            } else {
                const customColor = prompt('Enter color code', '#000000');
                this.postContent = this.postContent.substring(0, selectionStart)
                    + `[c='${customColor}']` + this.postContent.substring(selectionStart, selectionEnd)
                    + '[/c]' + this.postContent.substring(selectionEnd);
            }
        },
        addBold() {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            this.postContent = this.postContent.substring(0, selectionStart)
                + '[b]' + this.postContent.substring(selectionStart, selectionEnd)
                + '[/b]' + this.postContent.substring(selectionEnd);
        },
        addItalic() {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            this.postContent = this.postContent.substring(0, selectionStart)
                + '[i]' + this.postContent.substring(selectionStart, selectionEnd)
                + '[/i]' + this.postContent.substring(selectionEnd);
        },
        addUnderLine() {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            this.postContent = this.postContent.substring(0, selectionStart)
                + '[u]' + this.postContent.substring(selectionStart, selectionEnd)
                + '[/u]' + this.postContent.substring(selectionEnd);
        },
        openUrlDropDown() {
            if (!this.showUrlInput) {
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.selectionStart = selectionStart;
                this.selectionEnd = selectionEnd;
                this.urlText = this.postContent.substring(selectionStart, selectionEnd); //Add link text
                this.urlLink = "";
            }
            this.showUrlInput = !this.showUrlInput;
        },
        addUrl() {
            this.postContent = this.postContent.substring(0, this.selectionStart) + `[url a='${this.urlLink}']${this.urlText}[/url]` + this.postContent.substring(this.selectionEnd);
            this.showUrlInput = false;
        },
        addQuote() {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            this.postContent = this.postContent.substring(0, selectionStart)
                + '[quote]' + this.postContent.substring(selectionStart, selectionEnd)
                + '[/quote]' + this.postContent.substring(selectionEnd);
        },
        openImgDropDown() {
            if (!this.showImgInput) {
                const index = this.selectedTextIndex();
                const selectionStart = index[0];
                const selectionEnd = index[1];
                this.selectionStart = selectionStart;
                this.selectionEnd = selectionEnd;
                this.imgAlt = this.postContent.substring(selectionStart, selectionEnd); //Add a picture description
                this.imgLink = "";
            }
            this.showImgInput = !this.showImgInput;
        },
        addCode() {
            const index = this.selectedTextIndex();
            const selectionStart = index[0];
            const selectionEnd = index[1];
            this.postContent = this.postContent.substring(0, selectionStart)
                + '[code]' + this.postContent.substring(selectionStart, selectionEnd)
                + '[/code]' + this.postContent.substring(selectionEnd);
        },
        addImg() {
            const width = this.imgWidth == "" || isNaN(this.imgWidth) ? "" : `w='${this.imgWidth}'`; //To prevent non-digital long width
            const height = this.imgHeight == "" || isNaN(this.imgWidth) ? "" : `h='${this.imgHeight}'`;
            this.postContent = this.postContent.substring(0, this.selectionStart) + `[img a='${this.imgAlt}' ${width} ${height}]${this.imgLink}[/img]` + this.postContent.substring(this.selectionEnd);
            this.showImgInput = false;
        },
        selectedTextIndex() {
            const editorArea = document.getElementById('editorArea');
            return [editorArea.selectionStart, editorArea.selectionEnd];
        },
        getCoverImg(img) {
            this.previewImgs.newImgs = img;
        }
    },
    filters: {
        selectify: function(options, nameId, valueId) {
            return options.map(function(item) {
                item.$add('text', item[nameId]);
                item.$add('value', item[valueId]);
            return item;
    });
}
},
    components: {
        ResultView,
        Preview,
        ImageUpload,
        Attachments
    }
}

</script>
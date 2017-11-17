import Vue from "vue";

let sg = {}

sg.install = function (Vue, options) {

    Vue.prototype.$scms = {
        showDate(id){
            const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
            const day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString():date.getDate().toString();
            const month = (Number(date.getMonth()) + 1).toString().length == 1 ? "0" + (Number(date.getMonth()) + 1):(Number(date.getMonth()) + 1).toString();
            const year = date.getFullYear().toString().length == 1 ? "0" + date.getFullYear().toString():date.getFullYear().toString();

            return [day,month,year].join('-')
        },
        showTime(id){
            const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
            let tempHours0 = date.getHours().toString();
            let tempHours = ('0' + tempHours0).substring(tempHours0.length -1);
            let tempMinutes0 = date.getMinutes().toString();
            let tempMinutes = ('0' + tempMinutes0).substring(tempMinutes0.length -1);
            let tempSeconds0 = date.getSeconds().toString();
            let tempSeconds = ('0' + tempSeconds0).substring(tempSeconds0.length -1);
            return [tempHours,tempMinutes,tempSeconds].join(":")
        },
        toFullHtml(content){
            const patternObj = {
                code:{
                    reg:/\[code\](.*?)\[\/code]/g
                },
                br:{
                    reg:/(?:\r\n|\r|\n)/g,
                    newStr:"<br />"
                },
                b:{
                    reg:/\[b\](.*?)\[\/b\]/g,
                    newStr:"<b>$1</b>"
                },
                img:{
                    reg:/\[img(.*?)](.*?)\[\/img\]/g
                },
                url:{
                    reg:/\[url.*?].*?\[\/url\]/g
                },
                color:{
                    reg:/\[c='(.*?)'\](.*?)\[\/c\]/g,
                    newStr:"<span style='color:$1'>$2</span>"
                },
                size:{
                    reg:/\[s='(.*?)'\](.*?)\[\/s\]/g,
                    newStr:"<span style='font-size:$1'>$2</span>",
                },
                i:{
                    reg:/\[i\](.*?)\[\/i\]/g,
                    newStr:"<i>$1</i>"
                },
                quote:{
                    reg:/\[quote](.*?)\[\/quote]/g,
                    newStr:"<blockquote>$1</blockquote>"
                },
                u:{
                    reg:/\[u\](.*?)\[\/u\]/g,
                    newStr:"<u>$1</u>"
                }
            };

            let newContent = content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");

            for (let pat in patternObj){
                let tags
                switch (pat){
                    case "code":
                        tags = newContent.match(patternObj[pat].reg);
                        if (tags !== null){
                            tags.forEach(code => {
                                let convertedTag = code.replace(patternObj[pat].reg,"$1");
                                convertedTag = convertedTag.replace(/\</g,"&lt;");
                                convertedTag = convertedTag.replace(/\>/g,"&gt;");
                                newContent = newContent.replace(/\[code](.*?)\[\/code\]/, `<blockquote class='pre-scrollable'>${convertedTag}</blockquote>`);
                            });
                        }
                        break;
                    case "img":
                        tags = newContent.match(patternObj[pat].reg);
                        if (tags !== null){
                            tags.forEach(img =>{
                                const attributes = (img.match(/\[img(.*?)]/))[1];
                                const url = (img.match(/\](.*?)\[\//))[1];
                                const alt = attributes.match(/a=\'(.*?)\'/) === null ? "":` alt='${(attributes.match(/a=\'(.*?)\'/))[1]}'`; //Replace the alt tag
                                const w = attributes.match(/w=\'(.*?)\'/) === null ? "":` width='${(attributes.match(/w=\'(.*?)\'/))[1]}'`; //Replace the width tag
                                const h = attributes.match(/h=\'(.*?)\'/) === null ? "":` height='${(attributes.match(/h=\'(.*?)\'/))[1]}'`; //Replace the height tag
                                const imgTag = `<img${alt}${w}${h} src='${url}' />`;
                                newContent = newContent.replace(/\[img.*?].*?\[\/img\]/,imgTag);
                            });
                        }
                        break;
                    case "url":
                        tags = newContent.match(patternObj[pat].reg);
                        if (tags !== null){
                            tags.forEach(url => {
                                const attributes = (url.match(/\[url(.*?)]/))[1];
                                const alt = (url.match(/\](.*?)\[\//))[1] === "" ? `${(attributes.match(/a=\'(.*?)\'/))[1]}`:(url.match(/\](.*?)\[\//))[1];
                                const link = `href='${attributes.match(/a=\'(.*?)\'/)[1]}'`;
                                const urlTag = `<a ${link}>${alt}</a>`;
                                newContent = newContent.replace(/\[url.*?].*?\[\/url\]/,urlTag);
                            });
                        }
                        break;
                    default:
                        newContent = newContent.replace(patternObj[pat].reg,patternObj[pat].newStr);
                }
            }

            return newContent
        },
        showShortArticle(content,id){
            let endNum = 150;
            const patternObj = {
                code:{
                    reg:/\[code\](.*?)\[\/code]/g
                },
                b:{
                    reg:/\[b\](.*?)\[\/b\]/g,
                    newStr:"$1"
                },
                img:{
                    reg:/\[img(.*?)](.*?)\[\/img\]/g,
                },
                url:{
                    reg:/\[url.*?].*?\[\/url\]/g
                },
                color:{
                    reg:/\[c='(.*?)'\](.*?)\[\/c\]/g,
                    newStr:"$2"
                },
                size:{
                    reg:/\[s='(.*?)'\](.*?)\[\/s\]/g,
                    newStr:"$2",
                },
                i:{
                    reg:/\[i\](.*?)\[\/i\]/g,
                    newStr:"$1"
                },
                quote:{
                    reg:/\[quote](.*?)\[\/quote]/g,
                    newStr:"$1"
                },
                u:{
                    reg:/\[u\](.*?)\[\/u\]/g,
                    newStr:"$1"
                }
            };

            let newContent = content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
            let matched;

            for (let pat in patternObj){
                //replace html tags
                switch (pat){
                    case "img":
                        matched = newContent.match(patternObj[pat].reg);
                        newContent = newContent.replace(patternObj[pat].reg,`<a href='/articles/${id}'>View image</a>`);
                        if (matched !== null){
                            endNum += (`<a href='/articles/${id}'>View the source code</a>`.length) * matched.length;
                        }
                        break;
                    case "code":
                        matched = newContent.match(patternObj[pat].reg);
                        newContent = newContent.replace(patternObj[pat].reg,`<a href='/articles/${id}'>View the source code</a>`);
                        if (matched !== null){
                            endNum += (`<a href='/articles/${id}'>View the source code</a>`.length) * matched.length;
                        }
                        break;
                    case "url":
                        const tags = newContent.match(patternObj[pat].reg);
                        if (tags !== null){
                            tags.forEach(url => {
                                const attributes = (url.match(/\[url(.*?)]/))[1];
                                const alt = (url.match(/\](.*?)\[\//))[1] === "" ? `${(attributes.match(/a=\'(.*?)\'/))[1]}`:(url.match(/\](.*?)\[\//))[1];
                                const link = `href='${attributes.match(/a=\'(.*?)\'/)[1]}'`;
                                const urlTag = `<a ${link}>${alt}</a>`;
                                endNum += urlTag.length;
                                newContent = newContent.replace(/\[url.*?].*?\[\/url\]/,urlTag);
                            });
                            
                        }
                        break;
                    default:
                        newContent = newContent.replace(patternObj[pat].reg,patternObj[pat].newStr);
                }
            }

            if (newContent.length < endNum){
                return newContent
            };
            return newContent.substring(0,endNum) + ` ...`;
        },
        showShortTitle(title,num){
            if (title.length > num){
                return title.substring(0,num) + " ...."
            }
            return title
        },
        showCategory(category){
            return category
        },
        showSourceLink(sourcelink){
            let result = '';
            if (sourcelink != undefined && sourcelink != '') {
                result = '<span class="marginrightsmall"><i class="fa fa-external-link marginrightsmall"></i>More info:</span><a href="' + sourcelink + '" target=_"blank">' + sourcelink + '</a>';
            }
            return result;
        },
        showCategoryAnchor(category, categoryslug){
            return '<a href="/category/' + categoryslug + '/pages/1">' + category + '</a>';
        },
        showDocumenttypeAnchor(documenttype, documenttypeslug){
            return '<a href="/documenttype/' + documenttypeslug + '/pages/1">' + documenttype + '</a>';
        },
        showAuthorAnchor(fullname, uniqnameslug){
            return '<a href="/author/' + uniqnameslug + '/pages/1">' + fullname + '</a>'
        },
        showReplierAnchor(fullname, uniqnameslug){
            return '<a href="/replier/' + uniqnameslug + '/pages/1">' + fullname + '</a>'
        },
        showTagsAnchor(tags0, tagsslug0){
            let tags = tags0 == undefined ? '' : tags0.charAt(0).toUpperCase() + tags0.slice(1);
            let tagsSlug = tags0 == undefined ? '' : tagsslug0;
            let tagslist = tags.indexOf(',') === -1  ? [tags] : tags.split(',');
            let tagslistSlug = tagsSlug.indexOf(',') === -1  ? [tagsSlug] : tagsSlug.split(',');
            let tagslistLinks = [];
            for (let index = 0; index < tagslist.length; ++index) {
                tagslistLinks[index] = '<a href="/tags/' + tagslistSlug[index].trim() + '">' + tagslist[index].trim() + '</a>';
            };
            let result = '';
            if (tags !== '') {
                result = '<span class="marginrightsmall"><i class="fa fa-tags"></i>&nbsp;' + tagslistLinks.join(', ') + '</span>';
            }
            return result;
        },
        showPermlinkAnchor(title, permlink){
            return '<a href="/permlink/' + permlink + '">' + title + '</a>'
        },
        showCommentNumber(comments){
            let num = 0;
            if (comments.length != 0){
                comments.forEach(cm =>{
                    num +=1;
                    for (let i = 0;i < Object.keys(cm.comments).length;i ++){
                        num += 1;
                    }
                });
            }

            return num
        }
    }
}

Vue.use(sg);
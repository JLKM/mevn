const mongodb = require("mongodb");
const assert = require("assert");
const config = require('../config/db.config');
const objectID = require('mongodb').ObjectID;

const url = config.dataDB; //database url
const dbName = config.postCollection;

class PostService {

    get_post_firstPage(pgNum, fail, success) {
        let data = {
            num: 0,
            articles: []
        };
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            let collection = db.collection(dbName);
            collection.find().count((err, doc) => {
                data.num = doc;
                const skipNum = (data.num - pgNum * 5) < 0 ? 0 : data.num - pgNum * 5; //Need to skip the number of articles (If the last page is 0)
                const limitNum = (data.num - pgNum * 5) < 0 ? (data.num - (pgNum - 1) * 5) : 5; //Number of articles required for the number of pages (If the last page is made the last)
                collection.find({}, {
                    skip: skipNum,
                    limit: limitNum
                }).toArray((err, doc) => {
                    data.articles = doc;
                    success(data);
                    db.close();
                }, err => {
                    fail(err);
                    db.close();
                });
            }, err => {
                fail({
                    status: "err",
                    content: err
                });
                db.close();
            });
        });
    }

    get_post_morePage(pgNum, success, fail) {
        let data = {
            num: 0,
            articles: []
        };
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            const collection = db.collection(dbName);
            collection.find().count((err, doc) => {
                data.num = doc;
                const skipNum = (doc - pgNum * 5) < 0 ? 0 : doc - pgNum * 5; //Need to skip the number of articles (If the last page is0)
                const limitNum = (doc - pgNum * 5) < 0 ? (doc - (pgNum - 1) * 5) : 5; //Number of articles required for the number of pages (If the last page is made the last)
                collection.find({}, {
                    skip: skipNum,
                    limit: limitNum
                }).toArray((err, doc) => {
                    data.articles = doc;
                    success({
                        status: "ok",
                        content: "Post Loaded",
                        result: data
                    });
                    db.close();
                }, err => {
                    fail({
                        status: "err",
                        content: err
                    });
                    db.close();
                });
            }, err => {
                fail({
                    status: "err",
                    content: err
                });
                db.close();
            });
        });
    }

    get_post_admin(pgNum, success, fail) {
        mongodb.connect(url, (err, db) => {
            const collection = db.collection(dbName);
            collection.find({}).toArray((err, doc) => {
                if (err) {
                    fail({
                        status: "err",
                        content: "An error occurred"
                    });
                } else {
                    const startNum = pgNum * 10 - 10 <= 0 ? 0 : pgNum * 10 - 10;
                    const data = {
                        hasFst: pgNum - 1 >= 2 ? true : false,
                        hasLast: pgNum - 1 >= 1 ? true : false,
                        hasNxt: doc.length - pgNum * 10 > 1 ? true : false,
                        hasLst: doc.length / 10 + 1 - pgNum >= 2 ? true : false,
                        lastPg: Math.floor(doc.length / 10) + 1,
                        currentArticles: doc.reverse().slice(startNum, startNum + 10)
                    };
                    success({
                        status: "ok",
                        content: "Get article data",
                        result: data
                    });
                }
                db.close();
            });
        });
    }

    get_post_byCategory(categoryslug, pgNum, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    categoryslug: categoryslug
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            categoryslug,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                })
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_byDocumenttype(documenttypeslug, pgNum, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    documenttypeslug: documenttypeslug
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            documenttypeslug,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                })
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_byTags(tagsslug, pgNum, success, fail) {
        try {
            let querywords = tagsslug.split(",");
            for (let i = 0; i < querywords.length; i++) {
                querywords[i] = new RegExp(querywords[i], "gi");
            }
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    tagsslug: {
                        $all: querywords
                    }
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            tagsslug,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_byAuthor(uniqnameslug, pgNum, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    uniqnameslug: uniqnameslug
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            uniqnameslug,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                })
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_byReplier(uniqnameslug, pgNum, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    "comments.uniqnameslug": uniqnameslug
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            uniqnameslug,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                })
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_byDate(date0, pgNum, success, fail) {
        try {
            const tempdatearray = date0.split('-');
            const date = tempdatearray[2] + '-' + tempdatearray[1] + '-' + tempdatearray[0];
            const startDate = new Date(`${date.replace(/-/g," ")} 00:00:00`).getTime() / 1000;
            const startDateID = objectID(startDate); //Conversion date id
            const newDateID = objectID(startDate + 86400); //Convert the next day id
            mongodb.connect(url, (err, db) => {
                const collection = db.collection(dbName);
                collection.find({
                    _id: {
                        $gte: startDateID,
                        $lt: newDateID
                    }
                }).toArray((err, doc) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                        const data = {
                            date,
                            hasFst: pgNum - 1 >= 2 ? true : false,
                            hasLast: pgNum - 1 >= 1 ? true : false,
                            hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                            hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                            lastPg: Math.floor(doc.length / 5) + 1,
                            currentArticles: doc.reverse().slice(startNum, startNum + 5)
                        };
                        success({
                            status: "ok",
                            content: "Get article data",
                            result: data
                        });
                    }
                    db.close();
                })
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            })
        }
    }

    get_post_bySearch(search, pgNum, success, fail) {
        let keywords = search.split("+");
        for (let i = 0; i < keywords.length; i++) {
            keywords[i] = new RegExp(keywords[i], "gi");
        }
        mongodb.connect(url, (err, db) => {
            const collection = db.collection(dbName);
            collection.find({
                $or: [{
                    content: {
                        $all: keywords
                    }
                }, {
                    title: {
                        $all: keywords
                    }
                }, {
                    "comments.content": {
                        $all: keywords
                    }
                }, {
                    "comments.title": {
                        $all: keywords
                    }
                }]
            }).toArray((err, doc) => {
                if (err) {
                    fail({
                        status: "err",
                        content: "An error occurred"
                    })
                } else {
                    const startNum = pgNum * 5 - 5 <= 0 ? 0 : pgNum * 5 - 5;
                    const data = {
                        hasFst: pgNum - 1 >= 2 ? true : false,
                        hasLast: pgNum - 1 >= 1 ? true : false,
                        hasNxt: doc.length - pgNum * 5 > 1 ? true : false,
                        hasLst: doc.length / 5 + 1 - pgNum >= 2 ? true : false,
                        lastPg: Math.floor(doc.length / 5) + 1,
                        currentArticles: doc.reverse().slice(startNum, startNum + 5)
                    };
                    success({
                        status: "ok",
                        content: "Get search data",
                        result: data
                    });
                }
                db.close();
            })
        });
    }

    get_post_one(id, ip, successs, fail) {

        let hasError = false;
        let data = {};
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            const collection = db.collection(dbName);
            try {
                collection.find({
                    _id: {
                        $gt: objectID(id)
                    }
                }, {
                    limit: 1,
                    fields: {
                        _id: 1,
                        title: 1
                    }
                }).toArray((err, doc) => {
                    //Get the next article
                    if (err && !hasError) {
                        hasError = true;
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        data.nxtArticle = doc.length == 0 ? "No Result" : doc[0]
                    }
                    if (Object.keys(data).length == 3) {
                        successs({
                            status: "ok",
                            content: "Article data obtained",
                            data
                        });
                    }
                });

                collection.findAndModify({
                    _id: objectID(id)
                }, [], {
                    $inc: {
                        hits: 1
                    }
                }, {
                    new: true
                }, (err, doc) => {
                    if (err) {
                        hasError = true;
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        let article = doc.value;

                        if (doc.value.comments.length != 0) {
                            //Check if ip has already commented on the comment

                            let comments = []
                            doc.value.comments.forEach(comment => {
                                const starred = comment.stars.ip.findIndex(starred => starred == ip) !== -1 ? true : false;
                                let newComment = {
                                    _id: comment._id,
                                    title: comment.title,
                                    sourcelink: comment.sourcelink,
                                    username: comment.username,
                                    usermail: comment.usermail,
                                    userlg: comment.userlg,
                                    fullname: comment.fullname,
                                    fullnameslug: comment.fullnameslug,
                                    uniqnameslug: comment.uniqnameslug,
                                    content: comment.content,
                                    stars: {
                                        starred,
                                        num: comment.stars.num,
                                    }
                                };
                                if (Object.keys(comment.comments).length != 0) {
                                    let subComments = {};
                                    for (let sub in comment.comments) {
                                        const substarred = comment.comments[sub].stars.ip.findIndex(starred => starred == ip) !== -1 ? true : false;
                                        subComments[sub] = {
                                            title: comment.comments[sub].title,
                                            sourcelink: comment[sub].sourcelink,
                                            username: comment[sub].username,
                                            usermail: comment[sub].usermail,
                                            userlg: comment[sub].userlg,
                                            fullname: comment[sub].fullname,
                                            fullnameslug: comment[sub].fullnameslug,
                                            uniqnameslug: comment[sub].uniqnameslug,
                                            content: comment.comments[sub].content,
                                            stars: {
                                                starred: substarred,
                                                num: comment.comments[sub].stars.num,
                                            }
                                        };
                                    }
                                    newComment.comments = subComments;
                                }
                                comments.push(newComment);
                            });
                            article.comments = comments;
                        }
                        data.article = article;
                    }
                    if (Object.keys(data).length == 3) {
                        successs({
                            status: "ok",
                            content: "Article data obtained",
                            data
                        });
                    }
                });

                collection.find({
                    _id: {
                        $lt: objectID(id)
                    }
                }, {
                    limit: 1,
                    fields: {
                        _id: 1,
                        title: 1
                    }
                }).sort({
                    _id: -1
                }).toArray((err, doc) => {
                    //Get the last article
                    if (err && !hasError) {
                        hasError = true;
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        data.lstArticle = doc.length == 0 ? "No Result" : doc[0]
                    }

                    if (Object.keys(data).length == 3) {
                        successs({
                            status: "ok",
                            content: "Article data obtained",
                            data
                        });
                    }
                });
            } catch (e) {
                if (!hasError) {
                    hasError = true;
                    fail({
                        status: "err",
                        content: "Error id"
                    });
                }
            }
        });

    }

    get_post_one_permlink(permlink, ip, successs, fail) {
        let hasError = false;
        let data = {};
        var baseid;
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            const collection = db.collection(dbName);
            collection.findOne({
                permlink: permlink
            }, {
                fields: {
                    _id: 1,
                    title: 1,
                    maintag: 1,
                    titleslug: 1,
                    categoryslug: 1,
                    maintagslug: 1,
                    permlink: 1
                }
            }).then((basedoc, baseid) => {
                if (basedoc === null) {
                    successs({
                        status: "un",
                        content: "Article not found"
                    });
                } else {
                    baseid = basedoc._id.toString();
                }
                try {
                    // ACTUAL DOCUMENT
                    collection.findAndModify({
                        _id: objectID(baseid)
                    }, [], {
                        $inc: {
                            hits: 1
                        }
                    }, {
                        new: true
                    }, (err, doc) => {
                        if (err) {
                            hasError = true;
                            fail({
                                status: "err",
                                content: "An error occurred"
                            });
                        } else {
                            let article = doc.value;
                            if (doc.value === null) {
                                let comments = []
                            } else {
                            if (doc.value.comments.length != 0) {
                                //Check if ip has already commented on the comment

                                let comments = []
                                doc.value.comments.forEach(comment => {
                                    const starred = comment.stars.ip.findIndex(starred => starred == ip) !== -1 ? true : false;
                                    let newComment = {
                                        _id: comment._id,
                                        title: comment.title,
                                        sourcelink: comment.sourcelink,
                                        username: comment.username,
                                        usermail: comment.usermail,
                                        userlg: comment.userlg,
                                        fullname: comment.fullname,
                                        fullnameslug: comment.fullnameslug,
                                        uniqnameslug: comment.uniqnameslug,
                                        content: comment.content,
                                        stars: {
                                            starred,
                                            num: comment.stars.num,
                                        }
                                    };
                                    if (Object.keys(comment.comments).length != 0) {
                                        let subComments = {};
                                        for (let sub in comment.comments) {
                                            const substarred = comment.comments[sub].stars.ip.findIndex(starred => starred == ip) !== -1 ? true : false;
                                            subComments[sub] = {
                                                title: comment.comments[sub].title,
                                                username: comment.comments[sub].username,
                                                usermail: comment.comments[sub].usermail,
                                                userlg: comment.comments[sub].userlg,
                                                fullname: comment.comments[sub].fullname,
                                                fullnameslug: comment.comments[sub].fullnameslug,
                                                uniqnameslug: comment.comments[sub].uniqnameslug,
                                                content: comment.comments[sub].content,
                                                stars: {
                                                    starred: substarred,
                                                    num: comment.comments[sub].stars.num,
                                                }
                                            };
                                        }
                                        newComment.comments = subComments;
                                    }
                                    comments.push(newComment);
                                });
                                article.comments = comments;
                            }
                        }
                            data.article = article;
                        }
                        if (Object.keys(data).length == 3) {
                            successs({
                                status: "ok",
                                content: "Article data obtained",
                                data
                            });
                        }
                    });

                    // NEXT DOCUMENT
                    collection.find({
                        _id: {
                            $gt: objectID(baseid)
                        }
                    }, {
                        limit: 1,
                        fields: {
                            _id: 1,
                            title: 1,
                            maintag: 1,
                            titleslug: 1,
                            categoryslug: 1,
                            maintagslug: 1,
                            permlink: 1
                        }
                    }).toArray((err, docnxt) => {
                        //Get the next article
                        if (err && !hasError) {
                            hasError = true;
                            fail({
                                status: "err",
                                content: "An error occurred"
                            });
                        } else {
                            data.nxtArticle = docnxt.length == 0 ? "No Result" : docnxt[0]
                        }
                        if (Object.keys(data).length == 3) {
                            successs({
                                status: "ok",
                                content: "Article data obtained",
                                data
                            });
                        }
                    });

                    // PREVIOUS DOCUMENT
                    collection.find({
                        _id: {
                            $lt: objectID(baseid)
                        }
                    }, {
                        limit: 1,
                        fields: {
                            _id: 1,
                            title: 1,
                            maintag: 1,
                            titleslug: 1,
                            categoryslug: 1,
                            maintagslug: 1,
                            permlink: 1
                        }
                    }).sort({
                        _id: -1
                    }).toArray((err, doclst) => {
                        //Get the last article
                        if (err && !hasError) {
                            hasError = true;
                            fail({
                                status: "err",
                                content: "An error occurred"
                            });
                        } else {
                            data.lstArticle = doclst.length == 0 ? "No Result" : doclst[0]
                        }
                        if (Object.keys(data).length == 3) {
                            successs({
                                status: "ok",
                                content: "Article data obtained",
                                data
                            });
                        }
                    });

                } catch (e) {
                    if (!hasError) {
                        hasError = true;
                        fail({
                            status: "err",
                            content: "Error id"
                        });
                    }
                }
            }); // moved from .then
        });

    }

    create_new_post(data, success, fail) {
        data.comments = [];
        data.hits = 0;
        mongodb.connect(url, (err, db) => {
            assert.equal(null, err);
            const collection = db.collection(dbName);
            collection.insertOne(data).then((doc, err) => {
                if (err) {
                    fail({
                        status: "err",
                        content: "An error occurred"
                    });
                } else {
                    success({
                        status: "ok",
                        content: "The article was published successfully"
                    });
                }
            });
        });
    }

    update_post(data, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(data.id)
                }, {
                    $set: {
                        title: data.title,
                        content: data.content,
                        category: data.category,
                        allowcomments: data.allowcomments,
                        allowsubcomments: data.allowsubcomments
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Article modified successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }

    }

    del_post(id, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.deleteOne({
                    _id: objectID(id)
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Article deleted successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }

    }

    create_comment(data, success, fail) {
        try {
            const commentID = Date.now() / 1000;
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(data.id)
                }, {
                    $push: {
                        comments: {
                            "_id": objectID(commentID),
                            "title": data.title,
                            "sourcelink": data.sourcelink,
                            "username": data.username,
                            "usermail": data.usermail,
                            "userlg": data.userlg,
                            "fullname": data.fullname,
                            "fullnameslug": data.fullnameslug,
                            "uniqnameslug": data.uniqnameslug,
                            "content": data.content,
                            "comments": [],
                            "stars": {
                                num: 0,
                                ip: []
                            }
                        }
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Comments published successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }

    create_subcomment(id, data, success, fail) {
        try {
            let query = {};
            const subCommentID = Date.now() / 1000;
            query[objectID(subCommentID)] = {
                username: data.username,
                usermail: data.usermail,
                userlg: data.userlg,
                fullname: data.fullname,
                fullnameslug: data.fullnameslug,
                uniqnameslug: data.uniqnameslug,
                content: data.content,
                stars: {
                    num: 0,
                    ip: []
                }
            };
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(id),
                    "comments._id": objectID(data.id)
                }, {
                    $set: {
                        "comments.$.comments": query
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Comments published successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }

    delete_comment_all(id, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(id)
                }, {
                    $set: {
                        comments: []
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Comments are cleared"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }

    delete_sub_comment_all(id, commentid, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(id),
                    "comments.$._id": objectID(commentid)
                }, {
                    $set: {
                        "comments.$.comments": []
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Sub commentary cleared"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }


    delete_comment(id, commentId, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    _id: objectID(id)
                }, {
                    $pull: {
                        comments: {
                            _id: objectID(commentId)
                        }
                    }
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Comments deleted successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }

    delete_sub_comment(params, success, fail) {
        try {
            let query = {};
            query[`comments.$.comments.${params.subid}`] = "";
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.updateOne({
                    "comments._id": objectID(params.commentid)
                }, {
                    $unset: query
                }).then((doc, err) => {
                    if (err) {
                        fail({
                            status: "err",
                            content: "An error occurred"
                        });
                    } else {
                        success({
                            status: "ok",
                            content: "Sub commentary deleted successfully"
                        });
                    }
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "Error id"
            })
        }
    }

    stars_comment(data, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.findOne({
                    "comments._id": objectID(data.commentid)
                }, {
                    "comments.$": 1
                }).then((doc, err) => {
                    let stars = doc.comments[0].stars;
                    const ipIndex = doc.comments[0].stars.ip.findIndex(starip => starip === data.ip);
                    if (ipIndex == -1) {
                        stars.num += 1;
                        stars.ip.push(data.ip);
                    } else {
                        stars.num -= 1;
                        stars.ip.splice(ipIndex, 1);
                    }

                    collection.updateOne({
                        _id: objectID(data.id),
                        "comments._id": objectID(data.commentid)
                    }, {
                        $set: {
                            "comments.$.stars": stars
                        }
                    }).then((doc, err) => {
                        if (err) {
                            fail({
                                status: "err",
                                content: "An error occurred"
                            });
                        } else {
                            success({
                                status: "ok",
                                content: "Comment stars"
                            });
                        }
                    });
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            });
        }
    }

    stars_sub_comment(data, success, fail) {
        try {
            mongodb.connect(url, (err, db) => {
                assert.equal(null, err);
                const collection = db.collection(dbName);
                collection.findOne({
                    "comments._id": objectID(data.commentid)
                }, {
                    "comments.$.comments": 1
                }).then((doc, err) => {
                    let substars = doc.comments[0].comments[data.subid].stars;
                    const ipIndex = substars.ip.findIndex(starip => starip === data.ip);
                    if (ipIndex == -1) {
                        substars.num += 1;
                        substars.ip.push(data.ip);
                    } else {
                        substars.num -= 1;
                        substars.ip.splice(ipIndex, 1);
                    }

                    let query = {};
                    query[`comments.$.comments.${data.subid}.stars`] = substars;
                    collection.updateOne({
                        "comments._id": objectID(data.commentid)
                    }, {
                        $set: query
                    }).then((doc, err) => {
                        if (err) {
                            fail({
                                status: "err",
                                content: "An error occurred"
                            });
                        } else {
                            success({
                                status: "ok",
                                content: "Sub comment stars"
                            });
                        }
                    });
                });
            });
        } catch (err) {
            fail({
                status: "err",
                content: "An error occurred"
            });
        }
    }
}

module.exports = {
    PostService: PostService
};
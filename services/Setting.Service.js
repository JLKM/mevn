const mongodb = require("mongodb");
const assert = require("assert");
const config = require('../config/db.config');


const url = config.dataDB; //database url
const dbName = config.settingCollection;

class SettingService{
    get_setting(success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            const collection = db.collection(dbName); 
            collection.findOne({_id:1}).then((doc) => {
                success({status:"ok",content:"Setting Found",settings:doc});
            },(err)=>{
                fail({status:"err",content:"Error Happened"});
            });
            db.close();
        }); 
    }

    update_general_setting(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{title:data.title,subTitle:data.subTitle,aboutTitle:data.aboutTitle,aboutText:data.aboutText,profileTitle:data.profileTitle,profileText:data.profileText,descri:data.description,keywords:data.keywords,author:data.author}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An error occurred",result:err});
                }else{
                    success({status:"ok",content:"Set update success"});
                }
            });
        });
    }

    update_header_links(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{headerLink:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An error occurred",result:err});
                }else{
                    success({status:"ok",content:"Navigation update is successful"});
                }
            });
        });
    }

    update_categories(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{categories:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An update_categories error occurred",result:err});
                }else{
                    success({status:"ok",content:"Website was successfully updated"});
                }
            });
        });
    }

    update_sidebar(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{sideBarComps:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An error occurred",result:err});
                }else{
                    success({status:"ok",content:"Article sidebar update success"});
                }
            });
        });
    }

    update_user_general(data,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            let collection = db.collection(dbName); 
            collection.updateOne({_id:1},{$set:{usersControl:data}}).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An error occurred",result:err});
                }else{
                    success({status:"ok",content:"User base update is successful"});
                }
            });
        });     
    }

}


module.exports = {SettingService:SettingService};
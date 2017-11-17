const mongodb = require("mongodb");
const assert = require("assert");
const config = require('../config/db.config');
const objectID = require('mongodb').ObjectID;

const url = config.dataDB; //database url
const dbName = config.userCollection;

class UserService{
    user_auth(username,password,success,error){
        //user authentication
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.findOne({username:username}).then((doc) => {
                if (doc === null){
                    success({status:"un",content:"User name not found"}); 
                }else if (doc.password != password){
                    success({status:"pw",content:"User password is incorrect"});
                }else{
                    success({status:"ok",content:"Login successful",result:doc});
                }
            },(err)=>{
                error({status:"err",content:"An error occurred"});
            });
            db.close();
        });
    }

    get_matched_users(kyWrds,success,fail){
        const re = new RegExp(kyWrds,"gi");
        mongodb.connect(url,(err,db) =>{
            assert.equal(null, err);
            let collection = db.collection(dbName); 
            collection.find({$or:[{username:re},{email:kyWrds}]},{_id:1,username:1}).toArray((error,doc) => {
                if (error) {
                    error({status:"err",content:"An error occurred",result:error});
                }else{
                    success({status:"ok",content:"User information is available",result:doc});
                }
            },(err)=>{
                error({status:"err",content:"An error occurred",result:err});
            });
            db.close();
        });
    }

    get_user_info_one(id,success,error){
        //get username & password
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.findOne({_id:objectID(id)}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"An error occurred",result:error});
                    }else{
                        success({status:"ok",content:"User information is available",result:doc});
                    }
                },(err)=>{
                    error({status:"err",content:"An error occurred",result:err});
                });
                db.close();
            });
        } catch (err) {
            error({status:"err",content:"Wrong userID",result:err});
        }
    }

    update_user_info_admin(user,success,error){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.update({_id:objectID(user.id)},{$set:{
                    username:user.username,
                    password:user.password,
                    fullname:user.fullname,
                    fullnameslug:user.fullnameslug,
                    email:user.email,
                    lg:user.lg,
                    useruniqintern:user.useruniqintern,
                    useruniqextern:user.useruniqextern,
                    userdescription:user.userdescription,
                    userlink:user.userlink,
                    usertype:user.usertype
                }}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"An error occurred",result:error});
                    }else{
                        success({status:"ok",content:"User information is updated successfully"});
                    }
                },(err)=>{
                    error({status:"err",content:"An error occurred",result:err});
                });
                db.close();
            });
        }catch (err){
            error({status:"err",content:"Wrong userID",result:err});
        }
    }

    update_user_info(user,success,error){
        try {
            mongodb.connect(url,(err,db) =>{
                assert.equal(null, err);
                let collection = db.collection(dbName); 
                collection.update({_id:objectID(user.id)},{$set:{
                    password:user.password,
                    email:user.email
                }}).then((doc,error) => {
                    if (error) {
                        error({status:"err",content:"An error occurred",result:error});
                    }else{
                        success({status:"ok",content:"User information is updated successfully"});
                    }
                },(err)=>{
                    error({status:"err",content:"An error occurred",result:err});
                });
                db.close();
            });
        }catch (err){
            error({status:"err",content:"Wrong userID",result:err});
        }
    }

    signup_user(user,success,fail){
        mongodb.connect(url,(err,db) =>{
            assert.equal(null,err);
            const collection = db.collection(dbName); 
            collection.insertOne(user).then((doc,err) =>{
                if (err){
                    fail({status:"err",content:"An error occurred"});
                }else{
                    success({status:"ok",content:"User registration is successful"});
                }
            });
        });
    }
}

module.exports = {UserService:UserService};

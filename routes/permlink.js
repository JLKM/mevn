const routers = require('express').Router();
const services = require('../services/Post.Service');
const postSrv = new services.PostService();

routers.get('/:cat/:subcat/:slug',(req,res,next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    let permlink = req.params.cat + '/' + req.params.subcat + '/' + req.params.slug;
    postSrv.get_post_one_permlink(permlink,ip,result =>{
        req.article = result.data;
        // res.redirect('/' + encodeURIComponent(req.params.permlink));
        next();
    },err => {
        res.redirect('/errorpermlink');
    });
});

routers.get('/:cat/:subcat/:slug/client',(req,res,next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress.split(":").pop();
    let permlink = req.params.cat + '/' + req.params.subcat + '/' + req.params.slug;
    postSrv.get_post_one_permlink(permlink,ip,result =>{
        res.send(result);
    },err => {
        res.redirect('/error');
    });
});

module.exports = routers;
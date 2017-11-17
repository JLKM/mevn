const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Nuxt = require('nuxt');
const nuxtConfig = require('./config/nuxt.config');
const nuxt = new Nuxt(nuxtConfig);

const user = require('./routes/user');
const preloads = require('./routes/preloads');
const admin = require('./routes/admin');
const post = require('./routes/post');
const articles = require('./routes/articles');
const documenttype = require('./routes/documenttype');
const category = require('./routes/category');
const tags = require('./routes/tags');
const permlink = require('./routes/permlink');
const date = require('./routes/date');
const author = require('./routes/author');
const replier = require('./routes/replier');
const search = require('./routes/search');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(session({
  secret:'mevn',
  cookie:{ maxAge:60*60*1000*24 },
  resave:false,
  saveUninitialized:false
}));

app.use("/user",user);
app.use("/post",post);
app.use("/admin",admin);
app.use("*",preloads); //loading preload data
app.use("/articles",articles);
app.use("/documenttype",documenttype);
app.use("/category",category);
app.use("/permlink",permlink);
app.use("/tags",tags);
app.use("/date",date);
app.use("/author",author);
app.use("/replier",replier);
app.use("/search",search);
app.use(nuxt.render);

if (nuxtConfig.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

const server = app.listen(8085, function () {

    const host = server.address().address;
    const port = server.address().port; 

    console.log("Server Started", host, port);

});
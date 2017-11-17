import Vue from 'vue';
import Vuex from 'vuex';
import categories from "./categories";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    articleNum:0,
    articles:[],
    user:{},
    isLogin:false,
    headerLink:[],
    sideBarComps : {},
    postCategories: [],
    mevnTitle:"MEVN CMS",
    screenWidth:0,
    currentArticle: {},
    mevnSubTitle:"JLKM CMS",
    mevnDescription:"",
    mevnKyWrds:"",
    mevnAuthor:"",
    usersControl:{}
  },
  mutations: {
      login (state,user) {
          state.user = user;
          state.isLogin = true;
      },
      loadSetting (state,setting){
          state.headerLink = setting.headerLink;
          state.sideBarComps = setting.sideBarComps;
          state.mevnTitle = setting.title;
          state.postCategories = setting.categories;
          state.postDocumenttypes = setting.documenttypes[0].name;
          state.postLanguages = setting.languages[0].name;
          state.mevnSubTitle = setting.subTitle;
          state.mevnDescription = setting.descri;
          state.mevnKyWrds = setting.keywords;
          state.mevnAuthor = setting.author;
          state.usersControl = setting.usersControl;
          state.aboutTitle = setting.aboutTitle;
          state.aboutText = setting.aboutText;
          state.aboutLinkEN = setting.aboutLinkEN;
          state.aboutLinkDA = setting.aboutLinkDA;
          state.profileTitle = setting.profileTitle;
          state.profileText = setting.profileText;
      },
      getArticleNum (state,data){
          state.articleNum = data.num;
          state.articles = data.articles.reverse();
      },
      getArticle (state,articles){
          state.articles = articles.reverse();
      },
      loadArticleDetail (state,article){
          state.currentArticle = article;
      },
      updateGeneralSetting (state,settings){
          state.mevnTitle = settings.title;
          state.mevnSubTitle = settings.subTitle;
          state.mevnDescription = settings.description;
          state.mevnKyWrds = settings.keywords;
          state.mevnAuthor = settings.author;
      },
      updateHeaderLinks (state,links){
          state.headerLink = links;
      },
      updateSidebar (state,sidebars){
          state.sideBarComps = sidebars;
      },
      updateCategories (state,cg) {
          state.postCategories = cg;
      },
      updateDocumenttypes (state,dt) {
        state.postDocumenttypes = dt;
      },
      updateLanguages (state,lg) {
        state.postLanguages = lg;
      },
      updateUsersControl (state,setting){
          state.usersControl = setting;
      },
      updateUserInfo(state,infos){
          state.user.email = infos.email;
          state.user.password = infos.password;
      }
  },
  actions:{
      nuxtServerInit({commit},{req}){
          
          commit('loadSetting',req.preLoad.settings);

          if (req.session.user !== undefined) {
              commit('login',req.session.user);
          }

          if (req.originalUrl.substring(0,6) === "/pages"){
              commit('getArticleNum',req.preLoad.articles);
          }
      }
  },
  modules:{
      categories
  }
});

export default  store;
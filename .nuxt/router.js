'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _6c684efc = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index.vue') : require('/data/fullstack/mevn/pages/index.vue')

const _532fb56e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/date/_date.vue') : require('/data/fullstack/mevn/pages/index/date/_date.vue')

const _2ffa71f1 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/date/_date/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/date/_date/pages/_pgNum.vue')

const _1d6a36df = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/tags/_tags.vue') : require('/data/fullstack/mevn/pages/index/tags/_tags.vue')

const _22dfb7ca = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/tags/_tags/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/tags/_tags/pages/_pgNum.vue')

const _73d38358 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/pages/_pgNum.vue')

const _fa2225fa = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/author/_author.vue') : require('/data/fullstack/mevn/pages/index/author/_author.vue')

const _10138877 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/author/_author/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/author/_author/pages/_pgNum.vue')

const _56f1db3d = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/search/_search.vue') : require('/data/fullstack/mevn/pages/index/search/_search.vue')

const _a5f9ef06 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/search/_search/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/search/_search/pages/_pgNum.vue')

const _da526f26 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/replier/_replier.vue') : require('/data/fullstack/mevn/pages/index/replier/_replier.vue')

const _de45ed66 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/replier/_replier/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/replier/_replier/pages/_pgNum.vue')

const _4bc9b02e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/category/_category.vue') : require('/data/fullstack/mevn/pages/index/category/_category.vue')

const _254e995e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/category/_category/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/category/_category/pages/_pgNum.vue')

const _2b4dec57 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/documenttype/_documenttype.vue') : require('/data/fullstack/mevn/pages/index/documenttype/_documenttype.vue')

const _791111a3 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/documenttype/_documenttype/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/documenttype/_documenttype/pages/_pgNum.vue')

const _3ab52826 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/index/_pgNum.vue') : require('/data/fullstack/mevn/pages/index/_pgNum.vue')

const _472e17c2 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index.vue') : require('/data/fullstack/mevn/pages/admin/index.vue')

const _689fc20a = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/users.vue') : require('/data/fullstack/mevn/pages/admin/index/users.vue')

const _342a3d3e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/users/index.vue') : require('/data/fullstack/mevn/pages/admin/index/users/index.vue')

const _67f014d6 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/users/profile.vue') : require('/data/fullstack/mevn/pages/admin/index/users/profile.vue')

const _591c59a0 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/users/profile/id/_user.vue') : require('/data/fullstack/mevn/pages/admin/index/users/profile/id/_user.vue')

const _310aff1b = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/general.vue') : require('/data/fullstack/mevn/pages/admin/index/general.vue')

const _f801cbcc = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/articles.vue') : require('/data/fullstack/mevn/pages/admin/index/articles.vue')

const _df3cce80 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/articles/pages/_pgNum.vue') : require('/data/fullstack/mevn/pages/admin/index/articles/pages/_pgNum.vue')

const _9848874a = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/category.vue') : require('/data/fullstack/mevn/pages/admin/index/category.vue')

const _18c2529e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/category/index.vue') : require('/data/fullstack/mevn/pages/admin/index/category/index.vue')

const _7044b9b0 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/category/sidebar.vue') : require('/data/fullstack/mevn/pages/admin/index/category/sidebar.vue')

const _164e91a1 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/category/articles.vue') : require('/data/fullstack/mevn/pages/admin/index/category/articles.vue')

const _4ed729a9 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/admin/index/messages.vue') : require('/data/fullstack/mevn/pages/admin/index/messages.vue')

const _0d91f6b8 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/error.vue') : require('/data/fullstack/mevn/pages/error.vue')

const _1982913d = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/articles.vue') : require('/data/fullstack/mevn/pages/articles.vue')

const _19edf868 = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/articles/_id.vue') : require('/data/fullstack/mevn/pages/articles/_id.vue')

const _7cefcb6a = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/permlink.vue') : require('/data/fullstack/mevn/pages/permlink.vue')

const _71805e2d = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug.vue') : require('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug.vue')

const _1250d2ed = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug00.vue') : require('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug00.vue')

const _125eea6e = process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug01.vue') : require('/data/fullstack/mevn/pages/permlink/_cat/_subcat/_slug01.vue')


const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.scrollToTop || (r.components.default.options && r.components.default.options.scrollToTop))) {
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  scrollBehavior,
  routes: [
		{
			path: "/",
			component: _6c684efc,
			name: "index",
			children: [
				{
					path: "date/:date?",
					component: _532fb56e,
					name: "index-date-date",
					children: [
						{
							path: "pages/:pgNum?",
							component: _2ffa71f1,
							name: "index-date-date-pages-pgNum"
						}
					]
				},
				{
					path: "tags/:tags?",
					component: _1d6a36df,
					name: "index-tags-tags",
					children: [
						{
							path: "pages/:pgNum?",
							component: _22dfb7ca,
							name: "index-tags-tags-pages-pgNum"
						}
					]
				},
				{
					path: "pages/:pgNum?",
					component: _73d38358,
					name: "index-pages-pgNum"
				},
				{
					path: "author/:author?",
					component: _fa2225fa,
					name: "index-author-author",
					children: [
						{
							path: "pages/:pgNum?",
							component: _10138877,
							name: "index-author-author-pages-pgNum"
						}
					]
				},
				{
					path: "search/:search?",
					component: _56f1db3d,
					name: "index-search-search",
					children: [
						{
							path: "pages/:pgNum?",
							component: _a5f9ef06,
							name: "index-search-search-pages-pgNum"
						}
					]
				},
				{
					path: "replier/:replier?",
					component: _da526f26,
					name: "index-replier-replier",
					children: [
						{
							path: "pages/:pgNum?",
							component: _de45ed66,
							name: "index-replier-replier-pages-pgNum"
						}
					]
				},
				{
					path: "category/:category?",
					component: _4bc9b02e,
					name: "index-category-category",
					children: [
						{
							path: "pages/:pgNum?",
							component: _254e995e,
							name: "index-category-category-pages-pgNum"
						}
					]
				},
				{
					path: "documenttype/:documenttype?",
					component: _2b4dec57,
					name: "index-documenttype-documenttype",
					children: [
						{
							path: "pages/:pgNum?",
							component: _791111a3,
							name: "index-documenttype-documenttype-pages-pgNum"
						}
					]
				},
				{
					path: ":pgNum?",
					component: _3ab52826,
					name: "index-pgNum"
				}
			]
		},
		{
			path: "/admin",
			component: _472e17c2,
			name: "admin",
			children: [
				{
					path: "users",
					component: _689fc20a,
					children: [
						{
							path: "",
							component: _342a3d3e,
							name: "admin-index-users"
						},
						{
							path: "profile",
							component: _67f014d6,
							name: "admin-index-users-profile",
							children: [
								{
									path: "id/:user?",
									component: _591c59a0,
									name: "admin-index-users-profile-id-user"
								}
							]
						}
					]
				},
				{
					path: "general",
					component: _310aff1b,
					name: "admin-index-general"
				},
				{
					path: "articles",
					component: _f801cbcc,
					name: "admin-index-articles",
					children: [
						{
							path: "pages/:pgNum?",
							component: _df3cce80,
							name: "admin-index-articles-pages-pgNum"
						}
					]
				},
				{
					path: "category",
					component: _9848874a,
					children: [
						{
							path: "",
							component: _18c2529e,
							name: "admin-index-category"
						},
						{
							path: "sidebar",
							component: _7044b9b0,
							name: "admin-index-category-sidebar"
						},
						{
							path: "articles",
							component: _164e91a1,
							name: "admin-index-category-articles"
						}
					]
				},
				{
					path: "messages",
					component: _4ed729a9,
					name: "admin-index-messages"
				}
			]
		},
		{
			path: "/error",
			component: _0d91f6b8,
			name: "error"
		},
		{
			path: "/articles",
			component: _1982913d,
			name: "articles",
			children: [
				{
					path: ":id?",
					component: _19edf868,
					name: "articles-id"
				}
			]
		},
		{
			path: "/permlink",
			component: _7cefcb6a,
			name: "permlink",
			children: [
				{
					path: ":cat?/:subcat?/:slug?",
					component: _71805e2d,
					name: "permlink-cat-subcat-slug"
				},
				{
					path: ":cat?/:subcat?/:slug00?",
					component: _1250d2ed,
					name: "permlink-cat-subcat-slug00"
				},
				{
					path: ":cat?/:subcat?/:slug01?",
					component: _125eea6e,
					name: "permlink-cat-subcat-slug01"
				}
			]
		}
  ]
})

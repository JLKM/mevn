<template>
  <div id="__nuxt">
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
let layouts = {

  "_default": process.BROWSER_BUILD ? () => System.import('/data/fullstack/mevn/node_modules/nuxt/dist/app/layouts/default.vue') : require('/data/fullstack/mevn/node_modules/nuxt/dist/app/layouts/default.vue')

}

export default {
  head: {"link":[{"rel":"stylesheet","href":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"},{"rel":"stylesheet","href":"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"},{"rel":"stylesheet","href":"/style/main.css"},{"rel":"icon","type":"image/png","href":"/images/favicon.png"}]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      if (typeof layouts[_layout] === 'function') {
        return this.loadLayout(_layout)
      }
      this.layout = layouts[_layout]
      return Promise.resolve(this.layout)
    },
    loadLayout (_layout) {
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        this.layout = layouts[_layout]
        return this.layout
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  }
}
</script>



import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13349643 = () => interopDefault(import('../pages/help/index.vue' /* webpackChunkName: "pages/help/index" */))
const _d6c1f120 = () => interopDefault(import('../pages/info/index.vue' /* webpackChunkName: "pages/info/index" */))
const _3534e80e = () => interopDefault(import('../pages/privacypolicy/index.vue' /* webpackChunkName: "pages/privacypolicy/index" */))
const _683b303e = () => interopDefault(import('../pages/rule/index.vue' /* webpackChunkName: "pages/rule/index" */))
const _dffa391a = () => interopDefault(import('../pages/post_images/_id.vue' /* webpackChunkName: "pages/post_images/_id" */))
const _f531ee3a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/help",
      component: _13349643,
      name: "help"
    }, {
      path: "/info",
      component: _d6c1f120,
      name: "info"
    }, {
      path: "/privacypolicy",
      component: _3534e80e,
      name: "privacypolicy"
    }, {
      path: "/rule",
      component: _683b303e,
      name: "rule"
    }, {
      path: "/post_images/:id?",
      component: _dffa391a,
      name: "post_images-id"
    }, {
      path: "/",
      component: _f531ee3a,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}

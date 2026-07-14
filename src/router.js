import { createRouter, createWebHistory } from 'vue-router'
import site from 'virtual:site'
import Home from './views/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Home' } },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./views/NotFound.vue'),
    meta: { title: 'Not found' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved ?? { top: 0 },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${site.siteName}` : site.siteName
})

export default router

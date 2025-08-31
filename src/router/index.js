import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostDetail from '@/views/PostDetail.vue'
import EditPost from '@/views/EditPost.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/create/post',
      name: 'CreatePost',
      component: CreatePost,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail/post/:id',
      name: 'PostDetail',
      component: PostDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/post/:id',
      name: 'EditPost',
      component: EditPost,
      meta: { requiresAuth: true }
    },
  ],
})

// middleware check auth
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    fetch('http://localhost:8080/postgo/check-auth', {
      credentials: 'include'
    })

    .then(response => {
      if (response.ok) {
        next()
      } else {
        next('/login')
      }
    })

    .catch(() => next('/login'))
  } else {
    next()
  }
})

export default router

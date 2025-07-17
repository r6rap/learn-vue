import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostDetail from '@/views/PostDetail.vue'
import EditPost from '@/views/EditPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/create/post',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/detail/post/:id',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/edit/post/:id',
      name: 'EditPost',
      component: EditPost
    }
  ],
})

export default router

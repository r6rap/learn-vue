<script setup>
import { ref, onMounted, computed } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { usePostStore } from '@/stores/posts'

const postStore = usePostStore()

// membuat reactive array, reactive = kalau data berubah maka ui juga berubah
const posts = computed(() => postStore.posts)
const loading = computed(() => postStore.loading)
const postCache = computed(() => postStore.postCache)
const prefetchingId = computed(() => postStore.prefetchingId)
const username = ref('')
const error = ref(null)

console.log("home view")

const handleHover = (post_id) => {
  console.log(`hover post: ${post_id}`)
  postStore.prefetchPost(post_id)
}

const handleMouseLeave = () => {
  console.log('mouse leave post')
  postStore.cancelPrefetch()
}

const isPostCached = (post_id) => postStore.isPostCached(post_id)
const isPrefetching = (post_id) => postStore.isPrefetching(post_id)

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

const refreshPosts = () => {
  postStore.clearCache()
  postStore.fetchPosts()
}

async function fetchUser() {
  try {
    const res = await fetch('http://localhost:8080/postgo/dashboard', {
      method: 'GET',
      credentials: 'include', // include cookies in the request
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const data = await res.json()
      username.value = data.data.username
    } else {
      username.value = 'Guest'
    }
  } catch (err) {
    console.error('Error fetching user:', err)
    username.value = 'Guest'
  }
}

// lifecycle hook onMounted, fungsi yang akan dijalankan setelah komponen tampil di layar
onMounted(async () => {
  try {
    await Promise.all([fetchUser(), postStore.fetchPosts()])
  } catch (error) {
    error.value = 'Error loading data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-black text-white font-mono p-4 sm:p-8">
    <!-- Title -->
    <h2 class="text-xl sm:text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
      $ Dashboard
    </h2>

    <!-- Welcome -->
    <p class="mb-6 text-green-400">
      > Welcome, {{ username }}!
    </p>

    <!-- loading / error / posts -->
    <div v-if="loading" class="text-gray-400">
      > Loading posts...
    </div>
    <div v-else-if="error" class="text-red-500">
      ! {{ error }}
    </div>
    <div v-else class="space-y-4">
      <PostCard 
        v-for="post in posts"
        :key="post.post_id"
        :id="post.post_id"
        :title="post.post_title"
        :body="post.post_body"
        @mouseenter="handleHover(post.post_id)"
        @mouseleave="handleMouseLeave(post.post_id)"
      />
    </div>
  </div>
</template>
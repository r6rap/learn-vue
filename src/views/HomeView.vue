<script setup>
import { ref, onMounted, computed } from 'vue'
import PostCard from '@/components/PostCard.vue'

// membuat reactive array, reactive = kalau data berubah maka ui juga berubah
const posts = ref([])
const loading = ref(false)
const postCache = ref(new Map())
const prefetchingId = ref(new Set())
const username = ref('')
const error = ref(null)

console.log("home view")

async function fetchDetailPost(post_id) {
        try {
        const res = await fetch(`http://localhost:8080/postgo/post/${post_id}`, {
            method: 'GET',
            credentials: 'include', // include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const postJson = await res.json()
            console.log('Full JSON response:', postJson)
            console.log('json.data:', postJson.data)

            postCache.value.set(post_id, postJson.data)
            return postJson.data
        } else {
            console.log('Failed to fetch post:', res.statusText)
        }
        } catch (error) {
            console.log('Error fetching post:', error)
            error.value = 'Error loading post'
        } finally {
            loading.value = false
        }
    }

async function prefetchPost(post_id) {
        // jika post_id tidak valid, return
        if (!post_id) return

        const idStr = String(post_id)

        // jika post sudah ada di cache atau sedang diprefetch, return
        if (postCache.value.has(idStr) || prefetchingId.value.has(idStr)) {
            return
        }

        // set id prefetching dengan id post yang sedang diprefetch
        prefetchingId.value.add(idStr)
        console.log(`Prefetching post ${idStr}`)

        // fetch detail post
        try {
            await fetchDetailPost(post_id)
            console.log(`Prefetched post ${idStr}`)
        } catch (error) {
            console.log(`Error prefetching post ${idStr}:`, error)
        } finally {
            prefetchingId.value.delete(idStr)
        }
    }

const handleHover = (post_id) => {
  const id = String(post_id)

  console.log(`hover post: ${id}`)
  prefetchPost(id)
}

const handleMouseLeave = (post_id) => {
  console.log(`mouse leave post: ${post_id}`)
  const cancelPrefetch = () => {
        prefetchingId.value.clear()
    }
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

async function fetchPosts() {
    // jika post sudah ada di cache, gunakan post yang ada di cache
  if (posts.value.length > 0) {
    console.log('Using cached posts')
    return
  }

  loading.value = true

  // fetch posts from backend
  try {
    const res = await fetch('http://localhost:8080/postgo/posts', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const json = await res.json()
      console.log('Fetched posts:', json.data.posts)
      posts.value = json.data.posts
    } else {
      console.log('Failed to fetch posts:', res.statusText)
      posts.value = []
    }
    } catch (error) {
      console.error('Error fetching posts:', error)
      posts.value = []
  } finally {
    loading.value = false
  }
}

// lifecycle hook onMounted, fungsi yang akan dijalankan setelah komponen tampil di layar
onMounted(async () => {
  try {
    await Promise.all([fetchUser(), fetchPosts()])
  } catch (error) {
    error.value = 'Error loading data'
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
        :post_id="post.post_id"
        :title="post.post_title"
        :body="post.post_body"
        @mouseenter="handleHover(post.post_id)"
        @mouseleave="handleMouseLeave(post.post_id)"
      />
    </div>
    <div class="mt-8 p-4 bg-gray-900 border border-gray-700 rounded text-xs">
      <p class="text-gray-400 mb-2">Debug Info:</p>
      <p>Posts loaded: {{ posts.length }}</p>
      <p>Cached posts: {{ postCache.size }}</p>
    </div>
  </div>
</template>
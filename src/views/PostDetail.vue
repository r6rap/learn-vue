<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// hiraukan
const route = useRoute()
const post = ref('')
const loading = ref(true)
const error = ref(null)

// dummy comments (nanti ambil dari API)
const comments = ref([
  { id: 1, user: "alice", body: "Nice post!" },
  { id: 2, user: "bob", body: "Setuju banget 👍" }
])

const newComment = ref("")

// hiraukan
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:8080/postgo/post/${route.params.id}`, {
      method: 'GET',
      credentials: 'include', // include cookies in the request
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const json = await res.json()
      console.log('Full JSON response:', json)
      console.log('json.data:', json.data)
      
      post.value = json.data
      error.value = null
    } else {
      console.log('Failed to fetch post:', res.statusText)
      post.value = null
      error.value = 'Failed to load post'
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    error.value = 'Error loading post'
  } finally {
    loading.value = false
  }
})

const addComment = () => {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id: Date.now(),
    user: "you",
    body: newComment.value
  })
  newComment.value = ""
}
</script>

<template>
  <div class="min-h-screen bg-black text-white font-mono p-4 sm:p-8">
    <div v-if="loading" class="text-gray-400">> Loading post...</div>
    <div v-else-if="error" class="text-red-500">! Error: {{ error }}</div>

    <div v-else-if="post" class="border border-gray-700 rounded-md p-4 bg-black">
  <h2 class="text-2xl font-bold text-cyan-400 mb-2">
    # {{ post.post_title }}
  </h2>
  <p class="text-gray-300 text-base whitespace-pre-line">
    {{ post.post_body }}
  </p>
  <p class="mt-3 text-xs text-gray-500">post-id: {{ post.post_id }}</p>

      <!-- Actions -->
      <div class="flex items-center gap-2 mt-4">
        <button
          class="bg-red-600 text-black font-bold px-3 py-1 rounded hover:bg-red-500 transition"
          @click="deletePost"
        >
          > delete
        </button>
        <router-link
          v-if="post"
          :to="`/edit/post/${post.post_id}`"
          class="bg-cyan-500 text-black font-bold px-3 py-1 rounded hover:bg-cyan-400 transition"
        >
          > edit
        </router-link>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold text-green-400 mb-3">
        > Comments
      </h3>

      <!-- Form -->
      <form @submit.prevent="addComment" class="flex flex-col gap-3 mb-6">
        <textarea
          v-model="newComment"
          placeholder="Write a comment..."
          class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400 h-20"
        ></textarea>
        <button
          type="submit"
          class="bg-green-600 text-black font-bold px-4 py-2 rounded hover:bg-green-500 transition self-start"
        >
          > send
        </button>
      </form>

      <!-- List Comments -->
      <div v-if="comments.length > 0" class="space-y-3">
        <div
          v-for="c in comments"
          :key="c.id"
          class="border border-gray-700 rounded-md p-3 bg-gray-950"
        >
          <p class="text-cyan-400 font-bold">@{{ c.user }}</p>
          <p class="text-gray-300 mt-1">{{ c.body }}</p>
        </div>
      </div>
      <div v-else class="text-gray-500">
        > No comments yet
      </div>
    </div>
  </div>
</template>
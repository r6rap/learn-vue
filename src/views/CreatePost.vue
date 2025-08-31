<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const post = ref({
    post_title: '',
    post_body: ''
})
const loading = ref(false)
console.log("create post")
const router = useRouter()

async function createPost() {
  try {
    const res = await fetch('http://localhost:8080/postgo/create/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post.value),
      credentials: 'include'
    })

    const data = await res.json()

    console.log('Post created:', data)
    router.push('/')
  } catch (error) {
    console.error('Error creating post:', error)
    alert('Failed to create post. Please try again.')
  }
  
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white font-mono px-4">
    <div class="w-full max-w-xl border border-gray-700 rounded-md p-6 bg-black">
      <!-- title -->
      <h2 class="text-2xl font-bold mb-6 text-green-400 text-center">
        $ Create Post
      </h2>

      <!-- form -->
      <form @submit.prevent="createPost" class="space-y-4">
        <!-- title -->
        <div>
          <label class="block mb-1 text-gray-300">> Title</label>
          <input
            v-model="post.post_title"
            type="text"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="Title of your post"
          />
        </div>

        <!-- body -->
        <div>
          <label class="block mb-1 text-gray-300">> Content</label>
          <textarea
            v-model="post.post_body"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded h-32 focus:outline-none focus:border-cyan-400"
            placeholder="Write your post content here..."
          ></textarea>
        </div>

        <!-- submit -->
        <button
          type="submit"
          class="w-full bg-green-600 text-black font-bold py-2 px-4 rounded hover:bg-green-500 transition disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? '> ...sending' : '> Send Post' }}
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const post = ref({
    id: 1,
    title: '',
    body: ''
})
const loading = ref(false)
const router = useRouter()

const submitPost = async () => {
    if (!post.value.title || !post.value.body) {
        alert("Semua kolom wajib diisi")
        return
    }

    loading.value = true

    const posts = JSON.parse(localStorage.getItem('posts')) || []

    const lastId = posts.length ? posts[0].id : 0

    const newPost = {
        id: lastId + 1,
        title: post.value.title,
        body: post.value.body
    }

    posts.unshift(newPost)
    localStorage.setItem('posts', JSON.stringify(posts))

    router.push('/')
}

</script>

<template>
  <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Buat Post Baru</h2>
    
    <form @submit.prevent="submitPost" class="space-y-4">
      <div>
        <label class="block font-medium text-gray-700">Judul</label>
        <input v-model="post.title" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      <div>
        <label class="block font-medium text-gray-700">Isi</label>
        <textarea v-model="post.body" class="w-full border border-gray-300 rounded px-3 py-2 h-32"></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? 'Mengirim...' : 'Kirim Post' }}
      </button>
    </form>
  </div>
</template>
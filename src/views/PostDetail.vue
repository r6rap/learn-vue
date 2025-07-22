<script setup>
import router from '@/router';
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
let post = ref(null)
const loading = ref(true)
const error = ref(null)

const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true'
}

if (!isAuthenticated()) {
    router.push('/login')
}

onMounted(() => {
    // ambil item 'posts' di local storage
    const posts = JSON.parse(localStorage.getItem('posts')) || []

    // mencari 'posts' yang idnya sesuai dengan parameter id di route
    post.value = posts.find(p => p.id === Number(route.params.id))
    loading.value = false
})

const deletePost = () => {
  // Ambil semua post dari localStorage
  const posts = JSON.parse(localStorage.getItem('posts')) || []

  // Filter post yang bukan post saat ini
  const updated = posts.filter(p => p.id !== post.value.id)

  // Simpan ulang ke localStorage
  localStorage.setItem('posts', JSON.stringify(updated))
  router.push('/')
}


</script>

<template>
    <div>
        <div v-if="loading" class="text-gray-500">Loading post...</div>
        <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
        <div v-else class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-3xl font-bold text-blue-700 mb-4">{{ post.title }}</h2>
            <p class="text-gray-700 text-lg">{{ post.body }}</p>
            <p class="mt-4 text-sm text-gray-400">Post ID: {{ post.id }}</p>
        </div>

        <button
            class="mt-6 bg-red-500 text-white px-4 py-2 rounded"
            @click="deletePost"
        >
            Hapus
        </button>
        <!-- v-if untuk mengecek apakah komponen sudah ada, karena nilai awal post adalah null -->
        <router-link
            v-if="post"
            :to="`/edit/post/${post.id}`"
            class="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
            Edit
        </router-link>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue';

// membuat reactive array, reactive = kalau data berubah maka ui juga berubah
let posts = ref([])

// lifecycle hook onMounted, fungsi yang akan dijalankan setelah komponen tampil di layar
onMounted(() => {
  const savedPost = JSON.parse(localStorage.getItem('posts')) || []
  posts.value = savedPost
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Blog Post (from jsonplaceholder api)</h2>
    
    <!-- cek apakah datanya ada (dengan length) -->
    <div v-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- v-for untuk looping data posts dan menampilkan PostCard sebanyak data posts -->
      <!-- v-bind untuk mengikat data dari posts dan dikirim ke props (component PostCard) -->
      <PostCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :body="post.body"
      />
    </div>

    <!-- jika kosong maka tampilkan ini -->
    <p v-else class="text-gray-500">Loading data...</p>
  </div>
</template>

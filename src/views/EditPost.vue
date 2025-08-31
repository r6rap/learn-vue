<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const post = ref({
  id: Number(route.params.id),
  title: '',
  body: ''
})

console.log("edit post")

// fungsi yang akan dijalankan ketika component EditPost sudah dirender
onMounted(() => {
  const posts = JSON.parse(localStorage.getItem('posts')) || []
  // mencari post
  const foundPost = posts.find(p => p.id === post.value.id)

  // jika ketemu, isi post.value dengan isi dari foundPost
  if (foundPost) {
    post.value = { ...foundPost } // spread agar reaktif
  } else {
    alert("Post tidak ditemukan.")
    router.push('/') // Redirect jika ID tidak valid
  }
})

const updatePost = () => {
  if (!post.value.title || !post.value.body) {
    alert("Semua kolom wajib diisi.")
    return
  }

  const posts = JSON.parse(localStorage.getItem('posts')) || [] // jika parse gagal maka menggunakan array kosong
  // mencari index pertama yang sesuai dengan kondisi (p.id === post.value.id)
  const index = posts.findIndex(p => p.id === post.value.id)

  // jika index !== -1 maka data ketemu
  if (index !== -1) {
    // menimpan post lama dengan post baru dari form
    posts[index] = { ...post.value }
    // menyimpan array posts yang sudah diedit ke local storage dan mengubahnya menjadi json
    localStorage.setItem('posts', JSON.stringify(posts))
    alert("Post berhasil diperbarui.")
    router.push('/') // Kembali ke halaman utama
  } else {
    alert("Post tidak ditemukan saat update.")
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8">
    <h2 class="text-xl font-bold mb-4">Edit Post</h2>
    <input
      v-model="post.title"
      placeholder="Judul"
      class="w-full border p-2 mb-4 rounded"
    />
    <textarea
      v-model="post.body"
      placeholder="Isi Post"
      class="w-full border p-2 h-40 rounded"
    ></textarea>
    <button
      class="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      @click="updatePost"
    >
      Simpan Perubahan
    </button>
  </div>
</template>

<script setup>
// digunakan untuk menerima data props dari parent
let post = defineProps({
    id: Number,
    title: String,
    body: String,
})
</script>

<template>
    <router-link :to="`/detail/post/${post.id}`" class="block">
    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <h3 class="text-xl font-bold text-blue-700 mb-2">{{ post.title }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ post.body }}</p>
    </div>
    </router-link>
</template>
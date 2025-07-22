<template>
  <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-blue-600">My Blog</h1>
    <ul class="flex space-x-4 items-center">
      <li>
        <router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link>
      </li>
      <li>
        <router-link to="/create/post" class="text-gray-700 hover:text-blue-600">Create Post</router-link>
      </li>
      <li>
        <button @click="handleLogout" class="text-red-500 hover:text-red-700 font-semibold">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>
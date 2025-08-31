<template>
  <nav class="bg-black text-white font-mono border-b border-gray-700 px-4 sm:px-6 py-3 flex justify-between items-center">
    <!-- Brand -->
    <h1 class="text-lg sm:text-2xl font-bold text-green-400">
      $ PostGo
    </h1>

    <!-- Menu -->
    <ul class="flex space-x-3 sm:space-x-6 items-center">
      <li>
        <router-link
          to="/"
          class="text-gray-300 hover:text-cyan-400 transition"
        >
          > Home
        </router-link>
      </li>
      <li>
        <router-link
          to="/create/post"
          class="text-gray-300 hover:text-cyan-400 transition"
        >
          > Create Post
        </router-link>
      </li>
      <li>
        <button
          @click="handleLogout"
          class="text-red-500 hover:text-red-400 font-semibold transition"
        >
          ! Logout
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

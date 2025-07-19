<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-1">Email</label>
        <input v-model="users.email" type="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="contoh@email.com" />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1">Password</label>
        <input v-model="users.password" type="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Masukkan password kamu" />
      </div>

      <div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Login
        </button>
      </div>

      <p class="text-center text-sm text-gray-500">Belum punya akun?
        <router-link to="/register" class="text-blue-600 hover:underline">Daftar di sini</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const users = ref({
  email: '',
  password: ''
})

const router = useRouter()

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Logic login akan kita buat nanti
const handleLogin = () => {
  if (!users.value) {
    alert('column cant be empty')
    return
  }

  if (!validateEmail(users.value.email)) {
    alert('email not valid')
    return
  }

  if (users.value.password.length < 8) {
    alert('password not valid')
    return
  }

  users.value = JSON.parse(localStorage.getItem('users')) || []

  const found = users.value.find(u => u.email === users.value.email && u.password === users.value.password)

  if (found) {
    alert('login success')
    router.push('/')
  } else {
    alert('email atau password salah')
  }

}
</script>

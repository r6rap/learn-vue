<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <h1 class="text-2xl font-bold mb-4 text-center">Daftar Akun</h1>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-1">Username</label>
        <input v-model="users.username" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Nama kamu..." />
      </div>
      
      <div>
        <label class="block text-gray-700 font-semibold mb-1">Email</label>
        <input v-model="users.email" type="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="contoh@email.com" />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1">Password</label>
        <input v-model="users.password" type="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Minimal 8 karakter" />
      </div>

      <div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Daftar
        </button>
      </div>

      <p class="text-center text-sm text-gray-500">Sudah punya akun?
        <router-link to="/login" class="text-blue-600 hover:underline">Login di sini</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref({
  username: '',
  email: '',
  password: ''
})

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const handleRegister = () => {
  if (!users.value) {
    alert('column cannot be empty')
    return
  }

  if (!validateEmail(users.value.email)) {
    alert('email not valid')
    return
  }

  if (users.value.password.length < 8) {
    alert('password min 8 char')
    return
  }

  users.value = JSON.parse(localStorage.getItem('users')) || []

  const userExist = users.value.find(u => u.email === users.value.email)
  if (userExist) {
    alert('email sudah terdaftar')
    return
  }

  const newUser = {
    name: users.value.username,
    email: users.value.email,
    password: users.value.password
  }

  users.value.push(newUser)
  localStorage.setItem('users', JSON.stringify(users.value))

  alert('registrasi successful')
  router.push('/login')
}
</script>

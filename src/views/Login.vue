<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white font-mono px-4">
    <div class="w-full max-w-md border border-gray-700 rounded-md p-6 bg-black">
      <!-- title -->
      <h1 class="text-2xl font-bold mb-6 text-center text-green-400">
        $ Login
      </h1>

      <!-- form -->
      <form @submit.prevent="testLogin" class="space-y-4">
        <!-- username -->
        <div>
          <label class="block mb-1 text-gray-300">> Username</label>
          <input
            v-model="apiData.username"
            type="text"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="username"
          />
        </div>

        <!-- sassword -->
        <div>
          <label class="block mb-1 text-gray-300">> Password</label>
          <input
            v-model="apiData.password"
            type="password"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="password"
          />
        </div>

        <!-- submit -->
        <div>
          <button
            type="submit"
            class="w-full bg-green-600 text-black font-bold py-2 px-4 rounded hover:bg-green-500 transition"
          >
            > Sign In
          </button>
        </div>

        <!-- register -->
        <p class="text-center text-sm text-gray-400">
          Don't have an account?
          <router-link to="/register" class="text-cyan-400 hover:underline">
            Sign Up
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const apiData = ref({
  username: '',
  password: ''
})

console.log("login.vue")

const router = useRouter()

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// logic login with api
const testLogin = async () => {
  if (!apiData.value.username || !apiData.value.password) {
    alert('Semua field harus diisi')
    return
  }

  if (apiData.value.password.length < 8) {
    alert('Password minimal 8 karakter')
    return
  }

  try {
      const res = await fetch('http://localhost:8080/postgo/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiData.value),
        credentials: 'include' // send and save cookies httpOnly
      })

      if (!res.ok) {
        throw new Error('Login gagal, periksa email dan password Anda')
      }

      alert('Login berhasil')
      router.push('/')

  } catch (error) {
    console.error('Login error:', error)
    alert(error.message || 'Terjadi kesalahan saat login')
  }
}
</script>

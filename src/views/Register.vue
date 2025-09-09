<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white font-mono px-4">
    <div class="w-full max-w-md border border-gray-700 rounded-md p-6 bg-black">
      <!-- title -->
      <h1 class="text-2xl font-bold mb-6 text-center text-green-400">
        $ Register
      </h1>

      <!-- form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- username -->
        <div>
          <label class="block mb-1 text-gray-300">> Username</label>
          <input
            v-model="formSignup.username"
            type="text"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="username"
          />
        </div>

        <!-- email -->
        <div>
          <label class="block mb-1 text-gray-300">> Email</label>
          <input
            v-model="formSignup.email"
            type="email"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="example@email.com"
          />
        </div>

        <!-- password -->
        <div>
          <label class="block mb-1 text-gray-300">> Password</label>
          <input
            v-model="formSignup.password"
            type="password"
            class="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
            placeholder="min 8 characters"
          />
        </div>

        <!-- submit -->
        <div>
          <button
            type="submit"
            class="w-full bg-green-600 text-black font-bold py-2 px-4 rounded hover:bg-green-500 transition"
          >
            > Sign Up
          </button>
        </div>

        <!-- redirect to Login -->
        <p class="text-center text-sm text-gray-400">
          Already have an account?
          <router-link to="/login" class="text-cyan-400 hover:underline">
            Sign In
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formSignup = ref({
  username: '',
  email: '',
  password: ''
})

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

console.log("register")

// logic register with api
const Register = async () => {
  if (!formSignup.value.username || !formSignup.value.email || !formSignup.value.password) {
    alert('Semua field harus diisi')
    return
  }

  if (!validateEmail(formSignup.value.email)) {
    alert('Format email tidak valid')
    return
  }

  if (formSignup.value.password.length < 8) {
    alert('Password minimal 8 karakter')
    return
  }

  try {
    const res = await fetch('http://localhost:8080/postgo/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
      credentials: 'include'
    })
  } catch (error) {
    
  }
}

// logic register with localstorage
const handleRegister = () => {
  if (!formData.value.username || !formData.value.email || !formData.value.password) {
    alert('Semua field harus diisi')
    return
  }
  
  if (!validateEmail(formData.value.email)) {
    alert('Format email tidak valid')
    return
  }
  
  if (formData.value.password.length < 8) {
    alert('Password minimal 8 karakter')
    return
  }
  
  const existingUsers = JSON.parse(localStorage.getItem('users')) || []
  
  const userExists = existingUsers.find(user => user.email === formData.value.email)
  if (userExists) {
    alert('Email sudah terdaftar')
    return
  }
  
  // buat user baru dengan isi sesuai dari form
  const newUser = {
    username: formData.value.username,
    email: formData.value.email,
    password: formData.value.password
  }
  
  // push, menambahkan satu atau lebih elemen ke posisi akhir dari array yang sudah ada
  existingUsers.push(newUser)
  
  localStorage.setItem('users', JSON.stringify(existingUsers))
  
  alert('Registrasi berhasil!')
  
  formData.value = {
    username: '',
    email: '',
    password: ''
  }
  
  router.push('/login')
}
</script>
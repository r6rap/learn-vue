<template>
  <div class="min-h-screen bg-black text-white font-mono flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 sm:px-6 py-6">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
</style>
<template>
  <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-blue-600">My Blog</h1>
    <ul class="flex space-x-4">
      <li><router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link></li>
      <li><router-link to="/create/post" class="text-gray-700 hover:text-blue-600">Create Post</router-link></li>
    </ul>
  </nav>
</template>

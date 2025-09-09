<template>
  <router-link :to="`/detail/post/${post_id}`" class="block">
    <div class="border border-gray-700 p-3 rounded-md hover:bg-gray-900 transition">
      <h3 class="text-lg font-semibold text-cyan-400">
        # {{ title }}
      </h3>
      <p class="text-gray-300 mt-1">
        {{ body }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  post_id: [String, Number],
  title: String,
  body: String,
})
</script>
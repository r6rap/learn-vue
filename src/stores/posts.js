import { ref } from "vue";
import { defineStore } from "pinia";

export const usePostStore = defineStore('posts', () => {
    const posts = ref([])
    const postCache = ref(new Map()) // map, struktur data key-value
    const loading = ref(false)
    const prefetchingId = ref(new Set()) // set, kumpulan data unik (tidak ada duplikat)

    async function fetchPosts() {
        
        // jika post sudah ada di cache, gunakna post yang ada di cache
        if (posts.value.length > 0) {
            console.log('Using cached posts')
            return
        }

        loading.value = true

        // fetch posts from backend
        try {
            const res = await fetch('http://localhost:8080/postgo/posts', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const json = await res.json()
            console.log('Fetched posts:', json.data.posts)
            posts.value = json.data.posts
        } else {
            console.log('Failed to fetch posts:', res.statusText)
            posts.value = []
        }
        } catch (error) {
            console.error('Error fetching posts:', error)
            posts.value = []
        } finally {
            loading.value = false
        }
    }

    async function fetchDetailPost(post_id) {
        try {
        const res = await fetch(`http://localhost:8080/postgo/post/${post_id}`, {
            method: 'GET',
            credentials: 'include', // include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const postJson = await res.json()
            console.log('Full JSON response:', postJson)
            console.log('json.data:', postJson.data)

            postCache.value.set(post_id, postJson.data)
            return postJson.data
        } else {
            console.log('Failed to fetch post:', res.statusText)
        }
        } catch (error) {
            console.log('Error fetching post:', error)
            error.value = 'Error loading post'
        } finally {
            loading.value = false
        }
    }

    async function prefetchPost(post_id) {
        // jika post_id tidak valid, return
        if (!post_id) return

        const idStr = String(post_id)

        // jika post sudah ada di cache atau sedang diprefetch, return
        if (postCache.value.has(idStr) || prefetchingId.value.has(idStr)) {
            return
        }

        // set id prefetching dengan id post yang sedang diprefetch
        prefetchingId.value.add(idStr)
        console.log(`Prefetching post ${idStr}`)

        // fetch detail post
        try {
            await fetchDetailPost(post_id)
            console.log(`Prefetched post ${idStr}`)
        } catch (error) {
            console.log(`Error prefetching post ${idStr}:`, error)
        } finally {
            prefetchingId.value.delete(idStr)
        }
    }

    async function getPost(post_id) {
        const idStr = String(post_id)

        // jika ada post di cache, gunakan post dari cache
        if (postCache.value.has(idStr)) {
            console.log(`Using cached post ${idStr}`)
            // kembalikan post dari cache
            return postCache.value.get(idStr)
        }

        // jika tidak ada post di cache, fetch detail post dari server
        console.log(`Fetching post ${idStr}`)
        return await fetchDetailPost(idStr)
    }

    const isPostCached = (post_id) => postCache.value.has(String(post_id))
    const isPrefetching = (post_id) => prefetchingId.value.has(String(post_id))

    const clearCache = () => {
        postCache.value.clear()
        prefetchingId.value.clear()
    }

    const cancelPrefetch = () => {
        prefetchingId.value.clear()
    }

    return {
    posts,
    postCache,
    loading,
    prefetchingId,
    fetchPosts,
    fetchDetailPost,
    prefetchPost,
    getPost,
    isPostCached,
    isPrefetching,
    clearCache,
    cancelPrefetch
  }
})
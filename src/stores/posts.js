import { ref } from "vue";
import { defineStore } from "pinia";

export const usePostStore = defineStore('posts', () => {
    const posts = ref([])
    const postCache = ref(new Map())
    const loading = ref(false)
    const prefetchingId = ref(new Set())

    async function fetchPosts() {
        
        if (posts.value.length > 0) {
            console.log('Using cached posts')
            return
        }

        loading.value = true

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
            posts.value = json.data
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
        const res = await fetch(`http://localhost:8080/postgo/post/${route.params.id}`, {
            method: 'GET',
            credentials: 'include', // include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const postJson = await res.json()
            console.log('Full JSON response:', json)
            console.log('json.data:', json.data)
            
            const postData = postJson.data

            postCache.value.set(post_id, postData)

            return postData
        } else {
            console.log('Failed to fetch post:', res.statusText)
        }
        } catch (error) {
            console.error('Error fetching post:', error)
            error.value = 'Error loading post'
        } finally {
            loading.value = false
        }
    }

    async function prefetchPost(post_id) {
        const idStr = String(post_id)

        if (postCache.value.has(idStr) || prefetchingId.value.has(idStr)) {
            return
        }

        prefetchingId.value.add(idStr)
        console.log(`Prefetching post ${idStr}`)

        try {
            await  fetchDetailPost(idStr)
            console.log(`Prefetched post ${idStr}`)
        } catch (error) {
            console.error(`Error prefetching post ${idStr}:`, error)
        } finally {
            prefetchingId.value.delete(idStr)
        }
    }

    async function getPost(post_id) {
        const idStr = String(post_id)

        if (postCache.value.has(idStr)) {
            console.log(`Using cached post ${idStr}`)
            return postCache.value.get(idStr)
        }

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
    prefetchPost,
    getPost,
    isPostCached,
    isPrefetching,
    clearCache,
    cancelPrefetch
  }
})
import {ref, computed} from 'vue'

/**
 * asyncronous calls wrapper.
 * It gives back an object with the callback to get the data and the reactive loading state.
 */
export default function useAsyncData(asyncCall: (payload?: any) => Promise<any>) {
  // private
  const loading = ref(false)

  // public
  async function getData (payload?: any) {
    loading.value = true
    await asyncCall(payload)
    loading.value = false
  }
  
  return {
    // call computed to make loading private
    loading: computed(() => loading.value),
    getData
  }
}
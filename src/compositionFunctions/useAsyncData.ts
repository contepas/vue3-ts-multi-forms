import {ref, computed} from 'vue'

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
    // call computed to make loading and response private
    loading: computed(() => loading.value),
    getData
  }
}
import {ref, computed} from 'vue'

export default function useAsyncData(asyncCall: () => Promise<any>) {
  // private
  const loading = ref(false)

  // public
  async function getData () {
    loading.value = true
    await asyncCall()
    loading.value = false
  }
  
  return {
    // call computed to make loading and response private
    loading: computed(() => loading.value),
    getData
  }
}
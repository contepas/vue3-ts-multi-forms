import { ref, computed, Ref } from 'vue'

const isServerUp: Ref<boolean> = ref(true)

export const serverUp = () => (isServerUp.value = true)
export const serverDown = () => (isServerUp.value = false)

export const getIsServerUp = computed(() => isServerUp.value)

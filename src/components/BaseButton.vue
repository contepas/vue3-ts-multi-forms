<template>
    <div>
        <span><slot></slot></span>
        <!-- LOADING ANIMATION -->
        <span v-if="isLoading" :class="$style.loading">
            <loadingAnimation
                width="16px"
                height="16px"
                :color="loadingColor"
            />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {}
    },
})
</script>

<style scoped>
</style>
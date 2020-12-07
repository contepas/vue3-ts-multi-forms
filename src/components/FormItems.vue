<template>
    <FormWrapper title="Items">
        <BaseInput v-model="clientName" label="Client Name"/>
    </FormWrapper>
</template>

<script lang="ts">
import FormWrapper from './FormWrapper.vue'
import BaseInput from './BaseInput.vue'
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
    components: { FormWrapper, BaseInput },
    setup() {
        const clientName = ref()

        return {
            clientName,
        }
    },
})
</script>

<style scoped>
</style>
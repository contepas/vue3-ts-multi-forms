<template>
    <FormWrapper title="Sellers">
		<BaseSelect v-model="value" :options="options"/>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormWrapper from './FormWrapper.vue'
import BaseSelect from './BaseSelect.vue'

export default defineComponent({
    name: 'FormSellers',
    components: { FormWrapper, BaseSelect },
    props: {
        msg: String,
    },
    setup() {
        const options = [
            {
                name: 'Test 1',
                id: 'test-1',
            },
            {
                name: 'Test 2',
                id: 'test-2',
            },
        ]
        const value = ref()

        return {
            options,
            value,
        }
    },
})
</script>

<style scoped lang="scss">
</style>

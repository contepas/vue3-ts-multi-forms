<template>
    <FormWrapper title="Sellers">
		<BaseSelect v-model="value" :options="options" label="Seller"/>
		<BaseInput v-model="price" type="number" label="Price"/>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormWrapper from './FormWrapper.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

export default defineComponent({
    name: 'FormSellers',
    components: { FormWrapper, BaseInput, BaseSelect },
    props: {
        msg: String,
    },
    setup() {
        const price = ref(0)
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
            price
        }
    },
})
</script>

<style scoped lang="scss">
</style>

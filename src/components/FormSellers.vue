<template>
    <WrapperForm title="Sellers">
        <WrapperFormSection>
            <template v-slot:default>
                <div
                    v-for="inputField in inputFields"
                    :key="inputField.id"
                    :class="$style.inputs"
                >
                    <BaseSelect
                        v-model="inputField.seller"
                        :options="options"
                        label="Seller"
                    />
                    <BaseInput
                        v-model="inputField.percentage"
                        type="number"
                        label="Price"
                        step="0.01"
                        min="0"
                        max="100"
                    />
                </div>
            </template>
            <template v-slot:buttons>
                <BaseButton @click="addSeller()">+ Seller</BaseButton>
                <BaseButton @click="save()">Save</BaseButton>
            </template>
        </WrapperFormSection>
    </WrapperForm>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { uniqueId } from 'lodash'
import WrapperForm from './WrapperForm.vue'
import WrapperFormSection from './WrapperFormSection.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

export default defineComponent({
    name: 'FormSellers',
    components: {
        WrapperForm,
        WrapperFormSection,
        BaseButton,
        BaseInput,
        BaseSelect,
    },
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
        const inputField = () => ({
            id: `form-sellers-field-${uniqueId()}`,
            seller: null,
            percentage: 0,
        })
        const inputFields = ref([inputField()])
        const addSeller = () => inputFields.value.push(inputField())

        return {
            inputFields,
            addSeller,
            options,
            value,
            price,
        }
    },
})
</script>

<style lang="scss" module>
.inputs {
    width: 100%;
    > div {
        margin-bottom: 20px;
    }
    @media (min-width: 500px) {
        display: flex;
        flex-wrap: wrap;
        > div {
            margin-right: 20px;
        }
    }
}
</style>

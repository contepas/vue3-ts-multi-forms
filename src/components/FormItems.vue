<template>
    <WrapperForm title="Items">
        <WrapperformSection
            v-for="item in items"
            :key="`${item.name}_${item.Id}`"
        >
            <template v-slot:default>
                <div :class="$style.inputs">
                    <BaseSelect label="Product" :options="items" />
                    <BaseInput v-model="price" type="number" label="Price" />
                    <BaseInput v-model="price" type="number" label="Amount" />
                    <template v-if="item.type === 'special'">
                        <BaseSelect label="Delivery" :options="items" />
                        <BaseInput v-model="comment" label="Comment" />
                    </template>
                </div>
            </template>
            <template v-slot:buttons>
                <BaseButton :is-loading="false">Delete</BaseButton>
                <BaseButton :is-loading="false">Save</BaseButton>
            </template>
        </WrapperformSection>
        <div :class="$style.buttons">
            <BaseButton :is-disabled="false" @click="addItem()"
                >+ Generic</BaseButton
            >
            <BaseButton :is-loading="false">+ Special</BaseButton>
        </div>
    </WrapperForm>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

import WrapperForm from './WrapperForm.vue'
import WrapperformSection from './WrapperFormSection.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

interface ItemsObject {
    id: number
    type: string
    name: string
}

export default defineComponent({
    components: {
        WrapperForm,
        WrapperformSection,
        BaseButton,
        BaseInput,
        BaseSelect,
    },
    setup() {
        const price = ref(0)
        const comment = ref('')
        const items = ref<Array<ItemsObject>>([])
        items.value.push({ id: 1, type: 'special', name: 'test' })
        items.value.push({ id: 2, type: 'special', name: 'test2' })
        const addItem = () => {
            items.value.push({ id: 3, type: 'generic', name: 'test' })
        }
        return {
            price,
            comment,
            items,
            options: items,
            addItem,
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
.buttons {
    display: flex;
    flex-direction: column;
    > div {
        margin-top: 20px;
        width: 100%;
    }
    @media (min-width: 500px) {
        flex-direction: row;
        justify-content: center;
        > div {
            width: 150px;
            margin-right: 20px;
        }
    }
}
</style>

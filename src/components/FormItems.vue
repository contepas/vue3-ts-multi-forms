<template>
    <FormWrapper title="Items">
        <template v-for="item in items" :key="`${item.name}_${item.Id}`" v-slot:[item.name]>
            <div :class="$style.items">
                <BaseSelect label="Product" :options="items"/>
                <BaseInput v-model="price" type="number" label="Price"/>
                <BaseInput v-model="price" type="number" label="Amount"/>
                <template v-if="item.type === 'special'">
                    <BaseSelect label="Delivery" :options="items"/>
                    <BaseInput v-model="comment" label="Comment"/>
                </template>
            </div>
            <div :class="[$style.buttons]">
                <BaseButton :is-loading="true" >Delete</BaseButton>
                <BaseButton :is-loading="true">Save</BaseButton>
            </div>
        </template>
        <template v-slot:buttons>
            <div :class="[$style.buttons, $style.center]">
                <BaseButton :is-disabled="true">+ Generic</BaseButton>
                <BaseButton :is-loading="true">+ Special</BaseButton>
            </div>
        </template>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

import FormWrapper from './FormWrapper.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

interface ItemsObject {
    id: number
    type: string
    name: string
}

export default defineComponent({
    components: { FormWrapper, BaseButton, BaseInput, BaseSelect },
    setup() {
        const price = ref(0)
        const comment = ref('')
        const items = ref<Array<ItemsObject>>([])
        items.value.push({id: 1, type: 'special', name: 'test'})
        items.value.push({id: 2, type: 'special', name: 'test2'})
        const addItem = () => {
            items.value.push({id: 1, type: 'generic', name: 'test'})
        }
        return {
            price,
            comment,
            items,
            options: items
        }
    },
})
</script>

<style lang="scss" module>
@mixin container {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;
    @media (max-width: 600px) {
        flex: 1 1 45%;
    }
}
.items {
    @include container;
    > div {
        margin-right: 20px;
        margin-bottom: 20px;
    }
}
.buttons {
    @include container;
    justify-content: flex-end;
    > div {
        margin-left: 20px;
    }
}
.center {
    justify-content: center;
    margin-top: 20px;
}
</style>
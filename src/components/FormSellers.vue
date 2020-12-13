<template>
    <WrapperForm title="Sellers">
        <WrapperFormSection>
            <template v-slot:default>
                <div
                    v-for="(seller, index) in sellers"
                    :key="seller.id"
                    :class="$style.inputs"
                >
                    <BaseSelect
                        v-model="seller.seller"
                        :options="allSellers"
                        label="Seller"
                    />
                    <BaseInput
                        v-model="seller.percentage"
                        type="number"
                        label="Price"
                        step="0.01"
                        min="0"
                        max="100"
                    />
                    <BaseButton
                        v-if="index !== 'seller_1'"
                        @click="removeSeller(index)"
                        >Delete</BaseButton
                    >
                </div>
            </template>
            <template v-slot:buttons>
                <BaseButton
                    @click="addSeller()"
                    :is-disabled="!canAddSellerFields"
                    >+ Seller</BaseButton
                >
                <BaseButton @click="save()">Save</BaseButton>
            </template>
        </WrapperFormSection>
    </WrapperForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { uniqueId } from 'lodash'
import WrapperForm from './WrapperForm.vue'
import WrapperFormSection from './WrapperFormSection.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import {
    getAllSellersCall,
    allSellers,
    sellerBind,
    addSeller,
    removeSeller,
    sellers,
    canAddSellerFields,
} from '../compositionFunctions/store/sellers'

export default defineComponent({
    name: 'FormSellers',
    components: {
        WrapperForm,
        WrapperFormSection,
        BaseButton,
        BaseInput,
        BaseSelect,
    },
    setup() {
        getAllSellersCall()
        return {
            addSeller,
            removeSeller,
            allSellers,
            sellerBind,
            sellers,
            canAddSellerFields,
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
        align-items: flex-end;
        > div {
            margin-right: 20px;
        }
    }
}
</style>

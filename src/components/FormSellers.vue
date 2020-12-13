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
                        v-model.number="seller.percentage"
                        type="number"
                        label="Percentage"
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
                <p
                    style="color: red; margin: 5px 0 0 8px;"
                    v-show="showError && errorMessage"
                >
                    {{ errorMessage }}
                </p>
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
import { defineComponent, ref, computed } from 'vue'
import { uniqueId } from 'lodash'
import WrapperForm from './WrapperForm.vue'
import WrapperFormSection from './WrapperFormSection.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import {
    getAllSellersCall,
    allSellers,
    addSeller,
    removeSeller,
    sellers,
    canAddSellerFields,
    totalPercentageValid
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
        const errorMessage = computed(() => totalPercentageValid.value ? '' : 'Percentage sum has to be 100%')
        const showError = ref(false)
        const save = () => {
            totalPercentageValid.value ? console.log('Submit form sellers') : showError.value = true
        }
        return {
            addSeller,
            removeSeller,
            allSellers,
            sellers,
            canAddSellerFields,
            save,
            showError,
            errorMessage,
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

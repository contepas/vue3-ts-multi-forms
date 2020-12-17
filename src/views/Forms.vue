<template>
    <div>
        <BaseButton style="margin: 20px auto;" @click="serverUpDown">{{
            buttonName
        }}</BaseButton>
        <FormOrderDetails />
        <FormSellers />
        <FormItems />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import {
    getIsServerUp,
    serverUp,
    serverDown,
} from '../composables/store/serverStatus'
import FormOrderDetails from '../components/FormOrderDetails.vue'
import FormSellers from '../components/FormSellers.vue'
import FormItems from '../components/FormItems.vue'
import BaseButton from '../components/BaseButton.vue'

export default defineComponent({
    name: 'Forms',
    components: {
        FormOrderDetails,
        FormSellers,
        FormItems,
        BaseButton,
    },
    setup() {
        const serverUpDown = () => {
            if (getIsServerUp.value) {
                serverDown()
            } else {
                serverUp()
            }
        }
        const buttonName = computed(() =>
            getIsServerUp.value ? 'Server Down' : 'Server Up',
        )
        return {
            serverUpDown,
            buttonName,
        }
    },
})
</script>

<style scoped></style>

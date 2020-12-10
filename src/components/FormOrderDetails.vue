<template>
    <FormWrapper title="Order Details" :loading="loading" @click="getClientsData()">
        <template v-slot:orderDetails>
            <BaseInput v-model="date" type="date" label="Order Date"/>
            <BaseSelect v-model="client" :options="clients" :disabled="loading" label="Client"/>
            <BaseSelect v-model="contact" :options="options" :disabled="loading" label="Contact"/>
        </template>
        <template v-slot:buttons>
            <BaseButton style="margin-left: auto;" @click="saveData"/>
        </template>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import FormWrapper from './FormWrapper.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import useAsyncData from '../compositionFunctions/useAsyncData'
import { useStore } from 'vuex'

const getClientsDataObject = () => {
    const store = useStore()
    const getClients = () => store.dispatch('formOrderDetails/getClients')
    const { loading: loadingClients, getData: getClientsData } = useAsyncData(getClients)
    const clients = computed(() => store.getters['formOrderDetails/clients'])
    return {
        loadingClients,
        clients,
        getClientsData,
    }
}

export default defineComponent({
    name: 'FormOrderDetails',
    components: {
        FormWrapper,
        BaseButton,
        BaseInput,
        BaseSelect,
    },
    setup() {
        const { loadingClients, clients, getClientsData } = getClientsDataObject()
        const loading = computed(() => loadingClients.value)
        getClientsData()
        const date = ref()
        const client = ref()
        const contact = ref()
        const saveData = () => {
            console.log('saveData')
        }
        return {
            date,
            loading,
            clients,
            options: clients,
            getClientsData,
            client,
            contact
        }
    },
})
</script>

<style scoped>
</style>
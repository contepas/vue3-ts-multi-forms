<template>
    <FormWrapper title="Order Details" :loading="loading" @click="getClientsData()">
        <template v-slot:orderDetails>
            <BaseInput v-model="date" type="date" label="Order Date"/>
            <BaseSelect v-model="client" :options="clients" :disabled="loading" label="Client"/>
            <BaseSelect v-model="contact" :options="contacts" :disabled="disabledContacts" label="Contact"/>
        </template>
        <template v-slot:buttons>
            <BaseButton @click="saveData()"/>
        </template>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import FormWrapper from './FormWrapper.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import useAsyncData from '../compositionFunctions/useAsyncData'
import { useStore, Store } from 'vuex'

const getClientsDataObject = (store: Store<any>) => {
    const getClients = () => store.dispatch('formOrderDetails/getClients')
    const { loading: loadingClients, getData: getClientsData } = useAsyncData(getClients)
    return {
        loadingClients,
        getClientsData,
    }
}

const getClientContactsDataObject = (store: Store<any>) => {
    const getClientContacts = (id: number) => store.dispatch('formOrderDetails/getClientContacts', id)
    const { loading: loadingClientContacts, getData: getClientContactsData } = useAsyncData(getClientContacts)
    return {
        loadingClientContacts,
        getClientContactsData,
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
        const store = useStore()
        const date = ref()
        const client = ref()
        const contact = ref()

        const { loadingClients, getClientsData } = getClientsDataObject(store)
        const clients = computed(() => store.getters['formOrderDetails/clients'])
        getClientsData()

        const { loadingClientContacts, getClientContactsData } = getClientContactsDataObject(store)
        const contacts = computed(() => store.getters['formOrderDetails/clientContacts'](client.value?.id))

        const loading = computed(() => loadingClients.value || loadingClientContacts.value)
        const disabledContacts = computed(() => loadingClientContacts.value || contacts.value.length < 1)
        
        watch(client, () => {
            getClientContactsData(Number(client.value.id))
        })
        
        const saveData = () => {
            console.log('saveData')
        }

        return {
            loading,
            disabledContacts,
            date,
            client,
            clients,
            contact,
            contacts,
            getClientsData,
            saveData,
        }
    },
})
</script>

<style scoped>
</style>
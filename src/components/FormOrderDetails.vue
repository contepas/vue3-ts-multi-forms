<template>
    <FormWrapper
        title="Order Details"
        :loading="loading"
        @click="getClientsData()"
    >
        <template v-slot:orderDetails>
            <BaseInput v-model="date" :disabled="disableDate" type="date" label="Order Date" />
            <BaseSelect
                v-model="client"
                :options="clients"
                :disabled="disabledClients"
                label="Client"
            />
            <BaseSelect
                v-model="contact"
                :options="contacts"
                :disabled="disabledContacts"
                label="Contact"
            />
        </template>
        <template v-slot:buttons>
            <BaseButton @click="buttonClick()" :is-disabled="loading" :is-loading="savingData">{{ buttonName }}</BaseButton>
        </template>
    </FormWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore, Store } from 'vuex'
import FormWrapper from './FormWrapper.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import useAsyncData from '../compositionFunctions/useAsyncData'
import {
    date,
    client,
    contact,
} from '../compositionFunctions/store/orderDetailsData'

const getClientsDataObject = (store: Store<any>) => {
    const getClients = () => store.dispatch('formOrderDetails/getClients')
    const { loading: loadingClients, getData: getClientsData } = useAsyncData(
        getClients,
    )
    return {
        loadingClients,
        getClientsData,
    }
}

const getClientContactsDataObject = (store: Store<any>) => {
    const getClientContacts = (id: number) =>
        store.dispatch('formOrderDetails/getClientContacts', id)
    const {
        loading: loadingClientContacts,
        getData: getClientContactsData,
    } = useAsyncData(getClientContacts)
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

        // GET CLIENTS DATA
        const { loadingClients, getClientsData } = getClientsDataObject(store)
        getClientsData()
        const clientsGetter = () => store.getters['formOrderDetails/clients']
        const clients = computed(clientsGetter)

        // GET CONTACTS DATA
        const {
            loadingClientContacts,
            getClientContactsData,
        } = getClientContactsDataObject(store)
        const contactsGetter = () =>
            store.getters['formOrderDetails/clientContacts'](client.value?.id)
        const contacts = computed(contactsGetter)
        const clientWatcher = () =>
            getClientContactsData(Number(client.value?.id))
        watch(client, clientWatcher)

        // SAVE DATA
        const isDataSavedGetter = () =>
            store.getters['formOrderDetails/isDataSaved']
        const isDataSaved = computed(isDataSavedGetter)
        const {loading: savingData, getData: saveData} = useAsyncData(() => store.dispatch('formOrderDetails/saveOrderDetails'))
        const buttonClick = () => {
            isDataSaved.value
                ? store.commit('formOrderDetails/SET_SAVED', false) 
                : saveData()
        }
        
        // UI MODIFICATORS
        const buttonName = computed(() => isDataSaved.value ? 'Modify' : 'Save')
        const loading = computed(
            () => loadingClients.value || loadingClientContacts.value,
        )
        const disableInputs = computed(() => isDataSaved.value || savingData.value)
        const disableDate = computed(() => disableInputs.value)
        const disabledContacts = computed(
            () => loading.value || contacts.value.length < 1 || disableInputs.value,
        )
        const disabledClients = computed(() => loading.value || disableInputs.value)

        return {
            loading,
            disableDate,
            disabledClients,
            disabledContacts,
            buttonName,
            date,
            client,
            clients,
            contact,
            contacts,
            getClientsData,
            buttonClick,
            savingData,
        }
    },
})
</script>

<style scoped></style>

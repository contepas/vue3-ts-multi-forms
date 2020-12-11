<template>
    <FormWrapper
        title="Order Details"
        :loading="loading"
        @click="getClientsData()"
    >
        <template v-slot:orderDetails>
            <BaseInput 
                v-model="date" 
                :disabled="disableDate"
                :show-error="showErrors"
                :error-message="errorMessages.date"
                type="date" 
                label="Order Date" />
            <BaseSelect
                v-model="client"
                :options="clients"
                :disabled="disabledClients"
                :show-error="showErrors"
                :error-message="errorMessages.client"
                label="Client"
            />
            <BaseSelect
                v-model="contact"
                :options="contacts"
                :disabled="disabledContacts"
                :show-error="showErrors"
                :error-message="errorMessages.contact"
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
    const { 
        loading: loadingClients, 
        getData: getClientsData 
    } = useAsyncData(getClients)
    const clientsGetter = () => store.getters['formOrderDetails/clients']
    const clients = computed(clientsGetter)
    return {
        loadingClients,
        getClientsData,
        clients
    }
}

const getClientContactsDataObject = (store: Store<any>) => {
    const getClientContacts = (id: number) =>
        store.dispatch('formOrderDetails/getClientContacts', id)
    const {
        loading: loadingClientContacts,
        getData: getClientContactsData,
    } = useAsyncData(getClientContacts)
    const contactsGetter = () =>
        store.getters['formOrderDetails/clientContacts'](client.value?.id)
    const contacts = computed(contactsGetter)
    const clientWatcher = () =>
        getClientContactsData(Number(client.value?.id))
    const watchClient = () => watch(client, clientWatcher)
    watchClient()
    return {
        loadingClientContacts,
        getClientContactsData,
        contacts
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

        // VALIDATORS
        const showErrors = ref(false)
        const errorMessages = computed(() => store.getters['formOrderDetails/errorMessages'])

        // GET CLIENTS DATA
        const {
            loadingClients,
            getClientsData,
            clients
        } = getClientsDataObject(store)
        getClientsData()

        // GET CONTACTS DATA
        const {
            loadingClientContacts,
            getClientContactsData,
            contacts
        } = getClientContactsDataObject(store)

        // SAVE DATA
        const isDataValid = computed(() => store.getters['formOrderDetails/isDataValid'])
        const isDataSavedGetter = () =>
            store.getters['formOrderDetails/isDataSaved']
        const isDataSaved = computed(isDataSavedGetter)
        const {loading: savingData, getData: saveData} = useAsyncData(() => store.dispatch('formOrderDetails/saveOrderDetails'))
        const buttonClick = () => {
            if (isDataSaved.value) {
                store.commit('formOrderDetails/SET_SAVED', false) 
            } else if (isDataValid.value) {
                saveData()
            } else {
                showErrors.value = true
            }
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
            showErrors,
            errorMessages,
        }
    },
})
</script>

<style scoped></style>

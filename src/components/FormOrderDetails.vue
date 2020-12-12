<template>
    <WrapperForm
        title="Order Details"
        :loading="loading"
        @click="getClientsData()"
    >
        <WrapperFormSection>
            <template v-slot:default>
                <div :class="$style.inputs">
                    <BaseInput
                        v-model="date"
                        :disabled="disableDate"
                        :show-error="showErrors"
                        :error-message="errorMessages.date"
                        type="date"
                        label="Order Date"
                    />
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
                </div>
            </template>
            <template v-slot:buttons>
                <BaseButton
                    @click="buttonClick()"
                    :is-disabled="loading"
                    :is-loading="savingData"
                    >{{ buttonName }}</BaseButton
                >
            </template>
        </WrapperFormSection>
    </WrapperForm>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, Ref } from 'vue'
import { useStore, Store } from 'vuex'
import WrapperForm from './WrapperForm.vue'
import WrapperFormSection from './WrapperFormSection.vue'
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
    const clients = computed(() => store.getters['formOrderDetails/clients'])
    return {
        loadingClients,
        getClientsData,
        clients,
    }
}

const getClientContactsDataObject = (store: Store<any>) => {
    const getClientContacts = (id: number) =>
        store.dispatch('formOrderDetails/getClientContacts', id)
    const {
        loading: loadingClientContacts,
        getData: getClientContactsData,
    } = useAsyncData(getClientContacts)
    const contacts = computed(() =>
        store.getters['formOrderDetails/clientContacts'](client.value?.id),
    )
    const watchClient = () =>
        watch(client, newVal =>
            newVal?.id ? getClientContactsData(Number(newVal?.id)) : null,
        )
    watchClient()
    return {
        loadingClientContacts,
        getClientContactsData,
        contacts,
    }
}

const getSaveDataObject = (store: Store<any>, showErrors: Ref<boolean>) => {
    const isDataValid = computed(
        () => store.getters['formOrderDetails/isDataValid'],
    )
    const isDataSavedGetter = () =>
        store.getters['formOrderDetails/isDataSaved']
    const isDataSaved = computed(isDataSavedGetter)
    const { loading: savingData, getData: saveData } = useAsyncData(() =>
        store.dispatch('formOrderDetails/saveOrderDetails'),
    )
    const buttonClick = () => {
        if (isDataSaved.value) {
            store.commit('formOrderDetails/SET_SAVED', false)
        } else if (isDataValid.value) {
            saveData()
        } else {
            showErrors.value = true
        }
    }
    return {
        isDataValid,
        isDataSaved,
        savingData,
        buttonClick,
    }
}

export default defineComponent({
    name: 'FormOrderDetails',
    components: {
        WrapperForm,
        WrapperFormSection,
        BaseButton,
        BaseInput,
        BaseSelect,
    },
    setup() {
        const store = useStore()

        // VALIDATORS
        const showErrors = ref(false)
        const errorMessages = computed(
            () => store.getters['formOrderDetails/errorMessages'],
        )

        // GET CLIENTS DATA
        const {
            loadingClients,
            getClientsData,
            clients,
        } = getClientsDataObject(store)
        getClientsData()

        // GET CONTACTS DATA
        const {
            loadingClientContacts,
            getClientContactsData,
            contacts,
        } = getClientContactsDataObject(store)

        // SAVE DATA
        const {
            isDataValid,
            isDataSaved,
            savingData,
            buttonClick,
        } = getSaveDataObject(store, showErrors)

        // UI MODIFICATORS
        const buttonName = computed(() =>
            isDataSaved.value ? 'Modify' : 'Save',
        )
        const loading = computed(
            () => loadingClients.value || loadingClientContacts.value,
        )
        const disableInputs = computed(
            () => isDataSaved.value || savingData.value,
        )
        const disableDate = computed(() => disableInputs.value)
        const disabledContacts = computed(
            () =>
                loading.value ||
                contacts.value.length < 1 ||
                disableInputs.value,
        )
        const disabledClients = computed(
            () => loading.value || disableInputs.value,
        )

        return {
            date,
            client,
            clients,
            contact,
            contacts,
            getClientsData,
            buttonClick,
            showErrors,
            errorMessages,
            loading,
            savingData,
            disableDate,
            disabledClients,
            disabledContacts,
            buttonName,
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

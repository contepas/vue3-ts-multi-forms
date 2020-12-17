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
                        :disabled="disable.date"
                        :show-error="showErrors"
                        :error-message="errorMessages.date"
                        type="date"
                        label="Order Date"
                    />
                    <BaseSelect
                        v-model="client"
                        :options="clients"
                        :disabled="disable.clients"
                        :show-error="showErrors"
                        :error-message="errorMessages.client"
                        label="Client"
                    />
                    <BaseSelect
                        v-model="contact"
                        :options="contacts"
                        :disabled="disable.contacts"
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
import useAsyncData from '../composables/useAsyncData'
import asyncCall from '../composables/useAsyncDataV2'

import { date, client, contact } from '../composables/store/orderDetailsData'

const getClientsData = (store: Store<any>) => {
    const getClients = () => store.dispatch('formOrderDetails/getClients')
    const { loading, callback, error } = asyncCall(getClients)
    const value = computed(() => store.getters['formOrderDetails/clients'])
    return {
        value,
        loading,
        error,
        callback,
    }
}

const getClientContactsData = (store: Store<any>) => {
    const getClientContacts = (id: number) =>
        store.dispatch('formOrderDetails/getClientContacts', id)
    const { loading, error, callback } = asyncCall(getClientContacts)
    const value = computed(() =>
        store.getters['formOrderDetails/clientContacts'](client.value?.id),
    )
    const watchClient = () =>
        watch(client, newVal =>
            newVal?.id ? callback(Number(newVal.id)) : null,
        )
    watchClient()
    return {
        value,
        loading,
        error,
        callback,
    }
}

const saveModify = (store: Store<any>) => {
    const showErrors = ref(false)
    const errorMessages = computed(
        () => store.getters['formOrderDetails/errorMessages'],
    )
    const isDataValid = computed(
        () => store.getters['formOrderDetails/isDataValid'],
    )
    const isDataSaved = computed(
        () => store.getters['formOrderDetails/isDataSaved'],
    )
    const { loading: savingData, getData: saveData } = useAsyncData(() =>
        store.dispatch('formOrderDetails/saveOrderDetails'),
    )
    const buttonName = computed(() => (isDataSaved.value ? 'Modify' : 'Save'))
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
        showErrors,
        errorMessages,
        isDataValid,
        isDataSaved,
        savingData,
        buttonClick,
        buttonName,
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

        // GET DATA
        const clients = getClientsData(store)
        clients.callback()
        const contacts = getClientContactsData(store)
        const loading = computed(
            () => clients.loading.value || contacts.loading.value,
        )

        // SAVE DATA
        const {
            showErrors,
            errorMessages,
            isDataValid,
            isDataSaved,
            savingData,
            buttonClick,
            buttonName,
        } = saveModify(store)

        // DISABLED
        const disableInputs = computed(
            () => isDataSaved.value || savingData.value,
        )
        const disable = computed(() => ({
            date: disableInputs.value,
            contacts:
                loading.value ||
                contacts.value.value.length < 1 ||
                disableInputs.value,
            clients: loading.value || disableInputs.value,
        }))

        return {
            date,
            client,
            contact,
            clients: clients.value,
            contacts: clients.value,
            buttonClick,
            showErrors,
            errorMessages,
            loading,
            savingData,
            disable,
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

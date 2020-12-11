<template>
	<div>
		<FormOrderDetails />
		<FormSellers />
		<FormItems />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormOrderDetails from '../components/FormOrderDetails.vue'
import FormSellers from '../components/FormSellers.vue'
import FormItems from '../components/FormItems.vue'

export default defineComponent({
    name: 'Forms',
    components: {
        FormOrderDetails,
        FormSellers,
        FormItems,
    },
    setup() {
        return {}
    },
})
</script>

<style scoped>
</style>

<template>
  <div class="input-item">
    <label v-if="label" :for="id">{{ label }}</label>
    <input v-bind="attrs" @input="emitValue" :value="modelValue" />
	<p v-show="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script lang="ts">
import { uniqueId } from 'lodash'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'BaseInput',
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            default: uniqueId('input_'),
        },
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
            validator: (type: string): boolean =>
                ['text', 'number'].includes(type),
        },
        errorMessage: {
            type: String,
            default: '',
        },
    },
    methods: {
        emitValue(event: any) {
            this.$emit('update:modelValue', event.target.value)
        },
    },
    computed: {
        attrs(): any {
            const { $attrs, id, modelValue, type } = this
            return { ...$attrs, id, modelValue, type }
        },
    },
})
</script>

<style lang="scss" scoped>
@import '../style/global.scss';

input {
    @include input-container;
    background: white;
    &:disabled,
    &[aria-disabled='true'] {
        background-color: #f4f4f4a3;
    }
}
</style>
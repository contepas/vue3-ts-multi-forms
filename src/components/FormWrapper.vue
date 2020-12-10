<template>
    <h3 :class="$style.title">{{ title }}</h3>
    <div :class="$style.container">
        <SvgRefresh style="float: right" :spin="loading" @click="$emit('click')"/>
        <div 
            v-for="(value, index) in dynamicSlots"
            :key="`${title}-${index}`"
            :class="$style.section"
        >
            <slot :name="index"></slot>
        </div>
        <div :class="$style.buttons">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SvgRefresh from './icons/SvgRefresh.vue'

export default defineComponent({
    name: 'FormWrapper',
    components: { SvgRefresh },
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots }) {
        const dynamicSlots = computed(() => {
            const { buttons, ...dynamicSlots} = slots
            return dynamicSlots
        })
        return {
            dynamicSlots
        }
    }
})
</script>

<style lang="scss" module>
@import '../style/global.scss';

.title {
    padding-left: 10px;
    margin-bottom: 5px;
}
.container {
    border: 1px solid $secondary-color;
    border-radius: 10px;
    padding: 20px;
    &:hover {
        border-color: $primary-color;
    }
}
.section {
    background-color: lightgray;
    border-radius: 10px;
    padding: 20px;
    margin-top: 28px;
}
.buttons {
    margin-left: auto;
}
</style>
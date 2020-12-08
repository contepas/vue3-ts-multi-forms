<template>
    <h3 :class="$style.title">{{ title }}</h3>
    <div :class="$style.container">
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

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            required: true,
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
    margin-bottom: 20px;
}
.buttons {
    margin-left: auto;
}
</style>
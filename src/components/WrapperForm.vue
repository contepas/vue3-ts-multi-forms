<template>
    <h3 :class="$style.title">{{ title }}</h3>
    <div :class="$style.container">
        <SvgRefresh
            style="float: right"
            :spin="loading"
            @click="$emit('click')"
        />
        <slot name="default"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SvgRefresh from './icons/SvgRefresh.vue'

export default defineComponent({
    name: 'WrapperForm',
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
.section-container {
    margin: 20px;
}
</style>

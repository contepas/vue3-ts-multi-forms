<template>
    <h3 :class="$style.title">{{ title }}</h3>
    <div :class="$style.container">
        <div 
            v-for="(value, index) in $slots"
            :key="`${title}-${index}`"
            :class="$style.section"
        >
            <slot :name="index"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            required: true,
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
.section {
    background-color: lightgray;
    border-radius: 10px;
    padding: 10px;
}
</style>
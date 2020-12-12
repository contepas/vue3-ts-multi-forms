<template>
    <div :class="[$style.section]">
        <div style="width: 100%">
            <slot name="default"></slot>
        </div>
        <div :class="$style.buttons">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
    name: 'WrapperFormSection',
})
</script>

<style lang="scss" module>
.section {
    background-color: lightgray;
    border-radius: 10px;
    padding: 20px;
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
}
.buttons {
    width: 100%;
    > div {
        width: 100%;
        margin-top: 20px;
    }
    @media (min-width: 500px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: flex-end;
        > div {
            width: 150px;
            margin-left: 20px;
        }
    }
}
</style>

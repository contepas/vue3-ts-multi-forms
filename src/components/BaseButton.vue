<template>
    <div :class="containerStyle">
        <span><slot>Button</slot></span>
        <span v-if="isLoading" style="margin-left: 15px;">
            <SvgLoading
                width="16px"
                height="16px"
                color="white"
            />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, useCssModule } from 'vue'
import SvgLoading from './icons/SvgLoading.vue'

export default defineComponent({
    name: 'BaseButton',
    components: { SvgLoading },
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const containerStyle = computed(() => {
            const { disabled, container } = useCssModule()
            const { isDisabled, isLoading } = props
            return [
                container,
                { [disabled]: isDisabled || isLoading}
            ]
        })
        return {
            containerStyle
        }
    },
})
</script>

<style lang="scss" module>
@import '../style/global.scss';

.container {
    @include input-container;
    background-color: $primary-color;
    cursor: pointer;
    color: white;
    font-weight: 700;
    border-color: $primary-color;
    width: 150px;
    display: flex;
    justify-content: center;
    &:active {
        border-color: $secondary-color;
    }
}
.disabled {
    opacity: 0.6;
    cursor: default;
}
</style>
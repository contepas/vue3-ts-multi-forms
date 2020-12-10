<template>
    <h3 :class="$style.title">{{ title }}</h3>
    <div :class="$style.container">
        <SvgRefresh style="float: right" :spin="loading" @click="$emit('click')"/>
        <div 
            v-for="(value, index) in dynamicSlots"
            :key="`${title}-${index}`"
            :class="[$style.section]"
        >
            <div  :class="[$style.items]">
                <slot :name="index"></slot>
            </div>
            <div :class="$style.buttons">
                <slot name="buttons"></slot>
            </div>
        </div>
        <div :class="[$style.buttons, $style.center]">
            <slot name="extra"></slot>
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
            const { buttons, extra, ...dynamicSlots} = slots
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

@mixin container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.items {
    @include container;
    flex-direction: column;
    > div {
        margin-bottom: 20px;
    }
    @media (min-width: 600px) {
        flex-direction: row;
        > div {
            margin-right: 20px;
        }
    }
}
.buttons {
    @include container;
    justify-content: flex-end;
    align-items: flex-end;
    > div {
        margin-left: 20px;
    }
}
.center {
    justify-content: center;
    margin-top: 20px;
}

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
    display: flex;
    flex-wrap: wrap;
}
</style>
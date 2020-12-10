<template>
    <svg width="22" height="22" viewBox="0 0 27 27" :class="[$style.icon, {[$style.rotation]: spin}]">
        <g clip-path="url(#clip0)">
            <path  d="M26.426 12.1772C25.8336 11.7821 25.0331 11.9421 24.6381 12.5345L24.5998 12.592C24.1335 6.22288 18.8028 1.18323 12.3167 1.18323C5.52524 1.18331 0 6.70855 0 13.5C0 20.2915 5.52524 25.8167 12.3167 25.8167C13.2661 25.8167 14.0356 25.0472 14.0356 24.0978C14.0356 23.1485 13.2661 22.3789 12.3167 22.3789C7.42084 22.3788 3.4378 18.3958 3.4378 13.5C3.4378 8.60424 7.42084 4.62112 12.3167 4.62112C16.8544 4.62112 20.6074 8.04302 21.1322 12.4418C20.7185 11.9269 19.9731 11.8039 19.4133 12.1772C18.8209 12.5722 18.6609 13.3727 19.0559 13.9651L21.6087 17.7932C21.9099 18.2449 22.4 18.5146 22.9198 18.5146C23.4395 18.5146 23.9295 18.2448 24.2306 17.7932L26.7833 13.9651C27.1782 13.3727 27.0183 12.5722 26.426 12.1772Z" :fill="color"/>
        </g>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SvgRefresh',
    props: {
        spin: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: '#2c3e50'
        }
    },
    setup () {
        

        return {}
    }
})
</script>

<style lang="scss" module>
.icon {
  vertical-align: middle;
  width: 1.2em;
  cursor: pointer;
}
.rotation {
  animation: rotation 1.5s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
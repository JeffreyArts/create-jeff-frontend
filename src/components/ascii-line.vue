<template>
    <div class="ascii-line" ref="line">{{ line }}</div>
</template>


<script lang="ts">
import { defineComponent } from "vue"


export default defineComponent({
    name: "acii-line",
    data: () => {
        return {
        }
    },
    props: {
        character: {
            type: String,
            required: false,
            default: '-'
        },
    },
    computed: {
        line() {
            return this.character.repeat(512)
        }
    },
    created() {
    },
    mounted() {
        if (this.$refs['line']) {
            const fontSize = window.getComputedStyle(this.$refs['line']).fontSize.replace("px", "")
            this.$refs['line'].style.height = `${fontSize}px`
        }
    },
    unmounted() {
        
    },
    methods: {
        
    }
})
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";
.ascii-line {
    width: 100%;
    display: inline-block;
    word-wrap: break-word;
    overflow: hidden;
}
</style>

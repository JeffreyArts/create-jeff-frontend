<template>
    <i class="icon" v-if="type && iconList[type] !== undefined">
        <div class="icon-svg" v-html="iconList[type]" />
        <span v-if="label" class="icon-label">{{ label }}</span>
    </i>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import cross from "./../assets/icons/cross.svg?raw"
import calendar from "./../assets/icons/calendar.svg?raw"
import chevronDown from "@/assets/icons/chevron-down.svg?raw"
import chevronUp from "@/assets/icons/chevron-up.svg?raw"
import chevronLeft from "@/assets/icons/chevron-left.svg?raw"
import chevronRight from "@/assets/icons/chevron-right.svg?raw"

export default defineComponent({
    name: "icon",
    props: {
        type: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false
        }
    },
    data: () => {
        return {
            iconList: {
                calendar,
                cross,
                chevronDown,
                chevronUp,
                chevronLeft,
                chevronRight
            } as { [key: string]: string }
        }
    },
})
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;

    .icon-svg {
        display: inline-block;
        height: 100%;
        width: auto;
        
        svg {
            fill: currentColor;
            width: auto;    
            height: inherit;
        }
    }
    .icon-label {
        color: currentColor;
        display: inline-block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        font-style: normal;
        margin-top: 8px;
    }
}
</style>

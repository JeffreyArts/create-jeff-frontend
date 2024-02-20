<template >
  <router-view />
</template>

<script setup lang="ts">
    
import Strapi from "@/stores/strapi"
import LocalDB from "@/stores/localdb"
import Locale from "@/stores/locale"

const strapi = Strapi()
const locale = Locale()
const localDB = LocalDB()

if (typeof window !== "undefined") {
    locale.select(localStorage.getItem("i18n_locale") || locale.current)
    localDB.load()
    strapi.init()
}
</script>

<style src="./assets/scss/index.scss"></style>

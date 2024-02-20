import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import { routerOptions } from "@/routes"
import { createI18n } from "vue-i18n"
import { createPinia } from "pinia"
import { VueHeadMixin } from "@unhead/vue"
import "./assets/scss/index.scss"
import messages from "@/locale"



export const createApp = ViteSSG(
    App,
    routerOptions ,
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
        
        const pinia = createPinia()

        const i18n = createI18n({
            fallbackLocale: "en",
            messages
        })
        
        
        app.use(i18n)
        app.use(pinia)
        app.mixin(VueHeadMixin)


        pinia.use(({ store }) => {
            if (store.$id === "locale") {
                store.$i18n = i18n.global
            }
        })
    },
)
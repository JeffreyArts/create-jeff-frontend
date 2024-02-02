import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import { routerOptions } from "@/routes"
import { createPinia } from "pinia"
import { VueHeadMixin } from "@unhead/vue"
import "./assets/scss/index.scss"

export const createApp = ViteSSG(
    App,
    routerOptions ,
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
        const pinia = createPinia()
        app.use(pinia)
        app.mixin(VueHeadMixin)
    },
)
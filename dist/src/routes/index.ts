import Home from "@/routes/home.vue"
import ResetPassword from "@/routes/auth/password-reset.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/reset-password",
        name: "Reset password",
        component: ResetPassword,
    }
]


const routerOptions = {
    routes,
}

export { routerOptions }
export default routerOptions

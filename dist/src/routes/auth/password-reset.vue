<template>
    <div class="home">
        <div class="container">
            
            <h1 class="home-title">
                <span class="left">
                    Jeff-frontend boilerplate
                </span>
            </h1>

            <ascii-line character="-"/>

            <form class="reset-password-form" v-if="code">
                <p>
                    Provide a new password below
                </p>
                
                <reset-password :code="code" @resetSuccess="redirect"/>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import strapiStore from "@/stores/strapi"
import asciiLine from "@/components/ascii-line.vue"
import resetPassword from "@/components/auth/reset-password.vue"

export default defineComponent ({ 
    name: "homePage",
    components: { 
        resetPassword,
        asciiLine 
    },
    props: [],
    setup() {
        const Strapi = strapiStore()
        

        return { Strapi }
    },
    data() {
        return {
            code: "",
        }
    },
    head: { 
        title: "Password reset",
        meta: [
            {
                name: "description",
                content: "Page for resetting the password of the user",
            },
        ]
    },
    created() {
        // set code based on query parameter code
        if (typeof this.$route.query.code == "string") {
            this.code = this.$route.query.code
        } else {
            this.redirect()
        }
    },
    methods: {
        redirect() {
            this.$router.push({ path: "/" })
        }
    }
})

</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

</style>
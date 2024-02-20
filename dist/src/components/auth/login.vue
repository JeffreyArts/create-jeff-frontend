<!-- 
use the .ascii-box-content for styling the content inside the box. Best way is to style it via the parent component/route that you put this element in.
 -->

 <template>
    <div class="auth-form-container">
        <form class="auth-form" @submit="submitForm">
            <div class="auth-form-field">
                <label for="">{{ $t('component::auth/login.email') }}</label>
                <input type="text" v-model="email">
            </div>
            <div class="auth-form-field" v-if="!forgotPassword">
                <label for="">{{ $t('component::auth/login.password') }}</label>
                <input type="password" v-model="password">
            </div>
            <div class="auth-form-field">
                <ascii-button type="submit" v-if="!forgotPassword">
                    {{ $t('component::auth/login.login') }}
                </ascii-button>


                <ascii-button @click="forgotPassword = false" v-if="forgotPassword">
                    {{ $t('component::auth/login.goBack') }}
                </ascii-button>
                <ascii-button type="submit" v-if="forgotPassword">
                    {{ $t('component::auth/login.resetPassword') }}
                </ascii-button>
            </div>
            <span @click="forgotPassword = true" v-if="!forgotPassword">{{ $t('component::auth/login.forgotPassword') }}</span>
        </form>
        <div class="auth-form-error" v-if="error">
            <p v-html="error.message" />
        </div>    
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import strapiStore from "@/stores/strapi"
import asciiButton from "@/components/ascii-button.vue"

export default defineComponent({
    name: "auth-form",
    components: {
        asciiButton
    },
    props: {
        character: {
            type: String,
            required: false,
            default: "─"
        },
    },
    setup() {
        const Strapi = strapiStore()
        return { Strapi }
    },
    data: () => {
        return {
            email: "",
            password: "",
            forgotPassword: false,
            error: null as null | { message: string },
            errorMessages: {
                missing_credentials: "Please enter your username and password",
                missing_username: "Please enter your username",
                missing_password: "Please enter your password",
                invalid_credentials: "Invalid username or password",
                unknown: "Unknown server error, please try again later"
            }
            
        }
    },
    methods: {
        submitForm($event: Event) {
            $event.preventDefault()
            this.error = null
            if (!this.forgotPassword) {
                this.Strapi.authenticateUser(this.email, this.password)
                    .then()
                    .catch((err) => {
                        console.log(err)
                        this.error =  err
                    })
                this.$emit("loginSuccess")
            } else {
                this.Strapi.requestPasswordReset(this.email)
                    .then(() => {
                        this.$emit("requestPasswordSuccess", this.email)
                    })
                    .catch((err) => {
                        console.log(err)
                        this.error =  err
                    })
            }
        },
    }
})
</script>

<style lang="scss">

</style>

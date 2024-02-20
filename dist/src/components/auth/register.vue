<!-- 
use the .ascii-box-content for styling the content inside the box. Best way is to style it via the parent component/route that you put this element in.
 -->

 <template>
    <div class="register-form-container">
        <form class="register-form" @submit="submitForm">
            <div class="register-form-field">
                <label for="">{{ $t('component::auth/register.email') }}</label>
                <input type="text" v-model="email">
            </div>
            <div class="register-form-field">
                <label for="">{{ $t('component::auth/register.username') }}</label>
                <input type="text" v-model="username">
            </div>
            <div class="register-form-field">
                <label for="">{{ $t('component::auth/register.password') }}</label>
                <input type="password" v-model="password" minlength="6">
            </div>
            <div class="register-form-field">
                <ascii-button type="submit">
                    {{ $t('component::auth/register.register') }}
                </ascii-button>
            </div>
        </form>
        <div class="register-form-error" v-if="errors">
            <p v-html="err.message" v-for="(err, k) in errors" :key="k"/>
        </div>    
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import strapiStore from "@/stores/strapi"
import asciiButton from "@/components/ascii-button.vue"

export default defineComponent({
    name: "register-form",
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
            username: "",
            email: "",
            password: "",
            errors: null as null | Array<{ message: string }>,
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
            this.errors = null

            this.Strapi.registerUser(this.username, this.email, this.password)
                .then()
                .catch((err) => {
                    console.log(err)
                    this.errors =  err
                })
            this.$emit("registerSuccess")
        },
    }
})
</script>

<style lang="scss">

</style>

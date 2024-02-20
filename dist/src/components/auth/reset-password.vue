<!-- 
use the .ascii-box-content for styling the content inside the box. Best way is to style it via the parent component/route that you put this element in.
 -->

 <template>
    <div class="reset-password-container">
        <form class="reset-password" @submit="submitForm">
            <div class="reset-password-field">
                <label for="">{{ $t('component::auth/resetPassword.newPassword') }}</label>
                <input type="password" v-model="password" minlength="6">
            </div>
            <div class="reset-password-field">
                <ascii-button type="submit">
                    {{ $t('component::auth/resetPassword.resetPassword') }}
                </ascii-button>
            </div>
        </form>
        <div class="reset-password-error" v-if="error">
            <p v-html="error.message" />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import strapiStore from "@/stores/strapi"
import asciiButton from "@/components/ascii-button.vue"


export default defineComponent({
    name: "reset-password",
    components: {
        asciiButton
    },
    props: {
        code: {
            type: String,
            required: true,
        },
    },
    setup() {
        const Strapi = strapiStore()
        return { Strapi }
    },
    data: () => {
        return {
            password: "",
            error: null as null | { message: string },
            errorMessages: {
                unknown: "Unknown server error, please try again later"
            }
            
        }
    },
    methods: {
        submitForm($event: Event) {
            $event.preventDefault()
            this.error = null

            this.Strapi.resetPassword(this.password, this.code)
                .then(() => {

                    this.$emit("resetSuccess")
                })
                .catch((err) => {
                    console.log(err)
                    this.error =  err
                })
        },
    }
})
</script>

<style lang="scss">

</style>

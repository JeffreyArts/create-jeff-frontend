<!-- 
use the .ascii-box-content for styling the content inside the box. Best way is to style it via the parent component/route that you put this element in.
 -->

 <template>
    <div class="rest-demo-container">
        <form class="rest-demo" @submit="submitForm">
            <div class="row">
                <div class="rest-demo-field">
                    <label for="">Method</label>
                    <select v-model="method">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>   
                </div>
                <div class="rest-demo-field">
                    <label for="">Path</label>
                    <input type="text" v-model="path">
                </div>
                <div class="rest-demo-field" v-if="method == 'POST' || method == 'PUT'">
                    <label for="">Body</label>
                    <textarea type="text" v-model="requestBody" rows="5" />
                </div>

            </div>
            <div class="button-container">
                <ascii-button type="submit">
                    {{ $text('component::rest-demo.submit') }}
                </ascii-button>
            </div>
        </form>
        
        <div class="rest-demo-result" v-if="output.url">
            <span v-html="$text('component::rest-demo.outputMessage', { method: output.method, url: output.url })" />
            <pre v-html="printJSON(output.data)" />
        </div>    
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import StrapiStore  from "@/stores/strapi"
import { AxiosResponse, AxiosError } from "axios"
import asciiButton from "@/components/ascii-button.vue"

export default defineComponent({
    name: "rest-demo",
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
        const Strapi = StrapiStore()
        
        return { Strapi }
    },
    data: () => {
        return {
            method: "GET",
            path: "",
            requestBody: "",
            output: {
                method: "",
                url: "",
                data: {}
            }
        }
    },
    methods: {
        submitForm($event: Event) {
            $event.preventDefault()
            let request
            if (this.method == "POST" || this.method == "PUT") {
                request = this.Strapi.REST(this.method, this.path, this.requestBody)
            } else {
                request = this.Strapi.REST(this.method, this.path)
            }
            
            if (!request) return
            
            let path = this.path
            if (path[0] === "/") {
                path = path.slice(1)
            }
            this.output.method = this.method
            this.output.url = this.Strapi.url + "/" + path
            
            request.then((response: AxiosResponse) => {
                this.output.data = response
            }).catch((error: AxiosError) => {
                this.output.data = error
            })
        },
        printJSON(json: object) {
            return JSON.stringify(json, null, 4)
        }
    }
})
</script>

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";
.rest-demo-container {
    width: 100%;
    .rest-demo {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        .row {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 32px;
            margin-bottom: 32px;
        }
    }
    
    .rest-demo-field {
        width: calc(100% / 3);
        display: flex;
        flex-flow: column;
        input,
        select { 
            width: 100%;
            margin: 0.5rem 0 0;
        }
    }
    .button-container {
        justify-content: flex-end;
        display: flex;
    }
    pre {
        margin-top: 24px;
        width: 100%;
        max-height: 50vh;
        overflow: auto;
    }
}
</style>

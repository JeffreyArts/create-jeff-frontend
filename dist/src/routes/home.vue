<template>
    <div class="home">
        <div class="container">
            
            <h1 class="home-title">
                <span class="left">
                    Jeff-frontend boilerplate
                </span>
                <span class="right">
                    <Icon type="calendar" />{{ currentDate }}
                </span>
            </h1>

            <ascii-line character="-"/>

            <div class="home-description">
                <p>
                    This is a boilerplate for a frontend application using Vue 3, Typescript, Vue Router, Pinia, Vite, Lodash, PouchDB, Sass, normalize.css & SocketIO.
                </p>
                <p>
                    It can best be used with its backend counterpart <a href="https://github.com/JeffreyArts/create-jeff-backend">Jeff-backend</a>, with you can create with <pre @click="copyToClipboard" title="Click to copy">yarn create jeff-backend</pre>.
                </p>
            </div>

                
            <ascii-line character="="/>
            <br>
            <ascii-button @click="emitEvent('test')">Emit event</ascii-button>
            &nbsp;
            <ascii-button class="home-button-right" @click="postRequest('test')">Post request</ascii-button>
            <br>
            <strong>Console output</strong>
            <ascii-box class="home-console">
                <span class="home-console-entry" v-for="event in consoleEvents" :key="event">{{ event }}</span>
            </ascii-box>
        </div>
    </div>
</template>


<script lang="ts">
import {defineComponent} from "vue"
import LocalDB from "../stores/localdb"
import SocketIO from "../stores/socketio"
import Icon from "./../components/icon.vue"
import asciiLine from "./../components/ascii-line.vue"
import asciiButton from "./../components/ascii-button.vue"
import asciiBox from "./../components/ascii-box.vue"
import dayjs from "dayjs"
import _ from "lodash"

export default defineComponent ({ 
    name: "homePage",
    components: {Icon, asciiLine, asciiButton, asciiBox},
    props: [],
    setup() {
        const localDB = LocalDB()
        const socketIO = SocketIO()

        return { localDB, socketIO }
    },
    data() {
        return {
            consoleEvents: [] as Array<string>
        }
    },
    computed: {
        currentDate() {
            return dayjs().format("DD-MM-YYYY")
        }
    },
    mounted() {
        if (this.socketIO.socket) { 

            this.socketIO.socket.on("connect", () => {
                this.consoleEvents.push(`${dayjs().format("HH:mm:ss")} | Socket connected`)
            })

            this.socketIO.socket.on("connect_error", () => {
                this.consoleEvents.push(`${dayjs().format("HH:mm:ss")} | Can not establish socket connection @ ${this.socketIO.URL}`) 
            })

            this.socketIO.socket.on("test", (data) => {
                this.consoleEvents.push(`${dayjs().format("HH:mm:ss")} | ${data}`)
            })
        } 
    },
    methods: {
        emitEvent(event: string) {
            this.socketIO.emit(event, "test")
            this.consoleEvents.push(`${dayjs().format("HH:mm:ss")} | Test event emitted`)
        },
        postRequest(data: any) {
            this.consoleEvents.push(`${dayjs().format("HH:mm:ss")} | Post request send`)
            fetch(`${import.meta.env.VITE_REST_API}/test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        },
        copyToClipboard(mouseEvent: MouseEvent) {
            const element = mouseEvent.target as HTMLElement
            const textarea = document.createElement("textarea")
            textarea.textContent = element.innerText
            document.body.appendChild(textarea)
            textarea.select()

            try {
                document.execCommand("copy")
                console.log("Copied to clipboard")
            } catch (err) {
                console.error("Failed to copy to clipboard: ", err)
            } finally {
                document.body.removeChild(textarea)
            }
        }
    }
})

</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

.home {
    min-height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    pre {
        display: inline-block;
        background-color: $textColor;
        color: $white;
        padding: 8px;
        border-radius: 4px;
        margin: 0;
        cursor: pointer;
    }
}

.home-title {
    width: 100%;
    text-align: right;
    font-size:16px;
    font-weight: normal;
    .icon {
        height: 1.2em;
        translate: -8px 4px;
        display: inline-block;
    }   
    .left {
        float: left;
        font-weight: bold;
    }
}

.home-button-right {
    float: right;
}

.home-description {
    padding: 32px 0;
}

.home-console {
    width: 100%;
    display: block;
}

.home-console-entry {
    display: inline-block;
    width: 100%;
    &:before {
        content: "> ";
        font-weight: bold;
    }
}


</style>
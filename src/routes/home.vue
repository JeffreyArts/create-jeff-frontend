<template>
    <div class="home">
        <div class="container">
            
            <h1 class="home-title">{{ currentDate }}</h1>
            <ascii-line character="-"/>
            <p class="home-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quas ut optio, autem, facilis ab magni, tenetur aliquid vel rerum assumenda fugit a quis quidem fugiat id facere sit? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quas ut optio, autem, facilis ab magni, tenetur aliquid vel rerum assumenda fugit a quis quidem fugiat id facere sit? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quas ut optio, autem, facilis ab magni, tenetur aliquid vel rerum assumenda fugit a quis quidem fugiat id facere sit?</p>
            <ascii-line character="-"/>
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
import LocalDB from "../stores/localdb";
import SocketIO from "../stores/socketio";
import Icon from "./../components/icon.vue"
import asciiLine from "./../components/ascii-line.vue"
import asciiButton from "./../components/ascii-button.vue"
import asciiBox from "./../components/ascii-box.vue"
import dayjs from "dayjs"
import _ from "lodash"

export default defineComponent ({ 
    name: "homePage",
    components: {Icon,asciiLine, asciiButton, asciiBox},
    props: [],
    setup() {
        const localDB = LocalDB();
        const socketIO = SocketIO();

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
            fetch("http://localhost:3000/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        },
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
}

.home-title {
    width: 100%;
    text-align: right;
    font-size:16px;
    font-weight: normal;
}

.home-button-right {
    float: right;
}
.home-description {
    padding: 32px 0;
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
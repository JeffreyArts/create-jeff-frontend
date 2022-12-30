<template>
    <div class="home">
        <div class="container">
            <h1>HOME</h1>
            <ascii-line character="-"/>
            <br>
            <br>
            <ascii-button @click="emitEvent('test')">Emit event</ascii-button>
            &nbsp;
            <ascii-button @click="postRequest('test')">Post request</ascii-button>
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
import dayjs from "dayjs"
import _ from "lodash"

export default defineComponent ({ 
    name: "homePage",
    components: {Icon,asciiLine,asciiButton},
    props: [],
    setup() {
        const localDB = LocalDB();
        const socketIO = SocketIO();

        return { localDB, socketIO }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    mounted() {
        if (this.socketIO.socket) {
            this.socketIO.socket.on("test", (data) => {
                console.log(data)
            })
        }
    },
    methods: {
        emitEvent(event: string) {
            this.socketIO.emit(event, "test")
        },
        postRequest(data: any) {
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


</style>
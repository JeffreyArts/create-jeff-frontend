import { defineStore } from "pinia";
import { io } from "socket.io-client";
import * as SocketIOClient from 'socket.io-client';
// const socket = io("http://localhost:1234");


export const socketIO = defineStore({
    id: "socketIO",
    state: () => ({
        socket: null as null | SocketIOClient.Socket,
    }),
    actions: {
       
        emit(event:string, data:any) {
            if (!this.socket) {
                console.error("Init socket first")
                return;
            }
            console.log(event, data)
            
            this.socket.emit(event, data)
        },
        // on(event:string, fn:Function) {
        //     if (!this.socket) {
        //         console.error("Init socket first")
        //         return;
        //     }            
        //     this.socket.on(event, fn)
        // },
        init() {
            console.log("init")
            this.socket = io(import.meta.env.VITE_SOCKETIO);
            console.log(this.socket)
        }
    },
    getters: {
    }
});

export default socketIO;
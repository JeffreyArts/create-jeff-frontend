<template >
  <router-view />
</template>


<script setup lang="ts">
    
import SocketIO from "./stores/socketio"
import LocalDB from "./stores/localdb"
const socketIO = SocketIO()
const localDB = LocalDB()
localDB.load()
socketIO.init()
</script>

<style src="./assets/scss/index.scss"></style>

<template>
  <div id="app">
    <button @click.prevent="myUndefinedFunction()">Create Renderer Error</button>
    <button @click.prevent="crash()">Crash Renderer</button>
    <button @click.prevent="send('error')">Create Main Error</button>
    <button @click.prevent="send('crash')">Crash Main</button>
  </div>
</template>

<script>

import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  methods: {
    crash () {
      process.crash()
    },

    send (type) {
      ipcRenderer.send('test', type)
    }
  }
}

</script>

<style>
button {
  font-weight: 700;
  margin: 1em;
  padding: 1em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

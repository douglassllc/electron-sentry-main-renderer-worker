<template>
  <div id="app-worker">
    <button @click.prevent="myUndefinedFunction()">Create Worker Error</button>
    <button @click.prevent="crash()">Crash Worker</button>
  </div>
</template>

<script>

export default {
  name: 'AppWorker',
  methods: {
    crash () {
      process.crash()
    }
  }
}
</script>

<style>

* {
  color: #D6D0DC;
  background-color: #241D2A;
}

button {
  font-weight: 700;
  margin: 1em;
  padding: 1em;
}

#app-worker {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

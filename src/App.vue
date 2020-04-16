<template>
  <div id="app" >
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    background: #e6e7e8;
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}

</script>

<style lang="scss">
  $color: #f00;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  color: $color;
  margin-top: 60px;
}
</style>

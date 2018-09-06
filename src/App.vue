<template>
  <div id="app">
    <!-- <main-header></main-header> -->
    <router-view/>
    <!-- <div>
      <el-button @click="startHacking">Start</el-button>
    </div> -->
  </div>
</template>

<script>
// import mainHeader from '@/common/header'
export default {
  name: 'App',
  // components: {
  //           mainHeader
  //       },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>
    @import "../static/css/main.css";
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
</style>

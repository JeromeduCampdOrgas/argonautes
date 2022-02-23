<template>
  <HEADER />
  <ADDARGONAUTE />
</template>
<script>
import HEADER from "./components/header.vue";
import ADDARGONAUTE from "./components/argonaute.vue";

export default {
  components: {
    HEADER,
    ADDARGONAUTE,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>

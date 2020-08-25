<template>
  <div id="background">
    <img alt="background image" src="../assets/sample-bg.jpg">
  </div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#background {
  background-color: #282c34;
}
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>

<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Background/>
    <Playlist/>
  </div>
</template>

<script>
// @ is an alias to /src
import Background from '@/components/Background.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'Home',
  components: {
    Background,
    Playlist
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0px;
  overflow: hidden
}
</style>

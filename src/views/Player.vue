<template>
  <div class="player">
    <div id="view">
      <Background/>
      <Playlist :tracks="tracks" :currentTrack="currentTrack" @play="play"/>
    </div>
    <ControlBar :currentTrack="currentTrack" :loop="loop" @play="play" 
    @pause="pause" @prev="prev" @next="next" @toggleLoop="toggleLoop" @shufflePlaylist="shufflePlaylist"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Background from '@/components/Background.vue'
import Playlist from '@/components/Playlist.vue'
import ControlBar from '@/components/ControlBar.vue'
const { Howl } = window.require('howler');

export default {
  name: 'Player',
  components: {
    Background,
    Playlist,
    ControlBar
  },
  computed: {
    currentTrack() {
      return this.tracks[this.index];
    }
  },
  data() {
    return {
      index: 0,
      loop: false,
      tracks: [
        {
          title: 'song title',
          artist: 'artist name',
          howl: null
        },
      ],
    }
  },
  methods: {
    play(selectedTrack) {
      this.currentTrack.howl.stop();
      this.index = this.tracks.findIndex(track => track === selectedTrack);
      this.currentTrack.howl.play();
    },
    pause() {
      this.currentTrack.howl.pause();
    },
    prev() {
      let newIndex = this.index - 1;
      if (newIndex < 0) {
        newIndex = this.tracks.length - 1;
      }
      this.play(this.tracks[newIndex]);
    },
    next() {
      let newIndex = this.index + 1;
      if (newIndex > this.tracks.length - 1) {
        newIndex = 0;
      }
      this.play(this.tracks[newIndex]);
    },
    toggleLoop() {
      this.loop = !this.loop;
    },
    shufflePlaylist() {
      this.currentTrack.howl.stop();
      this.tracks.sort(() => Math.random() - 0.5);
      this.play(this.tracks[0]);
    }
  },
  created() {
    // Set up track howl objects
    this.tracks.forEach( (track) => {
      let file = track.title.replace(/\s/g, "_")
      track.howl = new Howl({
        src: [`playlist/${file}.mp3`],
        onend: () => {
          if (this.loop) {
            this.play(this.currentTrack);
          }
          else {
            this.next();
          }
        }
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  /* overflow: hidden */
  height: 100%;
}

#view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0px;
}
</style>

<template>
  <div class="player">
    <div id="player-view">
      <Background />
      <Playlist :tracks="tracks" :currentTrack="currentTrack" @play="play" />
    </div>
    <ControlBar
      :currentTrack="currentTrack"
      :loop="loop"
      :playing="playing"
      @play="play"
      @pause="pause"
      @prev="prev"
      @next="next"
      @toggleLoop="toggleLoop"
      @shufflePlaylist="shufflePlaylist"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Background from "@/components/Background.vue";
import Playlist from "@/components/Playlist.vue";
import ControlBar from "@/components/ControlBar.vue";
const { Howl } = window.require("howler");
const { ipcRenderer } = window.require("electron");

export default {
  name: "Player",
  components: {
    Background,
    Playlist,
    ControlBar,
  },
  computed: {
    currentTrack() {
      return this.tracks[this.index];
    },
  },
  data() {
    return {
      index: 0,
      loop: false,
      playing: false,
      tracks: [
        {
          title: 'song title',
          artist: 'artist name',
          howl: null
        },
      ],
    };
  },
  methods: {
    play(selectedTrack) {
      if (this.currentTrack.howl.playing()) {
        this.currentTrack.howl.stop();
      }
      this.index = this.tracks.findIndex((track) => track === selectedTrack);
      this.currentTrack.howl.play();
      this.playing = true;
    },
    pause() {
      this.currentTrack.howl.pause();
      this.playing = false;
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
    },
    addSongToPlaylist(fileName) {
      let newTrack = {
        title: fileName.replace(/\.[^/.]+$/, ""),
        artist: "unknown",
        howl: null,
      };
      newTrack.howl = new Howl({
        src: [`playlist/${fileName}`],
        onend: () => {
          if (this.loop) {
            this.play(this.currentTrack);
          } else {
            this.next();
          }
        },
      });
      this.tracks.push(newTrack);
    },
  },
  created() {
    // Set up track howl objects
    this.tracks.forEach((track) => {
      let file = track.title.replace(/\s/g, "_");
      track.howl = new Howl({
        src: [`playlist/${file}.mp3`],
        onend: () => {
          if (this.loop) {
            this.play(this.currentTrack);
          } else {
            this.next();
          }
        },
      });
    });
    ipcRenderer.on(
      "add-song",
      function(e, args) {
        this.addSongToPlaylist(args.fileName);
      }.bind(this)
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#player-view {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0px;
  flex: 1 1 auto;
}
</style>

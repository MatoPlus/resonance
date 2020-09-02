<template>
  <div class="controlbar">
    <input
      v-model="trackProgress"
      type="range"
      min="0"
      max="1"
      step="0.01"
      @input="updateTrackProgress(trackProgress)"
    />
    <h2>{{ currentTrack.title }} - {{ currentTrack.artist }}</h2>
    <button flat icon @click="shufflePlaylist">
      <fa-icon :icon="['fas', 'random']" />
    </button>
    <button class="prev" @click="prev">Prev</button>
    <button
      class="play"
      v-if="!currentTrack.howl.playing()"
      @click="play(currentTrack)"
    >
      Play
    </button>
    <button class="pause" v-else @click="pause">Pause</button>
    <button class="next" @click="next">Next</button>
    <button flat icon @click="toggleLoop">
      <fa-icon
        style="color: blue"
        v-if="this.loop"
        :icon="['fas', 'redo-alt']"
      />
      <fa-icon style="color: black" v-else :icon="['fas', 'redo-alt']" />
    </button>
    <button flat icon @click="toggleMute">
      <template v-if="!this.muted">
        <fa-icon :icon="['fas', 'volume-up']" v-if="this.volume >= 0.5" />
        <fa-icon :icon="['fas', 'volume-down']" v-else-if="this.volume > 0" />
        <fa-icon :icon="['fas', 'volume-off']" v-else />
      </template>
      <fa-icon :icon="['fas', 'volume-mute']" v-show="this.muted" />
    </button>
    <input
      v-model="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      @input="updateVolume(volume)"
    />
  </div>
</template>

<script>
const { Howler } = window.require("howler");
export default {
  name: "ControlBar",
  data() {
    return {
      volume: 0.5,
      muted: false,
      seek: 0,
      trackProgress: 0,
    };
  },
  props: {
    currentTrack: Object,
    loop: Boolean,
    playing: Boolean,
  },
  methods: {
    play(selectedTrack) {
      this.$emit("play", selectedTrack);
    },
    pause() {
      this.$emit("pause");
    },
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    },
    updateVolume(newVolume) {
      Howler.volume(newVolume);
    },
    updateTrackProgress(progress) {
      let trackHowl = this.currentTrack.howl;
      if (trackHowl.playing()) {
        this.seek = trackHowl.duration() * progress;
        trackHowl.seek(this.seek);
      }
    },
    toggleMute() {
      Howler.mute(!this.muted);
      this.muted = !this.muted;
    },
    toggleLoop() {
      this.$emit("toggleLoop");
    },
    shufflePlaylist() {
      this.$emit("shufflePlaylist");
    },
  },
  watch: {
    playing(playing) {
      this.seek = this.currentTrack.howl.seek();
      let updateSeek;
      if (playing) {
        updateSeek = setInterval(() => {
          this.seek = this.currentTrack.howl.seek();
        }, 250);
      } else {
        clearInterval(updateSeek);
      }
    },
    seek(seek) {
      if (this.currentTrack.howl.duration() === 0) {
        this.trackProgress = 0;
      } else {
        this.trackProgress = seek / this.currentTrack.howl.duration();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.track-title {
  color: #53565a;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.track-title span {
  font-weight: 400;
  font-style: italic;
}

.controlbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}

button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.play,
.pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #fff;
  background-color: #cc2e5d;
}

.next,
.prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #fff;
  background-color: #ff5858;
}

#playlist {
  padding: 0px 30px;
}

#playlist h3 {
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}

#playlist .track {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
}

#playlist .track:hover {
  color: #ff5858;
}

#playlist .track.playing {
  color: #fff;
  background-image: linear-gradient(to right, #cc2e5d, #ff5858);
}

.duration {
  float: right;
}
</style>

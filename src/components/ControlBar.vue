<template>
  <div class="controlbar">
    <div class="seekbar">
      <span>{{ currentTrack.howl.seek() | minutes }}</span>
      <input
        id="seekbar"
        v-model="trackProgress"
        type="range"
        min="0"
        max="1"
        step="0.01"
        @input="updateTrackProgress(trackProgress)"
      />
      <span>{{ currentTrack.howl.duration() | minutes }}</span>
    </div>
    <div class="controls">
      <div class="left-bar">
        <span id="info"
          >{{ currentTrack.title }} - {{ currentTrack.artist }}</span
        >
      </div>
      <div class="center-bar">
        <button id="shuffle" class="fa-button" @click="shufflePlaylist">
          <fa-icon :icon="['fas', 'random']" />
        </button>
        <button class="prev fa-button" @click="prev">
          <fa-icon :icon="['fas', 'step-backward']" />
        </button>
        <button
          class="play fa-button"
          v-if="!currentTrack.howl.playing()"
          @click="play(currentTrack)"
        >
          <fa-icon :icon="['far', 'play-circle']" />
        </button>
        <button class="pause fa-button" v-else @click="pause">
          <fa-icon :icon="['far', 'pause-circle']" />
        </button>
        <button class="next fa-button" @click="next">
          <fa-icon :icon="['fas', 'step-forward']" />
        </button>
        <button id="loop" class="fa-button" @click="toggleLoop">
          <fa-icon
            style="color: steelblue"
            v-if="this.loop"
            :icon="['fas', 'redo-alt']"
          />
          <fa-icon style="color: white" v-else :icon="['fas', 'redo-alt']" />
        </button>
      </div>
      <div class="right-bar">
        <button id="volume" class="fa-button" @click="toggleMute">
          <template v-if="!this.muted">
            <fa-icon :icon="['fas', 'volume-up']" v-if="this.volume >= 0.5" />
            <fa-icon
              :icon="['fas', 'volume-down']"
              v-else-if="this.volume > 0"
            />
            <fa-icon :icon="['fas', 'volume-off']" v-else />
          </template>
          <fa-icon :icon="['fas', 'volume-mute']" v-show="this.muted" />
        </button>
        <input
          id="volume-slider"
          v-model="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          @input="updateVolume(volume)"
        />
      </div>
    </div>
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
      if (trackHowl) {
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
  filters: {
    minutes: function(value) {
      if (!value || typeof value !== "number") return "00:00";
      let min = parseInt(value / 60),
        sec = parseInt(value % 60);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      value = min + ":" + sec;
      return value;
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

span {
  color: white;
}

.controlbar {
  background: #34475a;
  text-align: center;
  flex: 0 1 auto;
}

.controls {
  display: flex;
  padding-bottom: 10px;
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

span {
  padding: 0px 10px;
}

.play,
.pause {
  font-size: 30px;
}

.next,
.prev {
  font-size: 16px;
  margin: 0px 15px;
}

#loop,
#shuffle {
  font-size: 16px;
  margin: 0px 15px;
}

#volume {
  font-size: 16px;
  min-width: 40px;
}

#volume-slider {
  -webkit-appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
}

#volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: steelblue;
  cursor: pointer;
}

#volume-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

#seekbar {
  -webkit-appearance: none;
  width: 50vw;
  margin: 20px 0px;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
}

#seekbar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 13px;
  height: 25px;
  border-radius: 0%;
  background: skyblue;
  cursor: pointer;
}

#seekbar::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.left-bar {
  float: left;
  text-align: left;
  width: 25%;
  margin-left: 20px;
}

.center-bar {
  float: left;
  text-align: center;
  width: 50%;
}

.right-bar {
  float: left;
  text-align: right;
  width: 25%;
  margin-right: 20px;
}

#info {
  font-size: 1.2rem;
  font-weight: 700;
}
</style>

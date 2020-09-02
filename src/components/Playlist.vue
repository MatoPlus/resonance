<template>
  <div id="playlist">
    <button
      v-for="(track, index) in tracks"
      :key="track.title"
      @click="play(track)"
      :class="track.howl == currentTrack.howl ? 'track playing' : 'track'"
    >
      {{ index | numbers }} {{ track.title }} - {{ track.artist }}
      <span class="duration">{{ track.howl.duration() | minutes }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  props: {
    tracks: Array,
    currentTrack: Object,
  },
  methods: {
    play(selectedTrack) {
      this.$emit("play", selectedTrack);
    },
  },
  filters: {
    numbers: function(value) {
      let number = value + 1;
      if (number < 10) {
        return "0" + number + ".";
      }
      return number + ".";
    },
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

.controls {
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

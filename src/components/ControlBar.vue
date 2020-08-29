<template>
	<div class="controlbar">
    <h2>{{ currentTrack.title }} - {{ currentTrack.artist }}</h2>
		<button class="prev" @click="prev">Prev</button>
		<button class="play" v-if="!currentTrack.howl.playing()" 
		@click="play(currentTrack)">Play</button>
		<button class="pause" v-else @click="pause">Pause</button>
		<button class="next" @click="next">Next</button>
		<input v-model="volume" type="range" min="0" max="1" step="0.01" @input="updateVolume(volume)"/>
	</div>
</template>

<script>
const { Howler } = window.require('howler')
export default {
	name: 'ControlBar',
	data() {
		return {
			volume: 0.5
		}
	},
  props: {
    currentTrack: Object,
  },
  methods: {
    play(selectedTrack) {
			this.$emit('play', selectedTrack);
    },
    pause() {
			this.$emit('pause');
    },
    prev() {
			this.$emit('prev');
    },
    next() {
			this.$emit('next');
		},
		updateVolume(newVolume) {
			Howler.volume(newVolume);
		}
  }
}
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
  color: #53565A;
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

.play, .pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #FFF;
  background-color: #CC2E5D;
}

.next, .prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #FFF;
  background-color: #FF5858;
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
  color: #FF5858;
}

#playlist .track.playing {
  color: #FFF;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
}

.duration {
  float : right; 
}
</style>

import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faWindowMinimize,
  faTimes,
  faVolumeUp,
  faVolumeDown,
  faVolumeOff,
  faVolumeMute,
  faRedoAlt,
  faRandom,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare,
  faClone,
  faPlayCircle,
  faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faBars,
  faWindowMinimize,
  faSquare,
  faClone,
  faTimes,
  faVolumeUp,
  faVolumeDown,
  faVolumeOff,
  faVolumeMute,
  faRedoAlt,
  faRandom,
  faPlayCircle,
  faPauseCircle,
  faStepBackward,
  faStepForward
);
Vue.component("fa-icon", FontAwesomeIcon);

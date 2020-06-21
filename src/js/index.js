import _ from "lodash";

// import "../css/style.css";
import "../sass/style.scss";

import "../img/anime.gif";

function component() {
  const element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello!,", "webpack"], " ");

  return element;
}

document.body.appendChild(component());

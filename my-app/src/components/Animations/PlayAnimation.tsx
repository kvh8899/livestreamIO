import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
class PlayAnimation extends Component {
  render(): ReactNode {
    return (
      <div id="play-pause-anim" className="big-pause-button">
        <FontAwesomeIcon
          icon={faPlay}
          style={{ color: "white" }}
        ></FontAwesomeIcon>
      </div>
    );
  }
}

export default PlayAnimation;

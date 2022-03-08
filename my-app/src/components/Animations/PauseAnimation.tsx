import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
class PauseAnimation extends Component {
  render(): ReactNode {
    return (
      <div id="pause-anim" className="big-pause-button">
        <FontAwesomeIcon
          icon={faPause}
          style={{ color: "white" }}
        ></FontAwesomeIcon>
      </div>
    );
  }
}

export default PauseAnimation;

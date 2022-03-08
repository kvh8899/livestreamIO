import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import VideoControlButton from "./VideoControlButton";

type Props = {
  setPlaying: any;
  innerRef: any;
};
class ReplayButton extends Component<Props> {
  render(): ReactNode {
    return (
      <VideoControlButton
        onClick={(e) => {
          this.props.innerRef.current.currentTime = 0;
          this.props.innerRef.current.play();
        }}
      >
        <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>
      </VideoControlButton>
    );
  }
}

export default ReplayButton;

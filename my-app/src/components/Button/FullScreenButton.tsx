import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import VideoControlButton from "./VideoControlButton";

type Props = {
  video: any;
};
class FullScreenButton extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  render(): ReactNode {
    return (
      <VideoControlButton
        onClick={(e) => {
          this.toggleFullScreen();
        }}
      >
        <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
      </VideoControlButton>
    );
  }
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}

export default FullScreenButton;

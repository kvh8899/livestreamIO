import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import VideoControlButton from "./VideoControlButton";

type Props = {
  video: any;
  setFullScreen: VoidFunction;
};
class FullScreenButton extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.fullScreenChanger = this.fullScreenChanger.bind(this);
  }
  componentDidMount() {
    document.addEventListener("fullscreenchange", this.fullScreenChanger);
  }
  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.fullScreenChanger);
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
  fullScreenChanger(): void {
    this.props.setFullScreen();
  }
}

export default FullScreenButton;

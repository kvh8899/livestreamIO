import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import VideoControlButton from "./VideoControlButton";
type Props = {
  innerRef: any;
  isPlaying: boolean;
  setPlaying: any;
  isDrag: boolean;
  setPlayingTrue: any;
};

class PlayButton extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  render(): ReactNode {
    return (
      <VideoControlButton onMouseUp={this.toggle}>
        {!this.props.isPlaying ? (
          <FontAwesomeIcon icon={faPlay} style={{ color: "white" }} />
        ) : (
          <FontAwesomeIcon icon={faPause} style={{ color: "white" }} />
        )}
      </VideoControlButton>
    );
  }
  toggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (this.props.isDrag) {
      this.props.setPlayingTrue();
      return;
    }
    this.props.setPlaying();
  }
}

export default PlayButton;

import { Component, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  innerRef: any;
  isPlaying: boolean;
  setPlaying: any;
  isDrag: boolean;
  setDragFalse: any;
  setPlayingTrue: any;
};
const Play = styled.button`
  border: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: 1s;
`;
class PlayButton extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  render(): ReactNode {
    return (
      <Play onMouseUp={this.toggle}>
        {!this.props.isPlaying ? (
          <FontAwesomeIcon icon={faPlay} style={{ color: "white" }} />
        ) : (
          <FontAwesomeIcon icon={faPause} style={{ color: "white" }} />
        )}
      </Play>
    );
  }
  toggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (this.props.isDrag) {
      //set isDrag to false
      this.props.setDragFalse();
      //play video
      this.props.innerRef.current.play();
      this.props.setPlayingTrue();
      return;
    }
    if (!this.props.isPlaying) {
      this.props.innerRef.current.play();
    } else if (this.props.isPlaying) {
      this.props.innerRef.current.pause();
    }
    this.props.setPlaying();
  }
}

export default PlayButton;

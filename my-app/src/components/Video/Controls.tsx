import { Component } from "react";
import { renderTime } from "../utils";
import styled from "styled-components";
const ControlContainer = styled.div`
  position: absolute;
  height: 100px;
  width: 100%;
`;
const Play = styled.button`
  border-radius: 5px;
  height: 50px;
  width: 100px;
`;
type State = {
  isPlaying: boolean;
};
type Props = {
  innerRef: any;
  time: any;
};
class Controls extends Component<Props, State> {
  state = {
    isPlaying: false,
  };
  shouldComponentUpdate(nextProps: any) {
    if (this.props.time !== Math.floor(this.props.innerRef.current.duration)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <ControlContainer>
        <Play onClick={this.toggle}>Play</Play>
        <div>{renderTime(this.props.time)}</div>
      </ControlContainer>
    );
  }

  toggle = (e: any) => {
    const buttonText = e.target as HTMLElement;
    if (!this.state.isPlaying) {
      this.props.innerRef.current.play();
      buttonText.innerHTML = "Play";
      this.setState((state) => ({
        isPlaying: true,
      }));
    } else if (this.state.isPlaying) {
      this.props.innerRef.current.pause();
      buttonText.innerHTML = "Pause";
      this.setState((state) => ({
        isPlaying: false,
      }));
    }
  };
}

export default Controls;

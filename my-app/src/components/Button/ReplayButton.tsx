import { Component, ReactNode } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
const Replay = styled.button`
  border: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: 1s;
  & > svg {
    color: white;
  }
`;
type Props = {
  setPlaying: any;
  innerRef: any;
};
class ReplayButton extends Component<Props> {
  render(): ReactNode {
    return (
      <Replay
        onClick={(e) => {
          this.props.innerRef.current.currentTime = 0;
          this.props.innerRef.current.play();
        }}
      >
        <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>
      </Replay>
    );
  }
}

export default ReplayButton;

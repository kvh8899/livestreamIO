import { Component, SyntheticEvent } from "react";
import React from "react";
import Controls from "./Controls";
import styled from "styled-components";

const ControlWrapper = styled.div`
  opacity: 0;
  transition: 0.3s;
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  &.displayControls {
    opacity: 1;
  }
`;
class Video extends Component<{ height: string; width: string }> {
  private video: React.RefObject<HTMLVideoElement>;
  private controlShow: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.video = React.createRef();
    this.controlShow = React.createRef();
    this.setTime = this.setTime.bind(this);
    this.setDragFalse = this.setDragFalse.bind(this);
    this.setDragTrue = this.setDragTrue.bind(this);
    this.setFullScreenState = this.setFullScreenState.bind(this);
  }
  state = {
    time: 0,
    isDrag: false,
    isFullScreen: false,
  };
  render() {
    return (
      <div
        style={{
          width: !this.state.isFullScreen ? `${this.props.width}` : "100%",
          height: !this.state.isFullScreen ? `${this.props.height}` : "100%",
          position: "relative",
        }}
        onMouseOver={(e) => {
          let current = this.controlShow.current;
          if (current) current.classList.add("displayControls");
        }}
        onMouseLeave={(e) => {
          if (this.state.isDrag) return;
          let current = this.controlShow.current;
          
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          if (this.state.isDrag) this.video.current?.play();
          this.setDragFalse();
        }}
      >
        <video
          width={!this.state.isFullScreen ? this.props.width : "100%"}
          height={!this.state.isFullScreen ? this.props.height : "100%"}
          muted
          onTimeUpdate={this.setTime}
          ref={this.video}
          src={
            "https://lsiovbucket.s3.us-west-1.amazonaws.com/1646185441917.mp4"
          }
        >
          <source src="/api/videos" type="video/mp4"></source>
        </video>
        <ControlWrapper ref={this.controlShow}>
          <Controls
            innerRef={this.video}
            time={this.state.time}
            isDrag={this.state.isDrag}
            setDragFalse={this.setDragFalse}
            setDragTrue={this.setDragTrue}
            controlShow={this.controlShow}
            isFullScreen={this.state.isFullScreen}
            setFullScreen={this.setFullScreenState}
          />
        </ControlWrapper>
      </div>
    );
  }
  setTime(e: SyntheticEvent): void {
    const target = e.target as HTMLVideoElement;
    this.setState({
      time: target.currentTime,
    });
  }
  setDragFalse(): void {
    this.setState({ ...this.state, isDrag: false });
  }
  setDragTrue(): void {
    this.setState({ ...this.state, isDrag: true });
  }

  setFullScreenState(): void {
    this.setState({ ...this.state, isFullScreen: !this.state.isFullScreen });
  }
}

export default Video;

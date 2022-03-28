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
    this.setPlaying = this.setPlaying.bind(this);
    this.clearControls = this.clearControls.bind(this);
  }
  state = {
    time: 0,
    isDrag: false,
    isFullScreen: false,
    isPlaying: false,
    clearControls: false,
    timer: setTimeout(() => {}, 0),
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
          const current = this.controlShow.current as HTMLDivElement;
          if (current) current.classList.add("displayControls");
          if (this.state.isPlaying) this.clearControls(current);
        }}
        onMouseLeave={(e) => {
          if (this.state.isDrag) return;
          const current = this.controlShow.current;
          clearTimeout(this.state.timer);
          if (current && this.state.isPlaying)
            current.classList.remove("displayControls");
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          const current = this.controlShow.current as HTMLDivElement;
          if (this.state.isDrag) {
            this.video.current?.play();
            this.setPlaying(true);
          }
          if (!this.state.isPlaying) {
            this.clearControls(current);
          } else if (this.state.isPlaying) {
            clearTimeout(this.state.timer);
            current.classList.add("displayControls");
          }
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
            isPlaying={this.state.isPlaying}
            setPlaying={this.setPlaying}
            timer={this.state.timer}
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
    this.setState((state, props) => ({ ...state, isDrag: false }));
  }
  setDragTrue(): void {
    this.setState((state, props) => ({ ...state, isDrag: true }));
  }

  setFullScreenState(): void {
    this.setState({ ...this.state, isFullScreen: !this.state.isFullScreen });
  }

  setPlaying(setTo: boolean): void {
    this.setState((state, props) => ({ ...this.state, isPlaying: setTo }));
  }
  clearControls(current: HTMLDivElement): void {
    clearTimeout(this.state.timer);
    this.setState({
      ...this.state,
      timer: setTimeout(() => {
        if (current) current.classList.remove("displayControls");
      }, 2000),
    });
  }
}

export default Video;

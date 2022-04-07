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
  private controlRef: React.RefObject<HTMLDivElement>;
  public timer: any;
  constructor(props: any) {
    super(props);
    this.video = React.createRef();
    this.controlRef = React.createRef();
    this.setTime = this.setTime.bind(this);
    this.setDragFalse = this.setDragFalse.bind(this);
    this.setDragTrue = this.setDragTrue.bind(this);
    this.setFullScreenState = this.setFullScreenState.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
    this.timer = [];
  }
  state = {
    time: 0,
    isDrag: false,
    isFullScreen: false,
    isPlaying: false,
    clearControls: false,
    controlShow: false,
  };

  render() {
    return (
      <div
        style={{
          width: !this.state.isFullScreen ? `${this.props.width}` : "100%",
          height: !this.state.isFullScreen ? `${this.props.height}` : "100%",
          position: "relative",
        }}
        onMouseMove={(e) => {
          const current = this.controlRef.current;
          clearTimeout(this.timer[0]);
          if (current) current.classList.add("displayControls");
          this.timer[0] = (setTimeout(() => {
            if (current) current.classList.remove("displayControls");
          }, 2000));
        }}
        onMouseLeave={(e) => {}}
        onMouseUp={(e) => {
          if (this.state.isDrag) {
            this.setPlaying(true);
            const video = this.video.current;
            if (video) video.play();
          }
          this.setDragFalse();
          const current = this.controlRef.current;
          clearTimeout(this.timer[0]);
          if (current && this.state.isPlaying){
            current.classList.add("displayControls");
          }else if(!this.state.isPlaying){
            this.timer[0] = (setTimeout(() => {
              if (current) current.classList.remove("displayControls");
            }, 2000));
          }
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
        <ControlWrapper ref={this.controlRef}>
          <Controls
            innerRef={this.video}
            time={this.state.time}
            isDrag={this.state.isDrag}
            setDragFalse={this.setDragFalse}
            setDragTrue={this.setDragTrue}
            controlRef={this.controlRef}
            isFullScreen={this.state.isFullScreen}
            setFullScreen={this.setFullScreenState}
            isPlaying={this.state.isPlaying}
            setPlaying={this.setPlaying}
            timer={this.timer}
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
    this.setState((state, props) => ({ ...state, isPlaying: setTo }));
  }

  //controls disappear after 2 seconds
}

export default Video;

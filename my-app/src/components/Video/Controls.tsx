import { Component } from "react";
import { renderTime } from "../utils";
import styled from "styled-components";
import PlayButton from "../Button/PlayButton";
import ReplayButton from "../Button/ReplayButton";
import FullScreenButton from "../Button/FullScreenButton";
import PauseAnimation from "../Animations/PauseAnimation";
import PlayAnimation from "../Animations/PlayAnimation";
import React from "react";
const ControlContainer = styled.div`
  color: white;
  position: absolute;
  z-index: 25;
  bottom: 6px;
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 10%,
    rgba(0, 0, 0, 0.35) 20%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.25) 40%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0.1) 80%,
    rgba(0, 0, 0, 0.05) 90%,
    rgba(0, 0, 0, 0.04) 95%,
    rgba(0, 0, 0, 0.02) 98%,
    rgba(0, 0, 0, 0.01) 100%
  );
`;
const OuterControls = styled.div`
  height: 100%;
`;
const BigToggle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerControls = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;
const Progress = styled.div`
  position: relative;
  align-self: center;
  background-color: gray;
  width: 95%;
  height: 3px;
  display: flex;
  justify-content: flex-start;
  user-select: none;
`;
type State = {
  isPlaying: boolean;
  xPosition: number;
  children: object;
};
type Props = {
  innerRef: React.RefObject<HTMLVideoElement>;
  time: number;
  isDrag: boolean;
  setDragFalse: VoidFunction;
  setDragTrue: VoidFunction;
  controlShow: React.RefObject<HTMLDivElement>;
};
class Controls extends Component<Props, State> {
  private progressButton: React.RefObject<HTMLDivElement>;
  private progressBar: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.setPlayingToggle = this.setPlayingToggle.bind(this);
    this.setPlayingTrue = this.setPlayingTrue.bind(this);
    this.windowMouseMove = this.windowMouseMove.bind(this);
    this.windowMouseUp = this.windowMouseUp.bind(this);
    this.progressButton = React.createRef();
    this.progressBar = React.createRef();
  }
  state = {
    isPlaying: false,
    xPosition: 0,
    children: [],
  };
  componentDidMount() {
    window.addEventListener("mouseup", this.windowMouseUp);
    window.addEventListener("mousemove", this.windowMouseMove);
  }
  componentWillUnmount() {
    window.removeEventListener("mouseup", this.windowMouseUp);
    window.removeEventListener("mousemove", this.windowMouseMove);
  }
  render() {
    return (
      <OuterControls>
        <BigToggle
          onMouseUp={(e) => {
            if (this.props.isDrag) {
              this.setPlayingTrue();
            }
          }}
          onClick={(e) => {
            const video = this.props.innerRef.current as HTMLVideoElement;
            if (this.state.isPlaying) {
              video.pause();
              this.setState({
                ...this.state,
                isPlaying: false,
                children: <PauseAnimation></PauseAnimation>,
              });
            } else {
              video.play();
              this.setState({
                ...this.state,
                isPlaying: true,
                children: <PlayAnimation></PlayAnimation>,
              });
            }
          }}
        >
          {this.state.children}
        </BigToggle>
        <ControlContainer>
          <Progress
            onMouseOver={(e) => {
              let element = e.currentTarget as HTMLElement;
              this.progressButton.current?.classList.add("hideProgress");
              element.style.height = "5px";
              element.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              let element = e.currentTarget as HTMLElement;
              if (!this.props.isDrag)
                this.progressButton.current?.classList.remove("hideProgress");
              element.style.height = "3px";
            }}
            onMouseDown={(e) => {
              const video = this.props.innerRef.current as HTMLVideoElement;
              let width: number = (e.clientX / 685) * 12;
              let bar = this.progressBar.current as HTMLDivElement;
              video.pause();
              video.currentTime = width;
              bar.style.width = e.clientX - 15 + "px";
              this.setState({
                ...this.state,
                xPosition: e.clientX - 15,
              });
              this.props.setDragTrue();
            }}
            onMouseMove={(e) => {
              let width: number = (e.clientX / 685) * 12;
              let bar = this.progressBar.current as HTMLDivElement;
              let video = this.props.innerRef.current as HTMLVideoElement;
              if (!this.props.isDrag) return;
              video.pause();

              if (bar && e.clientX - 15 <= 685)
                bar.style.width = e.clientX - 15 + "px";
              video.currentTime = width;
            }}
            onMouseUp={(e) => {
              let video = this.props.innerRef.current as HTMLVideoElement;
              let width: number = (e.clientX / 685) * 12;
              //set video playback to correct time
              this.setState({
                ...this.state,
                isPlaying: true,
                xPosition: width,
              });
              this.props.setDragFalse();
              if (width <= 685) video.currentTime = width;
              video.play();
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                width: !this.props.isDrag
                  ? `${
                      !(
                        this.props.time ===
                        Math.floor(
                          this.props.innerRef.current?.duration as number
                        )
                      )
                        ? (this.props.time /
                            (this.props.innerRef.current?.duration as number)) *
                          685
                        : "685"
                    }px`
                  : `${this.state.xPosition}px`,
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                position: "relative",
              }}
              ref={this.progressBar}
            >
              <div ref={this.progressButton}></div>
            </div>
          </Progress>
          <InnerControls>
            <div>
              {this.props.innerRef.current?.currentTime ===
              this.props.innerRef.current?.duration ? (
                <ReplayButton
                  setPlaying={this.setPlayingToggle}
                  innerRef={this.props.innerRef}
                />
              ) : (
                <PlayButton
                  setPlaying={this.setPlayingToggle}
                  setPlayingTrue={this.setPlayingTrue}
                  isPlaying={this.state.isPlaying}
                  innerRef={this.props.innerRef}
                  isDrag={this.props.isDrag}
                />
              )}
              <div
                onMouseUp={(e) => {
                  if (this.props.isDrag) this.setPlayingTrue();
                }}
              >
                {renderTime(Math.floor(this.props.time))}
              </div>
            </div>
            <div>
              <FullScreenButton video={this.props.innerRef}></FullScreenButton>
            </div>
          </InnerControls>
        </ControlContainer>
      </OuterControls>
    );
  }
  setPlayingToggle() {
    const video = this.props.innerRef.current;
    this.setState({
      ...this.state,
      isPlaying: !this.state.isPlaying,
      children: [],
    });
    if (!this.state.isPlaying && video) {
      video.play();
    } else if (this.state.isPlaying && video) {
      video.pause();
    }
  }
  setPlayingTrue() {
    const video = this.props.innerRef.current as HTMLVideoElement;
    this.setState({ ...this.state, isPlaying: true, children: [] });
    //set isDrag to false
    this.props.setDragFalse();
    //play video
    video.play();
  }

  windowMouseMove(e: MouseEvent) {
    let video = this.props.innerRef.current as HTMLVideoElement;
    let width: number = (e.clientX / 685) * 12;
    let duration: number = video.duration;
    let bar = this.progressBar.current as HTMLDivElement;

    if (!this.props.isDrag) return;
    video.pause();
    if (width <= duration) video.currentTime = width;
    if (bar && e.clientX - 15 <= 685) bar.style.width = e.clientX - 15 + "px";
  }
  windowMouseUp(e: MouseEvent) {
    let video = this.props.innerRef.current as HTMLVideoElement;
    let current = this.props.controlShow.current as HTMLDivElement;
    let currentTime: number = video.currentTime;
    let duration: number = video.duration;
    this.setState({ ...this.state, isPlaying: true });
    current.classList.remove("displayControls");
    if (currentTime <= duration && this.props.isDrag) video.play();
    this.props.setDragFalse();
  }
}

export default Controls;

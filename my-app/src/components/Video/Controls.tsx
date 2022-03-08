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
  position: relative;
  z-index: 25;
  bottom: 20%;
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
  width: 100%;
  height: 3px;
  display: flex;
  justify-content: flex-start;
  user-select: none;
`;
const ScrubAndControls = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 15px;
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
  isFullScreen: boolean;
  setFullScreen: VoidFunction;
};
class Controls extends Component<Props, State> {
  private progressButton: React.RefObject<HTMLDivElement>;
  private progressBar: React.RefObject<HTMLDivElement>;
  private fullBar: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.setPlayingToggle = this.setPlayingToggle.bind(this);
    this.setPlayingTrue = this.setPlayingTrue.bind(this);
    this.windowMouseMove = this.windowMouseMove.bind(this);
    this.windowMouseUp = this.windowMouseUp.bind(this);
    this.progressButton = React.createRef();
    this.progressBar = React.createRef();
    this.fullBar = React.createRef();
  }
  state = {
    isPlaying: false,
    xPosition: 0,
    children: [],
  };
  componentDidMount() {
    window.addEventListener("mousemove", this.windowMouseMove);
    window.addEventListener("mouseup", this.windowMouseUp);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.windowMouseMove);
    window.removeEventListener("mouseup", this.windowMouseUp);
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
          <ScrubAndControls>
            <Progress
              ref={this.fullBar}
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
                let bar = this.fullBar.current as HTMLDivElement;
                let video = this.props.innerRef.current as HTMLVideoElement;
                let width: number = (e.clientX - 15) / bar.clientWidth;
                video.pause();
                video.currentTime = width * video.duration;
                this.setState({
                  ...this.state,
                  xPosition: width * 100,
                });
                this.props.setDragTrue();
              }}
              onMouseUp={(e) => {
                if (!this.props.isDrag) return;
                this.setState({ ...this.state, isPlaying: true });
                this.props.setDragFalse();
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
                              (this.props.innerRef.current
                                ?.duration as number)) *
                            100
                          : "100%"
                      }%`
                    : `${this.state.xPosition}%`,
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
                <FullScreenButton
                  video={this.props.innerRef}
                  setFullScreen={this.props.setFullScreen}
                ></FullScreenButton>
              </div>
            </InnerControls>
          </ScrubAndControls>
        </ControlContainer>
      </OuterControls>
    );
  }
  setPlayingToggle(): void {
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
  setPlayingTrue(): void {
    const video = this.props.innerRef.current as HTMLVideoElement;
    this.setState({ ...this.state, isPlaying: true, children: [] });
    //set isDrag to false
    this.props.setDragFalse();
    //play video
    video.play();
  }

  windowMouseMove(e: MouseEvent): void {
    if (!this.props.isDrag) return;

    let video = this.props.innerRef.current as HTMLVideoElement;
    let progress = this.fullBar.current as HTMLDivElement;
    let width: number = (e.clientX - 15) / progress.clientWidth;
    let duration: number = video.duration;
    let bar = this.progressBar.current as HTMLDivElement;
    video.pause();
    if (width * duration <= duration) video.currentTime = width * duration;
    bar.style.width = width * 100 + "%";
  }
  windowMouseUp(e: MouseEvent): void {
    if (!this.props.isDrag) return;
    let video = this.props.innerRef.current as HTMLVideoElement;
    let progress = this.fullBar.current as HTMLDivElement;
    let width: number = (e.clientX - 15) / progress.clientWidth;
    let duration: number = video.duration;
    this.setState({ ...this.state, isPlaying: true });
    this.props.setDragFalse();
    if (width * duration <= duration) video.play();
  }
}

export default Controls;

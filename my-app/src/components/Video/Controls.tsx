import { Component } from "react";
import { renderTime } from "../utils";
import styled from "styled-components";
import PlayButton from "../Button/PlayButton";
import ReplayButton from "../Button/ReplayButton";
import React from "react";
const ControlContainer = styled.div`
  color: white;
  position: absolute;
  z-index: 25;
  bottom: 6px;
  height: 100px;
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
const InnerControls = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
};
type Props = {
  innerRef: any;
  time: any;
  isDrag: boolean;
  setDragFalse: any;
  setDragTrue: any;
  controlShow: any;
};
class Controls extends Component<Props, State> {
  private progressButton: React.RefObject<HTMLDivElement>;
  private progressBar: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.setPlayingToggle = this.setPlayingToggle.bind(this);
    this.progressButton = React.createRef();
    this.progressBar = React.createRef();
  }
  state = {
    isPlaying: false,
  };

  render() {
    return (
      <ControlContainer>
        <Progress
          onMouseOver={(e) => {
            this.progressButton.current?.classList.add("hideProgress");
            const element = e.currentTarget as HTMLElement;
            element.style.height = "5px";
            element.style.cursor = "pointer";
          }}
          onMouseLeave={(e) => {
            if (!this.props.isDrag)
              this.progressButton.current?.classList.remove("hideProgress");
            const element = e.currentTarget as HTMLElement;
            element.style.height = "3px";
          }}
          onMouseDown={(e) => {
            //use propsetter
            this.props.setDragTrue();
            this.props.innerRef.current.pause();
            const bar = this.progressBar.current;
            if (bar) bar.style.width = e.clientX - 15 + "px";
          }}
          onMouseMove={(e) => {
            let width = (e.clientX / 685) * 12;
            let bar = this.progressBar.current;

            if (!this.props.isDrag) return;
            this.props.innerRef.current.pause();

            if (bar && e.clientX - 15 <= 685)
              bar.style.width = e.clientX - 15 + "px";
            this.props.innerRef.current.currentTime = Math.ceil(width);

            window.addEventListener("mouseup", (e) => {
              let current = this.props.controlShow.current;
              let currentTime = this.props.innerRef.current.currentTime;
              let duration = this.props.innerRef.current.duration;
              this.setState({ ...this.state, isPlaying: true });
              if (current) current.classList.remove("displayControls");
              this.props.setDragFalse();
              if (currentTime <= duration) this.props.innerRef.current.play();
            });
            window.addEventListener("mousemove", (e) => {
              let width = (e.clientX / 685) * 12;
              let duration = this.props.innerRef.current.duration;
              let bar = this.progressBar.current;
  
              if (!this.props.isDrag) return;
              this.props.innerRef.current.pause();
              if (width <= duration)
                this.props.innerRef.current.currentTime = width;
              if (bar && e.clientX - 15 <= 685)
                bar.style.width = e.clientX - 15 + "px";
            });
          }}
          onMouseUp={(e) => {
            let width = (e.clientX / 685) * 12;
            //set video playback to correct time
            this.setState({ ...this.state, isPlaying: true });
            this.props.setDragFalse();
            if (width <= 685) this.props.innerRef.current.currentTime = width;

            this.props.innerRef.current.play();
          }}
        >
          <div
            style={{
              backgroundColor: "red",
              width: `${
                !(
                  this.props.time ===
                  Math.floor(this.props.innerRef.current?.duration)
                )
                  ? (this.props.time / this.props.innerRef.current?.duration) *
                    100
                  : "100"
              }%`,
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
          {this.props.innerRef.current?.currentTime ===
          this.props.innerRef.current?.duration ? (
            <ReplayButton
              setPlaying={this.setPlayingToggle}
              innerRef={this.props.innerRef}
            />
          ) : (
            <PlayButton
              setPlaying={this.setPlayingToggle}
              isPlaying={this.state.isPlaying}
              innerRef={this.props.innerRef}
            />
          )}

          <div>{renderTime(this.props.time)}</div>
        </InnerControls>
      </ControlContainer>
    );
  }
  setPlayingToggle() {
    this.setState({ ...this.state, isPlaying: !this.state.isPlaying });
  }
}

export default Controls;

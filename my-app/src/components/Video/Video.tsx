import { Component } from "react";
import React from "react";
import Controls from "./Controls";

class Video extends Component<{ height: string; width: string }> {
  private video: React.RefObject<HTMLVideoElement>;
  constructor(props: any) {
    super(props);
    this.video = React.createRef();
    this.setTime = this.setTime.bind(this);
  }
  state = { time: "0" };
  render() {
    return (
      <div
        style={{
          height: this.props.height,
          width: this.props.width,
          position: "relative",
        }}
        onMouseMove={(e) => {
          
        }}
      >
        <video
          width={this.props.width}
          height={this.props.height}
          muted
          onTimeUpdate={this.setTime}
          ref={this.video}
          src={
            "https://lsiovbucket.s3.us-west-1.amazonaws.com/1646185441917.mp4"
          }
        >
          <source src="/api/videos" type="video/mp4"></source>
        </video>
        <Controls innerRef={this.video} time={this.state.time} />
      </div>
    );
  }
  setTime(e: any) {
    const target = e.target as HTMLVideoElement;
    this.setState({
      time: Math.floor(target.currentTime),
    });
  }
}

export default Video;

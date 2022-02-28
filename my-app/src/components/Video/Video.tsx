import { Component} from "react";
import React from "react";
import Controls from "./Controls";
class Video extends Component<{ height: string; width: string }> {
  private video: React.RefObject<HTMLVideoElement>;
  constructor(props: any) {
    super(props);
    this.video = React.createRef();
  }
  state = { time: "0" };
  render() {
    return (
      <div>
        <video
          width={this.props.width}
          height={this.props.height}
          muted
          onTimeUpdate={this.setTime}
          ref={this.video}
        >
          <source src="/api/videos" type="video/mp4"></source>
        </video>
        <Controls innerRef={this.video} time={this.state.time} />
      </div>
    );
  }
  setTime = (e: any) => {
    this.setState((state) => {
      const target = e.target as HTMLVideoElement;
      return {
        time: Math.floor(target.currentTime),
      };
    });
  };
}

export default Video;

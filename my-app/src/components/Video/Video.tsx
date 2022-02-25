import { Component } from "react";

class Video extends Component {
  render() {
    return (
      <div>
        <video width="700" height="500">
          <source
            src=""
            type="video/mp4"
          ></source>
        </video>
      </div>
    );
  }
}

export default Video;

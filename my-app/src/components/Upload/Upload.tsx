import styled from "styled-components";
import React from "react";

const DropZone = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class Upload extends React.Component {
  render() {
    return (
      <DropZone
        id="drop-zone"
        onDrop={this.onDropHandler}
        onDragOver={this.onDragHandler}
      >
        <p>Drag a .mp4 file into the dropzone</p>
      </DropZone>
    );
  }
  onDropHandler = (event: any) => {};
  onDragHandler = (event: any) => {};
}

export default Upload;

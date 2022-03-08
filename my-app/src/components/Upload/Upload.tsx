import styled from "styled-components";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";
import SpinningCircle from "../LoadingAnimations/SpinningCircle";
const DropZone = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 5px lightgray dashed;
`;
const Confirm = styled.p`
  color: ${(props) => props.theme.main};
`;

const ChooseFile = styled.label`
  background-color: black;
  color: white;
  border-radius: 25px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
`;
Confirm.defaultProps = {
  theme: {
    main: "#1A67F5",
  },
};
const green = {
  main: "green",
};
type State = {
  fileName: string;
};
type Props = {
  setFile: Function;
  isUploading: boolean;
};
class Upload extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileName: "",
    };
  }
  render() {
    return (
      <DropZone
        id="drop-zone"
        onDrop={this.onDropHandler}
        onDragOver={this.onDragHandler}
      >
        {!this.props.isUploading ? (
          !this.state.fileName ? (
            <div>
              <p>
                <FontAwesomeIcon icon={faFileArrowUp} /> Drag and Drop Files
                Here
              </p>
              <p>or</p>
              <ChooseFile htmlFor="file-upload" className="custom-file-upload">
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => {
                    this.setState({ ...this.state, fileName: e.target.value });
                    const event: HTMLInputElement = e.target;
                    if (event.files) this.props.setFile(event.files[0]);
                  }}
                ></input>
                Choose File
              </ChooseFile>
            </div>
          ) : (
            <div>
              <ThemeProvider theme={green}>
                <Confirm>
                  <FontAwesomeIcon icon={faCheck} />
                </Confirm>
              </ThemeProvider>
              <Confirm>{this.state.fileName}</Confirm>
            </div>
          )
        ) : (
          <SpinningCircle></SpinningCircle>
        )}
      </DropZone>
    );
  }
  onDropHandler = (event: any) => {
    event.preventDefault();
    const item = event.dataTransfer.items[0];
    if (item.kind === "file") {
      const uploadFile: File = item.getAsFile();
      this.setState({ fileName: uploadFile.name });
      this.props.setFile(uploadFile);
    }
  };
  onDragHandler = (event: any) => {
    event.preventDefault();
  };
}

export default Upload;

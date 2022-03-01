import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "styled-components";
const DropZone = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  border: 5px lightGray dashed;
`;
const Confirm = styled.p`
  color: ${(props) => props.theme.main};
`;
Confirm.defaultProps = {
  theme: {
    main: "black",
  },
};
const green = {
  main: "green",
};
type State = {
  fileName: string;
};
type Props = {
  setFile: any;
  file: any;
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
        {!this.state.fileName ? (
          <p>
            <FontAwesomeIcon icon={faFileArrowUp} /> Drag and Drop Files Here
          </p>
        ) : (
          <div>
            <ThemeProvider theme={green}>
              <Confirm>
                <FontAwesomeIcon icon={faCheck} />
              </Confirm>
            </ThemeProvider>
            <Confirm>{this.state.fileName}</Confirm>
          </div>
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
      this.props.setFile({ ...this.props.file, file: uploadFile });
    }
  };
  onDragHandler = (event: any) => {
    event.preventDefault();
  };
}

export default Upload;

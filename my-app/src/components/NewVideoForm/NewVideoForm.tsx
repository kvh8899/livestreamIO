import React from "react";
import styled from "styled-components";
import Upload from "../Upload/Upload";
const SubmitButton = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 25px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const VideoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  & > input {
    box-sizing: border-box;
    margin-bottom: 20px;
    width: 100%;
  }
  & button {
    box-sizing: border-box;
    margin-top: 20px;
    width: 100%;
  }
`;
const UploadWrapper = styled.div`
  height: 300px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
type State = {
  title: string;
  description: string;
  category: string;
  file: any;
  isUploading: boolean;
};
type Props = {};
class NewVideoForm extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      file: null,
      isUploading: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.setState = this.setState.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }
  render() {
    return (
      <VideoForm onSubmit={this.submitHandler}>
        <label>Title</label>
        <input
          value={this.state.title}
          onChange={this.titleHandler}
          required
        ></input>
        <label>description</label>
        <input
          value={this.state.description}
          onChange={this.descriptionHandler}
          required
        ></input>
        <label>category</label>
        <input
          value={this.state.category}
          onChange={this.categoryHandler}
          required
        ></input>
        <UploadWrapper>
          <Upload
            setFile={this.fileHandler}
            isUploading={this.state.isUploading}
          />
        </UploadWrapper>
        <SubmitButton>Submit</SubmitButton>
      </VideoForm>
    );
  }
  async submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (!this.state.file) return;
    //fetch request

    const data = new FormData();
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("category", this.state.category);
    data.append("file", this.state.file);

    const options = {
      method: "POST",
      body: data,
    };
    this.setState({ ...this.state, isUploading: true });
    const video = fetch("/api/videos", options)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ ...this.state, isUploading: false });
        this.setState({ title: "", description: "", category: "", file: null });
      })
      .catch((error) => console.log(error));
  }
  titleHandler(event: React.ChangeEvent) {
    const element = event.target as HTMLInputElement;
    this.setState({ ...this.state, title: element.value });
  }
  descriptionHandler(event: React.ChangeEvent) {
    const element = event.target as HTMLInputElement;
    this.setState({ ...this.state, description: element.value });
  }
  categoryHandler(event: React.ChangeEvent) {
    const element = event.target as HTMLInputElement;
    this.setState({ ...this.state, category: element.value });
  }
  fileHandler(file: File) {
    this.setState({
      ...this.state,
      file,
    });
  }
}

export default NewVideoForm;

import React from "react";
import styled from "styled-components";
import Upload from "../Upload/Upload";
const SubmitButton = styled.button`
  height: 25px;
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
type State = {
  title: string;
  description: string;
  category: string;
  file: any;
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
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.setState = this.setState.bind(this);
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
        <Upload setFile={this.setState} file={this.state} />
        <SubmitButton>Submit</SubmitButton>
      </VideoForm>
    );
  }
  submitHandler(event: React.FormEvent) {
    event.preventDefault();
    console.log(this.state);
    //fetch request
    this.setState({ title: "", description: "", category: "" });
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
}

export default NewVideoForm;

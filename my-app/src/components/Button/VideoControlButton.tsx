import styled from "styled-components";
const VideoControlButton = styled.button`
  border: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: 1s;
  & > svg {
    color: white;
  }
`;
export default VideoControlButton;

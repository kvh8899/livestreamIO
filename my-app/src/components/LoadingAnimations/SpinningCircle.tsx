import { keyframes } from "styled-components";
import styled from "styled-components";

const rotate = keyframes`
from{
    transform: rotate(0deg);
}

to{
    transform: rotate(360deg);
}
`;
const Circle = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  border: 10px solid transparent;
  border-top-color: blue;
  border-bottom-color: lightgray;
  border-right-color: lightgray;
  border-left-color: lightgray;
  animation: ${rotate} 1s linear infinite;
`;

const SpinningCircle = () => <Circle></Circle>;

export default SpinningCircle;

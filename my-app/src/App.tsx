import React from "react";
import NewVideoForm from "./components/NewVideoForm/NewVideoForm";
import Video from "./components/Video/Video";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Video height={"400px"} width={"700px"} />
      <svg className="bigPlayButton"></svg>
    </div>
  );
}

export default App;

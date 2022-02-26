var express = require("express");
var videoRouter = require("./api/video");
const app = express();
var cors = require("cors");
app.use(cors());
app.use("/api", videoRouter);
app.get("/", (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});

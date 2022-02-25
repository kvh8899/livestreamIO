var express = require("express");
var videoRouter = require("./api/video");
const app = express();

app.use("/api", videoRouter);
app.get("/", (req, res) => {
  res.send({});
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

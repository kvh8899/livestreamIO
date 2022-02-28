const router = require("./routes");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use("/api", router);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send({});
});

app.listen(4000, () => console.log("listening on port 5000"));

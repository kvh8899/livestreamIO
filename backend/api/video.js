var express = require("express");
var router = express.Router();

router.use("/videos", (req, res) => {
  res.send({ video: "video" });
});

module.exports = router;

const videoRouter = require("./api/videos");
const express = require("express");
const router = express.Router();

router.use("/videos", videoRouter);

module.exports = router;

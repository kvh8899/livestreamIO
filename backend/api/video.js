var express = require("express");
var router = express.Router();

router.use("/videos", (req, res) => {
    res.sendFile('assets/sample.mp4', { root: __dirname });
});

module.exports = router;

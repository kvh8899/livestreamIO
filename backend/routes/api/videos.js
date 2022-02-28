const express = require("express");
const Video = require("../../db/models/video");
const videoRouter = express.Router();
const { singlePublicFileUpload } = require("../../awsS3");
const singleMulterUpload = require("../../awsS3");

videoRouter.get("/", (req, res) => {
  res.send({ video: "video" });
});

videoRouter.post("/", singleMulterUpload, (req, res) => {
  const videoUrl = await singlePublicFileUpload(req.file);
  const { title, description,owner_id, category } = req;
  const video = await Video.create({
    title,
    description,
    videoUrl,
    owner_id,
    category,
  });
  setTokenCookie(res, user);

  return res.json(video);
});
module.exports = videoRouter;

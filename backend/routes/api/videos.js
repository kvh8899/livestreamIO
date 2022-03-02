const express = require("express");
const { Video } = require("../../db/models");
const videoRouter = express.Router();
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const bodyParser = require("body-parser");
const asyncHandler = (asyncFunction) => (req, res, next) => {
  return asyncFunction(req, res, next).catch(next);
};
videoRouter.get("/", (req, res) => {
  res.send({ video: "video" });
});

videoRouter.post(
  "/",
  singleMulterUpload("file"),
  asyncHandler(async (req, res) => {
    const videoUrl = await singlePublicFileUpload(req.file);
    const { title, description, category } = req.body;
    const video = await Video.create({
      title,
      description,
      url: videoUrl,
      owner_id: 1,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.json(video);
  })
);
module.exports = videoRouter;

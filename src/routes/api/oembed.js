const express = require("express");
const router = express.Router();
const requestImageSize = require("request-image-size");

router.get("/oembed", async (req, res) => {
  size = requestImageSize(req.query.url)
  res.json({
    type: "photo",
    author: req.query.author,
    author_url: "http://www.xboxs.one",
    url: req.query.url,
    width: size.width,
    height: size.height,
    html: `<img src='${req.query.url}'>`,
  });
});

module.exports = router;

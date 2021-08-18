const express = require("express");
const router = express.Router();
const Files = require("../../dbSchema/files");
const path = require("path");
const fs = require("fs");

router.get("/:image", async (req, res) => {
  let file;

  await Files.findOne({ fileName: req.params.image }, function (err, e) {
    if (err) throw err;
    file = e;
    if (!e) return res.status(404).send("image not found");
  });

  await fs.readFile(
    path.join(__dirname, "/baseplate.html"),
    "utf8",
    function async(err, data) {
      if (err) return console.log(err);
      data = data
        .replace(new RegExp("imageUrl", "g"), file.file)
        .replace(new RegExp("userDescription", "g"), file.userDescription)
        .replace("authorName", file.uploader);

      fs.writeFileSync(path.join(__dirname, "/send.html"), data);
      res.sendFile(path.join(__dirname, "/send.html"));
    }
  );
});

module.exports = router;

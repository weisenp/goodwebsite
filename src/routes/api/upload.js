const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Users = require("../../../dbSchema/users");
const { a2h } = require("hiddencoder");
const Files = require("../../../dbSchema/files");

router.post("/upload", async (req, res) => {
  if (!req.files.file) return res.send("Upload screenshot bruh");
  if (!req.query.key) return res.send("Please enter your key.");
  if (!req.query.username) return res.send("Please enter your username");
  let make = true;
  let usere

  await Users.findOne({ username: req.query.username }, function (err, user) {
    if (err) throw err;
    if (!user) {
      make = false 
      return res.send("No user with that username");
    }
    usere = user

    if (req.query.key != user.key) return res.send("The key does not match up");
  });

  let file = req.files.file;
  let fileName = nanoid(10);
  let fileType = req.files.file.mimetype;
  if (make) {
    if (fileType == "image/png") {
      file.mv(`../images/${fileName}.png`, function (err) {
        let file = new Files({
          uploader: req.query.username,
          file: `https://xbox.one/images/${fileName}.png`,
          fileName: a2h(fileName),
          userDescription: usere.description
        });

        file.save();

        res.send("file uploaded");
      });
    } else {
      res.send("Wrong file type");
    }
  }
});

module.exports = router;

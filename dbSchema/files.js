const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const filesSchema = new Schema({
  uploader: String,
  file: String,
  fileName: String,
  userDescription: String
});

const Files = mongoose.model("Files", filesSchema);
module.exports = Files;

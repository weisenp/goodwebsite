const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  key: { type: String, required: true },
  title: { type: String, required: true, default: "Trash" },
  description: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

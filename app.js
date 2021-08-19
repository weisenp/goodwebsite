require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database");
});

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", require("./routes/api/oembed"));
app.use("/api", require("./routes/api/upload"));
app.use("/i", require("./routes/i/image"));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

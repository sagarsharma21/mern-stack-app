const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const app = express();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(error ${err}));

app.use(expressValidator());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized " });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`the  server is running on port ${port}`);
});